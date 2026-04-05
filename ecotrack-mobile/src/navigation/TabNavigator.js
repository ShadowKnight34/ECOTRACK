import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, BookOpen, Trophy, User } from 'lucide-react-native';
import HomeScreen from '../screens/HomeScreen';
import ModulesStackNavigator from './ModulesStackNavigator';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: '#10B981', // Emerald primary
                    shadowColor: 'transparent', // remove default shadow
                    elevation: 0,
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: { fontWeight: '900', fontSize: 20, letterSpacing: 0.5 },
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 2,
                    borderTopColor: '#E5E7EB',
                    paddingBottom: 8,
                    paddingTop: 8,
                    height: 64,
                },
                tabBarLabelStyle: {
                    fontWeight: '800',
                    fontSize: 11,
                    marginTop: 2,
                },
                tabBarActiveTintColor: '#10B981',
                tabBarInactiveTintColor: '#9CA3AF',
                tabBarIcon: ({ color, size }) => {
                    const iconSize = 24;
                    if (route.name === 'Home') return <Home color={color} size={iconSize} strokeWidth={2.5} />;
                    if (route.name === 'Modules') return <BookOpen color={color} size={iconSize} strokeWidth={2.5} />;
                    if (route.name === 'Leaderboard') return <Trophy color={color} size={iconSize} strokeWidth={2.5} />;
                    if (route.name === 'Profile') return <User color={color} size={iconSize} strokeWidth={2.5} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
            <Tab.Screen name="Modules" component={ModulesStackNavigator} options={{ title: 'Learn', headerShown: false }} />
            <Tab.Screen name="Leaderboard" component={LeaderboardScreen} options={{ title: 'Ranks' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        </Tab.Navigator>
    );
}
