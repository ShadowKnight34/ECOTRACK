// ──────────────────────────────────────────────
//  Auth Controller — Register & Login
// ──────────────────────────────────────────────

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const SALT_ROUNDS = 10;

// ── POST /api/auth/register ──────────────────
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1 ── Validate input
        if (!username || !email || !password) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'username, email, and password are required.',
            });
        }

        // 2 ── Check if email already exists
        const [existing] = await pool.query(
            'SELECT userID FROM User WHERE email = ?',
            [email]
        );

        if (existing.length > 0) {
            return res.status(409).json({
                error: 'Conflict',
                message: 'An account with this email already exists.',
            });
        }

        // 3 ── Hash the password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // 4 ── Insert new user (default level = 1, xp = 0)
        const [result] = await pool.query(
            'INSERT INTO User (username, email, password, level, xp) VALUES (?, ?, ?, 1, 0)',
            [username, email, hashedPassword]
        );

        return res.status(201).json({
            message: 'User registered successfully.',
            userId: result.insertId,
        });
    } catch (error) {
        console.error('Register error:', error.message);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'Something went wrong during registration.',
        });
    }
};

// ── POST /api/auth/login ─────────────────────
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1 ── Validate input
        if (!email || !password) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'email and password are required.',
            });
        }

        // 2 ── Find user by email
        const [rows] = await pool.query(
            'SELECT * FROM User WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Invalid email or password.',
            });
        }

        const user = rows[0];

        // 3 ── Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Invalid email or password.',
            });
        }

        // 4 ── Generate JWT (payload: userID + level)
        const token = jwt.sign(
            { userID: user.userID, level: user.level },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // 5 ── Return token + user info (exclude password)
        const { password: _, ...userInfo } = user;

        return res.status(200).json({
            message: 'Login successful.',
            token,
            user: userInfo,
        });
    } catch (error) {
        console.error('Login error:', error.message);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'Something went wrong during login.',
        });
    }
};
