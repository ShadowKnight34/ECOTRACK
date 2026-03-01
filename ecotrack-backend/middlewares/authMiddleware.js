// ──────────────────────────────────────────────
//  Auth Middleware — JWT Verification
// ──────────────────────────────────────────────

const jwt = require('jsonwebtoken');

/**
 * Protects private routes by verifying the Bearer token
 * in the Authorization header.
 *
 * On success  → attaches decoded payload to req.user, calls next().
 * On failure  → returns 401 (missing token) or 403 (invalid token).
 */
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // 1 ── Check for Authorization header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Access denied. No token provided.',
        });
    }

    // 2 ── Extract the token
    const token = authHeader.split(' ')[1];

    // 3 ── Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { userID, level, iat, exp }
        next();
    } catch (error) {
        return res.status(403).json({
            error: 'Forbidden',
            message: 'Invalid or expired token.',
        });
    }
};
