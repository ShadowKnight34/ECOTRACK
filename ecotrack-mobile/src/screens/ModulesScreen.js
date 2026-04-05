import React from 'react';
import {
    StyleSheet, Text, View, ScrollView,
    TouchableOpacity, Dimensions,
} from 'react-native';
import { BookOpen, Globe, Droplets, Recycle, TreePine, ArrowRight } from 'lucide-react-native';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';

const { width } = Dimensions.get('window');

const MODULES = [
    {
        moduleID: 1,
        title: 'Basics of Quality Education',
        category: 'SDG 4',
        color: '#10B981', // Emerald
        icon: BookOpen,
        lessons: 5,
    },
    {
        moduleID: 2,
        title: 'Climate Action & Awareness',
        category: 'Environment',
        color: '#3B82F6', // Blue
        icon: Globe,
        lessons: 4,
    },
    {
        moduleID: 3,
        title: 'Clean Water & Sanitation',
        category: 'SDG 6',
        color: '#0EA5E9', // Sky
        icon: Droplets,
        lessons: 3,
    },
    {
        moduleID: 4,
        title: 'Responsible Consumption',
        category: 'SDG 12',
        color: '#F59E0B', // Amber
        icon: Recycle,
        lessons: 4,
    },
    {
        moduleID: 5,
        title: 'Life on Land',
        category: 'SDG 15',
        color: '#84CC16', // Lime
        icon: TreePine,
        lessons: 3,
    },
];

export default function ModulesScreen({ navigation }) {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.heading}>Learning Modules</Text>
                <Text style={styles.subtitle}>
                    Explore topics and test your knowledge
                </Text>
            </View>

            {/* Progress overview */}
            <Card style={styles.progressCard}>
                <View style={styles.progressHeaderRow}>
                    <Text style={styles.progressTitle}>Course Progress</Text>
                    <Badge variant="secondary">2 / {MODULES.length}</Badge>
                </View>
                <ProgressBar progress={2 / MODULES.length} color="#FBBF24" height={16} />
            </Card>

            {/* Module cards */}
            {MODULES.map((mod) => {
                const IconComponent = mod.icon;
                return (
                    <Card key={mod.moduleID} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={[styles.iconBox, { backgroundColor: mod.color }]}>
                                <IconComponent color="#FFF" size={24} />
                            </View>
                            <Badge style={{ backgroundColor: '#F3F4F6' }} textStyle={{ color: '#4B5563' }}>
                                {mod.category}
                            </Badge>
                        </View>

                        <Text style={styles.cardTitle}>{mod.title}</Text>

                        <View style={styles.cardFooter}>
                            <Text style={styles.lessonCount}>
                                {mod.lessons} lessons
                            </Text>
                            <Button
                                variant="default"
                                style={[styles.enterBtn, { backgroundColor: mod.color, borderBottomColor: mod.color, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, borderWidth: 0 }]}
                                onPress={() =>
                                    navigation.navigate('Quiz', {
                                        moduleID: mod.moduleID,
                                        title: mod.title,
                                    })
                                }
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.enterText}>Enter </Text>
                                    <ArrowRight size={16} color="#FFF" />
                                </View>
                            </Button>
                        </View>
                    </Card>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6', // Light background
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
        fontWeight: '900',
        color: '#111827',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 15,
        color: '#4B5563',
        fontWeight: '500',
    },
    progressCard: {
        marginBottom: 24,
        paddingVertical: 20,
    },
    progressHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    progressTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#111827',
    },
    card: {
        marginBottom: 20,
        padding: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    lessonCount: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '700',
    },
    enterBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    enterText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '800',
    },
});
