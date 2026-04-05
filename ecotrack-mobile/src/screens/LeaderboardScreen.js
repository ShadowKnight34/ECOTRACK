import React from 'react';
import {
    StyleSheet, Text, View, FlatList, Dimensions,
} from 'react-native';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

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
    2: { bg: '#9CA3AF', text: '#111827', emoji: '🥈', ring: '#6B7280' },
    3: { bg: '#D97706', text: '#451A03', emoji: '🥉', ring: '#B45309' },
};

function TopThreePodium() {
    const top3 = LEADERBOARD.slice(0, 3);
    // Display order: 2nd, 1st, 3rd
    const ordered = [top3[1], top3[0], top3[2]];
    const heights = [100, 140, 80];

    return (
        <View style={styles.podiumContainer}>
            {ordered.map((user, i) => {
                const medal = MEDAL[user.rank];
                return (
                    <View key={user.rank} style={styles.podiumSlot}>
                        {/* Avatar */}
                        <View style={[styles.podiumAvatar, { borderColor: medal.ring, backgroundColor: medal.ring + '40' }]}>
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
        <Card style={[styles.row, isTopThree && { borderColor: medal.ring, borderBottomColor: medal.ring, backgroundColor: medal.bg + '10' }]}>
            {/* Rank */}
            <View
                style={[
                    styles.rankBadge,
                    isTopThree && { backgroundColor: medal.bg, borderColor: medal.ring },
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
            <Badge variant="secondary" style={isTopThree && { backgroundColor: medal.bg }} textStyle={isTopThree && { color: medal.text }}>
                {item.xp.toLocaleString()} XP
            </Badge>
        </Card>
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
                            <Text style={styles.heading}>Leaderboard</Text>
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
        backgroundColor: '#F3F4F6',
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
        fontWeight: '900',
        color: '#111827',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 15,
        color: '#4B5563',
        fontWeight: '500',
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
        marginHorizontal: 4,
    },
    podiumAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    podiumEmoji: {
        fontSize: 26,
    },
    podiumUsername: {
        fontSize: 13,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 4,
    },
    podiumXP: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '700',
        marginBottom: 8,
    },
    podiumBar: {
        width: '100%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderBottomWidth: 0,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    podiumRank: {
        fontSize: 32,
        fontWeight: '900',
    },

    // ── List ──
    allRanksTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#111827',
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        padding: 16,
    },
    rankBadge: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        borderWidth: 2,
        borderColor: '#D1D5DB',
    },
    rankText: {
        fontSize: 15,
        fontWeight: '900',
        color: '#6B7280',
    },
    userInfo: {
        flex: 1,
    },
    rowUsername: {
        fontSize: 16,
        fontWeight: '800',
        color: '#111827',
    },
    rowLevel: {
        fontSize: 13,
        color: '#6B7280',
        marginTop: 2,
        fontWeight: '600',
    },
});
