import React from 'react';
import {
    StyleSheet, Text, View, ScrollView, Dimensions,
} from 'react-native';

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
    const xpProgress = (USER.xp / USER.nextLevelXP) * 100;

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
            <View style={styles.levelCard}>
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
                <View style={styles.xpBarTrack}>
                    <View style={[styles.xpBarFill, { width: `${xpProgress}%` }]}>
                        <View style={styles.xpBarShine} />
                    </View>
                </View>
                <Text style={styles.xpRemaining}>
                    {USER.nextLevelXP - USER.xp} XP to Level {USER.level + 1}
                </Text>
            </View>

            {/* ── Stats Row ── */}
            <View style={styles.statsRow}>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>12</Text>
                    <Text style={styles.statLabel}>Quizzes</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>87%</Text>
                    <Text style={styles.statLabel}>Avg Score</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{BADGES.filter(b => b.earned).length}</Text>
                    <Text style={styles.statLabel}>Badges</Text>
                </View>
            </View>

            {/* ── Achievements Grid ── */}
            <Text style={styles.sectionTitle}>🏅 Achievements</Text>
            <View style={styles.badgeGrid}>
                {BADGES.map((badge) => (
                    <View
                        key={badge.id}
                        style={[styles.badgeItem, !badge.earned && styles.badgeLocked]}
                    >
                        <Text style={[styles.badgeIcon, !badge.earned && styles.badgeIconLocked]}>
                            {badge.earned ? badge.icon : '🔒'}
                        </Text>
                        <Text style={[styles.badgeName, !badge.earned && styles.badgeNameLocked]}>
                            {badge.name}
                        </Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B3D2E',
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
        borderWidth: 3,
        borderColor: '#10B981',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#134E3A',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarEmoji: {
        fontSize: 46,
    },
    username: {
        fontSize: 24,
        fontWeight: '800',
        color: '#A7F3D0',
    },
    email: {
        fontSize: 13,
        color: '#6EE7B7',
        marginTop: 2,
    },

    // ── Level Card ──
    levelCard: {
        backgroundColor: '#134E3A',
        borderRadius: 18,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#1F6E50',
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
        backgroundColor: '#10B981',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    levelBadgeText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#064E3B',
        letterSpacing: 1,
    },
    levelNumber: {
        fontSize: 22,
        fontWeight: '900',
        color: '#FFFFFF',
        marginTop: -2,
    },
    xpInfo: {
        flex: 1,
    },
    xpTitle: {
        fontSize: 13,
        color: '#9CA3AF',
        fontWeight: '600',
    },
    xpNumbers: {
        fontSize: 22,
        fontWeight: '800',
        color: '#E5E7EB',
        marginTop: 2,
    },
    xpDivider: {
        fontSize: 15,
        fontWeight: '500',
        color: '#6B7280',
    },
    xpBarTrack: {
        height: 12,
        backgroundColor: '#0B3D2E',
        borderRadius: 6,
        overflow: 'hidden',
    },
    xpBarFill: {
        height: '100%',
        backgroundColor: '#10B981',
        borderRadius: 6,
        overflow: 'hidden',
    },
    xpBarShine: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 2,
    },
    xpRemaining: {
        fontSize: 12,
        color: '#6EE7B7',
        marginTop: 8,
        textAlign: 'right',
    },

    // ── Stats Row ──
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 28,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#134E3A',
        borderRadius: 14,
        paddingVertical: 18,
        alignItems: 'center',
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: '#1F6E50',
    },
    statValue: {
        fontSize: 22,
        fontWeight: '800',
        color: '#34D399',
    },
    statLabel: {
        fontSize: 11,
        color: '#9CA3AF',
        marginTop: 4,
        fontWeight: '600',
    },

    // ── Achievements ──
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#A7F3D0',
        marginBottom: 16,
    },
    badgeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    badgeItem: {
        width: (width - 56) / 3,
        backgroundColor: '#134E3A',
        borderRadius: 14,
        paddingVertical: 18,
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#1F6E50',
    },
    badgeLocked: {
        opacity: 0.45,
        borderColor: '#0B3D2E',
    },
    badgeIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    badgeIconLocked: {
        fontSize: 28,
    },
    badgeName: {
        fontSize: 11,
        fontWeight: '700',
        color: '#E5E7EB',
        textAlign: 'center',
        paddingHorizontal: 4,
    },
    badgeNameLocked: {
        color: '#6B7280',
    },
});
