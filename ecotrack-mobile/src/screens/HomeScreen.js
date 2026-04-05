import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Flame, Star } from 'lucide-react-native';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* ── Welcome Header ── */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.username}>EcoWarrior! 🌱</Text>
      </View>

      {/* ── Level & Progress Card ── */}
      <Card style={styles.levelCard}>
        <View style={styles.levelHeader}>
          <View>
            <Text style={styles.levelTitle}>Current Level</Text>
            <Text style={styles.levelNumber}>Level 5</Text>
          </View>
          <Badge variant="secondary" style={styles.streakBadge}>
            <Flame size={16} color="#78350F" style={{ marginRight: 4 }} />
            <Text style={{ color: '#78350F', fontWeight: 'bold' }}>3 Day Streak</Text>
          </Badge>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressTextRow}>
            <Text style={styles.xpText}>450 XP</Text>
            <Text style={styles.xpTarget}>500 XP to Level 6</Text>
          </View>
          <ProgressBar progress={450 / 500} color="#FBBF24" height={16} />
        </View>
      </Card>

      {/* ── Quick Stats Grid ── */}
      <View style={styles.statsGrid}>
        <Card style={styles.statSquareCard}>
          <Star color="#FBBF24" size={32} fill="#FBBF24" style={styles.statIcon} />
          <Text style={styles.statSquareValue}>450</Text>
          <Text style={styles.statSquareLabel}>Total XP</Text>
        </Card>
        <Card style={styles.statSquareCard}>
          <Text style={{ fontSize: 32 }}>🎖️</Text>
          <Text style={styles.statSquareValue}>3</Text>
          <Text style={styles.statSquareLabel}>Badges</Text>
        </Card>
      </View>

      {/* ── Daily Goal / CTA ── */}
      <Card style={styles.ctaCard}>
        <Text style={styles.ctaTitle}>Ready for your next lesson?</Text>
        <Text style={styles.ctaSubtitle}>
          You are 50 XP away from reaching Level 6. Complete a module today to level up!
        </Text>
        <Button
          variant="default"
          onPress={() => navigation.navigate('Modules')}
          style={{ width: '100%' }}
        >
          Continue Learning →
        </Button>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Lighter background to make white cards pop
  },
  content: {
    padding: 24,
    paddingTop: 32,
  },
  header: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  username: {
    fontSize: 32,
    fontWeight: '900',
    color: '#111827',
    marginTop: 4,
  },

  // ── Level Card ──
  levelCard: {
    marginBottom: 20,
    backgroundColor: '#10B981', // Emerald primary
    borderColor: '#059669',
    borderBottomColor: '#047857',
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  levelTitle: {
    color: '#A7F3D0',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  levelNumber: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
    marginTop: 2,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  xpText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  xpTarget: {
    color: '#D1FAE5',
    fontWeight: '700',
    fontSize: 14,
  },

  // ── Stats Grid ──
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statSquareCard: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 6,
    paddingVertical: 24,
  },
  statIcon: {
    marginBottom: 8,
  },
  statSquareValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111827',
    marginTop: 8,
  },
  statSquareLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '700',
  },

  // ── Call to Action ──
  ctaCard: {
    alignItems: 'center',
    marginBottom: 40,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 15,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    fontWeight: '500',
  },
});
