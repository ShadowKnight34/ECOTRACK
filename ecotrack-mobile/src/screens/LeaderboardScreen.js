import React from 'react';
import {
    StyleSheet, Text, View, FlatList, Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// ── Dummy leaderboard data ──
const LEADERBOARD = [
    { rank: 1, username: 'EcoWarrior', level: 8, xp: 1580 },
    { rank: 2, username: 'GreenHero', level: 7, xp: 1350 },
    { rank: 3, username: 'PlanetSaver', level: 6, xp: 1120 },
    { rank: 4, username: 'TreeHugger99', level: 5, xp: 980 },
    { rank: 5, username: 'EcoStudent', level: 5, xp: 920 },
    { rank: 6, username: 'NatureNinja', level: 4, xp: 780 },
    { rank: 7, username: 'GreenThumb', level: 4, xp: 710 },
    { rank: 8, username: 'EarthGuard', level: 3, xp: 550 },
    { rank: 9, username: 'BioChamp', level: 3, xp: 490 },
    { rank: 10, username: 'LeafLearner', level: 2, xp: 310 },
];

// ── Medal colors for top 3 ──
const MEDAL = {
    1: { bg: '#FBBF24', text: '#78350F', emoji: '🥇', ring: '#F59E0B' },
    2: { bg: '#9CA3AF', text: '#1F2937', emoji: '🥈', ring: '#6B7280' },
    3: { bg: '#D97706', text: '#451A03', emoji: '🥉', ring: '#B45309' },
};

function TopThreePodium() {
    const top3 = LEADERBOARD.slice(0, 3);
    // Display order: 2nd, 1st, 3rd
    const ordered = [top3[1], top3[0], top3[2]];
    const heights = [110, 140, 90];

    return (
        <View style={styles.podiumContainer}>
            {ordered.map((user, i) => {
                const medal = MEDAL[user.rank];
                return (
                    <View key={user.rank} style={styles.podiumSlot}>
                        {/* Avatar */}
                        <View style={[styles.podiumAvatar, { borderColor: medal.ring }]}>
                            <Text style={styles.podiumEmoji}>{medal.emoji}</Text>
                        </View>
                        <Text style={styles.podiumUsername} numberOfLines={1}>
                            {user.username}
                        </Text>
                        <Text style={styles.podiumXP}>{user.xp} XP</Text>
                        {/* Podium bar */}
                        <View
                            style={[
                                styles.podiumBar,
                                { height: heights[i], backgroundColor: medal.bg },
                            ]}
                        >
                            <Text style={[styles.podiumRank, { color: medal.text }]}>
                                {user.rank}
                            </Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

function LeaderRow({ item }) {
    const isTopThree = item.rank <= 3;
    const medal = MEDAL[item.rank];

    return (
        <View style={[styles.row, isTopThree && styles.rowHighlight]}>
            {/* Rank */}
            <View
                style={[
                    styles.rankBadge,
                    isTopThree && { backgroundColor: medal.bg },
                ]}
            >
                <Text
                    style={[
                        styles.rankText,
                        isTopThree && { color: medal.text },
                    ]}
                >
                    {item.rank}
                </Text>
            </View>

            {/* User info */}
            <View style={styles.userInfo}>
                <Text style={styles.rowUsername}>{item.username}</Text>
                <Text style={styles.rowLevel}>Level {item.level}</Text>
            </View>

            {/* XP */}
            <Text style={[styles.rowXP, isTopThree && { color: '#FBBF24' }]}>
                {item.xp.toLocaleString()} XP
            </Text>
        </View>
    );
}

export default function LeaderboardScreen() {
    return (
        <View style={styles.container}>
            <FlatList
                data={LEADERBOARD}
                keyExtractor={(item) => item.rank.toString()}
                ListHeaderComponent={
                    <View>
                        <View style={styles.header}>
                            <Text style={styles.heading}>🏆 Leaderboard</Text>
                            <Text style={styles.subtitle}>Top learners this season</Text>
                        </View>
                        <TopThreePodium />
                        <Text style={styles.allRanksTitle}>All Rankings</Text>
                    </View>
                }
                renderItem={({ item }) => <LeaderRow item={item} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B3D2E',
    },
    listContent: {
        padding: 20,
        paddingBottom: 32,
    },
    header: {
        marginBottom: 24,
    },
    heading: {
        fontSize: 28,
        fontWeight: '800',
        color: '#A7F3D0',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#6EE7B7',
    },

    // ── Podium ──
    podiumContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: 28,
        paddingHorizontal: 8,
    },
    podiumSlot: {
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 6,
    },
    podiumAvatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        borderWidth: 3,
        backgroundColor: '#134E3A',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    podiumEmoji: {
        fontSize: 24,
    },
    podiumUsername: {
        fontSize: 12,
        fontWeight: '700',
        color: '#E5E7EB',
        marginBottom: 2,
    },
    podiumXP: {
        fontSize: 11,
        color: '#6EE7B7',
        fontWeight: '600',
        marginBottom: 6,
    },
    podiumBar: {
        width: '100%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    podiumRank: {
        fontSize: 28,
        fontWeight: '900',
    },

    // ── List ──
    allRanksTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#A7F3D0',
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#134E3A',
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#1F6E50',
    },
    rowHighlight: {
        borderColor: '#FBBF24',
        borderWidth: 1.5,
    },
    rankBadge: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#0B3D2E',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    rankText: {
        fontSize: 15,
        fontWeight: '800',
        color: '#6EE7B7',
    },
    userInfo: {
        flex: 1,
    },
    rowUsername: {
        fontSize: 16,
        fontWeight: '700',
        color: '#E5E7EB',
    },
    rowLevel: {
        fontSize: 12,
        color: '#9CA3AF',
        marginTop: 2,
    },
    rowXP: {
        fontSize: 16,
        fontWeight: '800',
        color: '#34D399',
    },
});
