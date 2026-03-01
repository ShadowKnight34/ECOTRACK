import React, { useState, useContext } from 'react';
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, KeyboardAvoidingView, Platform,
} from 'react-native';
import { AuthContext } from '../navigation/AppNavigator';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setIsAuthenticated } = useContext(AuthContext);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.header}>
                <Text style={styles.logo}>🌿</Text>
                <Text style={styles.title}>EcoTrack</Text>
                <Text style={styles.subtitle}>Learn. Play. Save the Planet.</Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#6B7280"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#6B7280"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={() => setIsAuthenticated(true)}>
                    <Text style={styles.buttonText}>Mock Login / Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.linkText}>
                        Don't have an account? <Text style={styles.linkBold}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B3D2E',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    logo: {
        fontSize: 56,
        marginBottom: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#A7F3D0',
    },
    subtitle: {
        fontSize: 14,
        color: '#6EE7B7',
        marginTop: 4,
        letterSpacing: 1,
    },
    form: {
        width: '100%',
    },
    input: {
        backgroundColor: '#134E3A',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        color: '#E5E7EB',
        fontSize: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#1F6E50',
    },
    button: {
        backgroundColor: '#10B981',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
    linkText: {
        color: '#9CA3AF',
        textAlign: 'center',
        fontSize: 14,
    },
    linkBold: {
        color: '#34D399',
        fontWeight: '600',
    },
});
