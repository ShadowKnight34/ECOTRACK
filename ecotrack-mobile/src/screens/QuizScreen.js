import React, { useState } from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity,
    SafeAreaView, Animated, Alert,
} from 'react-native';

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
            <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>

            {/* Question card */}
            <View style={styles.questionCard}>
                <Text style={styles.questionNumber}>Q{currentIndex + 1}</Text>
                <Text style={styles.questionText}>{question.questionText}</Text>
            </View>

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
            <TouchableOpacity
                style={[
                    styles.actionButton,
                    !selectedOption && styles.actionButtonDisabled,
                ]}
                activeOpacity={0.85}
                onPress={handleNext}
            >
                <Text style={styles.actionText}>
                    {isLastQuestion ? '🚀 Submit Quiz' : 'Next Question →'}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B3D2E',
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    moduleTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#A7F3D0',
        flex: 1,
    },
    questionCount: {
        fontSize: 13,
        color: '#6EE7B7',
        fontWeight: '600',
    },
    progressTrack: {
        height: 6,
        backgroundColor: '#134E3A',
        borderRadius: 3,
        marginBottom: 28,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#10B981',
        borderRadius: 3,
    },
    questionCard: {
        backgroundColor: '#134E3A',
        borderRadius: 18,
        padding: 24,
        marginBottom: 28,
        borderWidth: 1,
        borderColor: '#1F6E50',
    },
    questionNumber: {
        fontSize: 13,
        fontWeight: '800',
        color: '#10B981',
        marginBottom: 10,
        letterSpacing: 1,
    },
    questionText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#E5E7EB',
        lineHeight: 28,
    },
    optionsContainer: {
        flex: 1,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#134E3A',
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: '#1F6E50',
    },
    optionSelected: {
        backgroundColor: '#064E3B',
        borderColor: '#10B981',
    },
    optionBadge: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#0B3D2E',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    optionBadgeSelected: {
        backgroundColor: '#10B981',
    },
    optionLetter: {
        fontSize: 16,
        fontWeight: '800',
        color: '#6EE7B7',
    },
    optionLetterSelected: {
        color: '#FFFFFF',
    },
    optionText: {
        fontSize: 16,
        color: '#D1D5DB',
        flex: 1,
    },
    optionTextSelected: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    actionButton: {
        backgroundColor: '#10B981',
        borderRadius: 14,
        paddingVertical: 18,
        alignItems: 'center',
        marginBottom: 24,
    },
    actionButtonDisabled: {
        backgroundColor: '#1F6E50',
        opacity: 0.6,
    },
    actionText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
});
