import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Card({ children, style, variant = 'default' }) {
    // We can support variants like primary, secondary (e.g. green, yellow)
    // For now we'll stick to a default white/light green or dark mode gamified look

    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        // Neobrutalist / gamified shadow
        borderBottomWidth: 6,
        borderBottomColor: '#D1D5DB',
        // Shadow for iOS/Android
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
});
