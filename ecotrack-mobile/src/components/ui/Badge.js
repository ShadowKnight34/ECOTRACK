import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const variants = {
    default: { backgroundColor: '#10B981', color: '#FFF' }, // Emerald
    secondary: { backgroundColor: '#FBBF24', color: '#78350F' }, // Amber/Gold
    destructive: { backgroundColor: '#EF4444', color: '#FFF' }, // Red
    outline: { backgroundColor: 'transparent', color: '#10B981', borderColor: '#10B981', borderWidth: 2 },
};

export default function Badge({ children, variant = 'default', style, textStyle }) {
    const currentVariant = variants[variant] || variants.default;

    return (
        <View
            style={[
                styles.badge,
                { backgroundColor: currentVariant.backgroundColor },
                currentVariant.borderWidth ? { borderWidth: currentVariant.borderWidth, borderColor: currentVariant.borderColor } : null,
                style,
            ]}
        >
            <Text style={[styles.text, { color: currentVariant.color }, textStyle]}>
                {children}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 9999, // Pill shape
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 12,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
});
