import React from 'react';
import {
    StyleSheet, Text, View, ScrollView, Dimensions,
} from 'react-native';
import { Award, Target, BookOpen } from 'lucide-react-native';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';

const { width } = Dimensions.get('window');

// ── Dummy profile data ──
const USER = {
    username: 'EcoStudent',
    email: 'student@ecotrack.com',
    level: 5,
    xp: 920,
    nextLevelXP: 1000, // XP needed to reach level 6
};

const BADGES = [
    { id: 1, icon: '✅', name: 'Passing Grade', earned: true },
    { id: 2, icon: '💯', name: 'Perfect Score', earned: true },
    { id: 3, icon: '🌱', name: 'First Steps', earned: true },
    { id: 4, icon: '⭐', name: 'Rising Star', earned: true },
    { id: 5, icon: '🏆', name: 'Eco Champion', earned: false },
    { id: 6, icon: '🔥', name: 'On Fire', earned: false },
];

export default function ProfileScreen() {
    const xpProgress = USER.xp / USER.nextLevelXP;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* ── Avatar & Identity ── */}
            <View style={styles.avatarSection}>
                <View style={styles.avatarRing}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarEmoji}>🧑‍🎓</Text>
                    </View>
                </View>
                <Text style={styles.username}>{USER.username}</Text>
                <Text style={styles.email}>{USER.email}</Text>
            </View>

            {/* ── Level & XP Bar ── */}
            <Card style={styles.levelCard}>
                <View style={styles.levelHeader}>
                    <View style={styles.levelBadge}>
                        <Text style={styles.levelBadgeText}>LVL</Text>
                        <Text style={styles.levelNumber}>{USER.level}</Text>
                    </View>
                    <View style={styles.xpInfo}>
                        <Text style={styles.xpTitle}>Experience Points</Text>
                        <Text style={styles.xpNumbers}>
                            {USER.xp} <Text style={styles.xpDivider}>/ {USER.nextLevelXP} XP</Text>
                        </Text>
                    </View>
                </View>

                {/* XP progress bar */}
                <ProgressBar progress={xpProgress} color="#FBBF24" height={16} />
                <Text style={styles.xpRemaining}>
                    {USER.nextLevelXP - USER.xp} XP to Level {USER.level + 1}
                </Text>
            </Card>

            {/* ── Stats Row ── */}
            <View style={styles.statsRow}>
                <Card style={styles.statCard}>
                    <BookOpen color="#10B981" size={24} style={{ marginBottom: 8 }} />
                    <Text style={styles.statValue}>12</Text>
                    <Text style={styles.statLabel}>Quizzes</Text>
                </Card>
                <Card style={styles.statCard}>
                    <Target color="#EF4444" size={24} style={{ marginBottom: 8 }} />
                    <Text style={styles.statValue}>87%</Text>
                    <Text style={styles.statLabel}>Avg Score</Text>
                </Card>
                <Card style={styles.statCard}>
                    <Award color="#FBBF24" size={24} style={{ marginBottom: 8 }} />
                    <Text style={styles.statValue}>{BADGES.filter(b => b.earned).length}</Text>
                    <Text style={styles.statLabel}>Badges</Text>
                </Card>
            </View>

            {/* ── Achievements Grid ── */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Achievements</Text>
                <Badge variant="secondary"> {BADGES.filter(b => b.earned).length} / {BADGES.length} </Badge>
            </View>

            <View style={styles.badgeGrid}>
                {BADGES.map((badge) => (
                    <Card
                        key={badge.id}
                        style={[styles.badgeItem, !badge.earned && styles.badgeLocked]}
                    >
                        <Text style={[styles.badgeIcon, !badge.earned && styles.badgeIconLocked]}>
                            {badge.earned ? badge.icon : '🔒'}
                        </Text>
                        <Text style={[styles.badgeName, !badge.earned && styles.badgeNameLocked]}>
                            {badge.name}
                        </Text>
                    </Card>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 32,
        paddingBottom: 40,
    },

    // ── Avatar ──
    avatarSection: {
        alignItems: 'center',
        marginBottom: 28,
    },
    avatarRing: {
        width: 104,
        height: 104,
        borderRadius: 52,
        borderWidth: 4,
        borderColor: '#10B981',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
        backgroundColor: '#D1FAE5',
    },
    avatar: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: '#34D399',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarEmoji: {
        fontSize: 46,
    },
    username: {
        fontSize: 24,
        fontWeight: '900',
        color: '#111827',
    },
    email: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 2,
        fontWeight: '500',
    },

    // ── Level Card ──
    levelCard: {
        marginBottom: 24,
        backgroundColor: '#10B981', // Emerald primary
        borderColor: '#059669',
        borderBottomColor: '#047857',
    },
    levelHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    levelBadge: {
        width: 56,
        height: 56,
        borderRadius: 14,
        backgroundColor: '#047857',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        borderWidth: 2,
        borderColor: '#059669',
    },
    levelBadgeText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#A7F3D0',
        letterSpacing: 1,
    },
    levelNumber: {
        fontSize: 24,
        fontWeight: '900',
        color: '#FFFFFF',
        marginTop: -2,
    },
    xpInfo: {
        flex: 1,
    },
    xpTitle: {
        fontSize: 13,
        color: '#D1FAE5',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    xpNumbers: {
        fontSize: 24,
        fontWeight: '900',
        color: '#FFFFFF',
        marginTop: 2,
    },
    xpDivider: {
        fontSize: 16,
        fontWeight: '600',
        color: '#A7F3D0',
    },
    xpRemaining: {
        fontSize: 12,
        fontWeight: '700',
        color: '#D1FAE5',
        marginTop: 8,
        textAlign: 'right',
    },

    // ── Stats Row ──
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 4,
        paddingVertical: 18,
    },
    statValue: {
        fontSize: 22,
        fontWeight: '900',
        color: '#111827',
    },
    statLabel: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 4,
        fontWeight: '700',
        textTransform: 'uppercase',
    },

    // ── Achievements ──
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#111827',
    },
    badgeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    badgeItem: {
        width: (width - 56) / 3,
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 8,
        marginBottom: 12,
    },
    badgeLocked: {
        opacity: 0.6,
        backgroundColor: '#F9FAFB',
        borderBottomColor: '#E5E7EB',
    },
    badgeIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    badgeIconLocked: {
        fontSize: 28,
        opacity: 0.5,
    },
    badgeName: {
        fontSize: 11,
        fontWeight: '800',
        color: '#4B5563',
        textAlign: 'center',
    },
    badgeNameLocked: {
        color: '#9CA3AF',
    },
});
