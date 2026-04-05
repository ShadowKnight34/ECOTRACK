import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ModulesScreen from '../screens/ModulesScreen';
import QuizScreen from '../screens/QuizScreen';

const Stack = createNativeStackNavigator();

export default function ModulesStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#10B981' }, // Emerald primary
                headerTintColor: '#FFFFFF',
                headerTitleStyle: { fontWeight: '900', fontSize: 20 },
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name="ModulesList"
                component={ModulesScreen}
                options={{ title: 'Learn' }}
            />
            <Stack.Screen
                name="Quiz"
                component={QuizScreen}
                options={({ route }) => ({
                    title: route.params?.title || 'Quiz',
                })}
            />
        </Stack.Navigator>
    );
}
