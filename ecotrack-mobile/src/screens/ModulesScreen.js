import React from 'react';
import {
    StyleSheet, Text, View, ScrollView,
    TouchableOpacity, Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const MODULES = [
    {
        moduleID: 1,
        title: 'Basics of Quality Education',
        category: 'SDG 4',
        color: '#10B981',
        icon: '📖',
        lessons: 5,
    },
    {
        moduleID: 2,
        title: 'Climate Action & Awareness',
        category: 'Environment',
        color: '#3B82F6',
        icon: '🌍',
        lessons: 4,
    },
    {
        moduleID: 3,
        title: 'Clean Water & Sanitation',
        category: 'SDG 6',
        color: '#06B6D4',
        icon: '💧',
        lessons: 3,
    },
    {
        moduleID: 4,
        title: 'Responsible Consumption',
        category: 'SDG 12',
        color: '#F59E0B',
        icon: '♻️',
        lessons: 4,
    },
    {
        moduleID: 5,
        title: 'Life on Land',
        category: 'SDG 15',
        color: '#84CC16',
        icon: '🌳',
        lessons: 3,
    },
];

export default function ModulesScreen({ navigation }) {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.heading}>📚 Learning Modules</Text>
                <Text style={styles.subtitle}>
                    Explore topics and test your knowledge
                </Text>
            </View>

            {/* Progress overview */}
            <View style={styles.progressBar}>
                <View style={styles.progressFill} />
                <Text style={styles.progressText}>2 / {MODULES.length} completed</Text>
            </View>

            {/* Module cards */}
            {MODULES.map((mod) => (
                <TouchableOpacity
                    key={mod.moduleID}
                    style={styles.card}
                    activeOpacity={0.85}
                    onPress={() =>
                        navigation.navigate('Quiz', {
                            moduleID: mod.moduleID,
                            title: mod.title,
                        })
                    }
                >
                    {/* Color accent bar */}
                    <View style={[styles.accent, { backgroundColor: mod.color }]} />

                    <View style={styles.cardBody}>
                        <View style={styles.cardTop}>
                            <Text style={styles.cardIcon}>{mod.icon}</Text>
                            <View style={styles.categoryBadge}>
                                <Text style={styles.categoryText}>{mod.category}</Text>
                            </View>
                        </View>

                        <Text style={styles.cardTitle}>{mod.title}</Text>

                        <View style={styles.cardFooter}>
                            <Text style={styles.lessonCount}>
                                {mod.lessons} lessons
                            </Text>
                            <View style={[styles.enterBtn, { backgroundColor: mod.color }]}>
                                <Text style={styles.enterText}>Enter →</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B3D2E',
    },
    content: {
        padding: 20,
        paddingBottom: 32,
    },
    header: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#A7F3D0',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#6EE7B7',
    },
    progressBar: {
        height: 26,
        backgroundColor: '#134E3A',
        borderRadius: 13,
        marginBottom: 24,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    progressFill: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '40%',
        backgroundColor: '#10B981',
        borderRadius: 13,
    },
    progressText: {
        color: '#E5E7EB',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#134E3A',
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#1F6E50',
    },
    accent: {
        width: 5,
    },
    cardBody: {
        flex: 1,
        padding: 18,
    },
    cardTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    cardIcon: {
        fontSize: 30,
    },
    categoryBadge: {
        backgroundColor: '#0B3D2E',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    categoryText: {
        color: '#6EE7B7',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#E5E7EB',
        marginBottom: 14,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    lessonCount: {
        fontSize: 13,
        color: '#9CA3AF',
    },
    enterBtn: {
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    enterText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '700',
    },
});
