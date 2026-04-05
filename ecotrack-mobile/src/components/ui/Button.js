import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

const variants = {
    default: { bg: '#10B981', shadow: '#059669', text: '#FFF' }, // Emerald
    secondary: { bg: '#FBBF24', shadow: '#D97706', text: '#78350F' }, // Gold
    destructive: { bg: '#EF4444', shadow: '#DC2626', text: '#FFF' },
    outline: { bg: '#E5E7EB', shadow: '#D1D5DB', text: '#111827', border: '#D1D5DB' },
};

export default function Button({
    children,
    onPress,
    variant = 'default',
    style,
    textStyle,
    disabled,
}) {
    const scale = useRef(new Animated.Value(1)).current;
    const currentVariant = variants[variant] || variants.default;

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            friction: 4,
        }).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale }] }}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={disabled}
                style={[
                    styles.button,
                    {
                        backgroundColor: currentVariant.bg,
                        borderBottomColor: currentVariant.shadow,
                        borderBottomWidth: 4,
                    },
                    currentVariant.border ? { borderWidth: 2, borderColor: currentVariant.border } : null,
                    disabled && styles.disabled,
                    style,
                ]}
            >
                <Text style={[styles.text, { color: currentVariant.text }, textStyle]}>
                    {children}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    text: {
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    disabled: {
        opacity: 0.6,
    },
});
