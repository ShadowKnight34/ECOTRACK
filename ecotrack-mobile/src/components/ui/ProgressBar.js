import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export default function ProgressBar({ progress, color = '#10B981', height = 16, style }) {
    // progress should be a number between 0 and 1
    const animatedWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedWidth, {
            toValue: progress,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [progress]);

    const widthInterpolated = animatedWidth.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={[styles.track, { height }, style]}>
            <Animated.View
                style={[
                    styles.fill,
                    { width: widthInterpolated, backgroundColor: color },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    track: {
        backgroundColor: '#E5E7EB', // Tailwind gray-200
        borderRadius: 9999,
        overflow: 'hidden',
        width: '100%',
        // Gamified inner shadow / border
        borderWidth: 2,
        borderColor: '#D1D5DB',
    },
    fill: {
        height: '100%',
        borderRadius: 9999,
    },
});
