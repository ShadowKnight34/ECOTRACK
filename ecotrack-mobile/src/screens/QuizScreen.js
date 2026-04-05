import React, { useState } from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity,
    SafeAreaView, Alert,
} from 'react-native';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';

// ── Dummy quiz data (will be replaced by API call) ──
const QUIZ_DATA = [
    {
        questionID: 1,
        questionText: 'What does SDG 4 primarily focus on?',
        optionA: 'Clean Water',
        optionB: 'Quality Education',
        optionC: 'No Poverty',
        optionD: 'Good Health',
    },
    {
        questionID: 2,
        questionText: 'Which year is the SDG target deadline?',
        optionA: '2025',
        optionB: '2030',
        optionC: '2035',
        optionD: '2040',
    },
    {
        questionID: 3,
        questionText: 'How many Sustainable Development Goals are there?',
        optionA: '12',
        optionB: '15',
        optionC: '17',
        optionD: '20',
    },
    {
        questionID: 4,
        questionText: 'Which organization adopted the SDGs?',
        optionA: 'WHO',
        optionB: 'UNICEF',
        optionC: 'United Nations',
        optionD: 'World Bank',
    },
];

const OPTIONS = ['A', 'B', 'C', 'D'];

export default function QuizScreen({ route, navigation }) {
    const { moduleID, title } = route?.params || { moduleID: 1, title: 'Quiz' };

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);       // { questionID, selectedOption }
    const [selectedOption, setSelectedOption] = useState(null);

    const question = QUIZ_DATA[currentIndex];
    const totalQuestions = QUIZ_DATA.length;
    const isLastQuestion = currentIndex === totalQuestions - 1;
    const progress = (currentIndex + 1) / totalQuestions;

    // ── Select an option ──
    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    // ── Go to next question or submit ──
    const handleNext = () => {
        if (!selectedOption) {
            Alert.alert('Select an answer', 'Please choose an option before continuing.');
            return;
        }

        const updatedAnswers = [
            ...answers,
            { questionID: question.questionID, selectedOption },
        ];
        setAnswers(updatedAnswers);

        if (isLastQuestion) {
            // Submit quiz
            Alert.alert(
                '🎉 Quiz Complete!',
                `You answered ${totalQuestions} questions.\nYour submission has been recorded.`,
                [{ text: 'Back to Modules', onPress: () => navigation.goBack() }]
            );
        } else {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption(null);
        }
    };

    // ── Get option text from question ──
    const getOptionText = (opt) => {
        const key = `option${opt}`;
        return question[key];
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.moduleTitle}>{title}</Text>
                <Text style={styles.questionCount}>
                    Question {currentIndex + 1} of {totalQuestions}
                </Text>
            </View>

            {/* Progress bar */}
            <ProgressBar progress={progress} color="#10B981" height={10} style={{ marginBottom: 28 }} />

            {/* Question card */}
            <Card style={styles.questionCard}>
                <Badge variant="outline" style={{ marginBottom: 12 }}>
                    Q{currentIndex + 1}
                </Badge>
                <Text style={styles.questionText}>{question.questionText}</Text>
            </Card>

            {/* Options */}
            <View style={styles.optionsContainer}>
                {OPTIONS.map((opt) => {
                    const isSelected = selectedOption === opt;
                    return (
                        <TouchableOpacity
                            key={opt}
                            style={[
                                styles.optionButton,
                                isSelected && styles.optionSelected,
                            ]}
                            activeOpacity={0.8}
                            onPress={() => handleSelect(opt)}
                        >
                            <View style={[styles.optionBadge, isSelected && styles.optionBadgeSelected]}>
                                <Text style={[styles.optionLetter, isSelected && styles.optionLetterSelected]}>
                                    {opt}
                                </Text>
                            </View>
                            <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                                {getOptionText(opt)}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Action button */}
            <View style={{ marginBottom: 20 }}>
                <Button
                    variant={selectedOption ? 'default' : 'outline'}
                    onPress={handleNext}
                    disabled={!selectedOption}
                >
                    {isLastQuestion ? '🚀 Submit Quiz' : 'Next Question →'}
                </Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    moduleTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: '#111827',
        flex: 1,
    },
    questionCount: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '700',
    },
    questionCard: {
        padding: 24,
        marginBottom: 28,
        backgroundColor: '#FFFFFF',
    },
    questionText: {
        fontSize: 22,
        fontWeight: '800',
        color: '#111827',
        lineHeight: 30,
    },
    optionsContainer: {
        flex: 1,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderBottomWidth: 4,
        borderBottomColor: '#D1D5DB',
    },
    optionSelected: {
        backgroundColor: '#D1FAE5',
        borderColor: '#10B981',
        borderBottomColor: '#059669',
    },
    optionBadge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    optionBadgeSelected: {
        backgroundColor: '#10B981',
        borderColor: '#059669',
    },
    optionLetter: {
        fontSize: 16,
        fontWeight: '900',
        color: '#6B7280',
    },
    optionLetterSelected: {
        color: '#FFFFFF',
    },
    optionText: {
        fontSize: 16,
        color: '#4B5563',
        fontWeight: '600',
        flex: 1,
    },
    optionTextSelected: {
        color: '#064E3B',
        fontWeight: '800',
    },
});
