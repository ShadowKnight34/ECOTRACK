import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* ── Welcome Header ── */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.username}>EcoWarrior! 🌱</Text>
      </View>

      {/* ── Quick Stats Row ── */}
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Quick Stats</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>450</Text>
            <Text style={styles.statLabel}>XP</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
        </View>
      </View>

      {/* ── Daily Goal / CTA ── */}
      <View style={styles.ctaCard}>
        <Text style={styles.ctaTitle}>Ready for your next lesson?</Text>
        <Text style={styles.ctaSubtitle}>
          You are 50 XP away from reaching Level 6. Complete a module today to level up!
        </Text>
        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Modules')}
        >
          <Text style={styles.continueButtonText}>Continue Learning →</Text>
        </TouchableOpacity>
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
    padding: 24,
    paddingTop: 32,
  },
  header: {
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 18,
    color: '#6EE7B7',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  username: {
    fontSize: 32,
    fontWeight: '900',
    color: '#A7F3D0',
    marginTop: 4,
  },

  // ── Quick Stats ──
  statsCard: {
    backgroundColor: '#134E3A',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#1F6E50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#34D399',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#E5E7EB',
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#1F6E50',
  },

  // ── Call to Action ──
  ctaCard: {
    backgroundColor: '#064E3B',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#10B981',
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 14,
    color: '#A7F3D0',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
