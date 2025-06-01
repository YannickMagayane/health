import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Using Ionicons for tab icons

// Screens
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SymptomTrackerScreen from '../screens/SymptomTrackerScreen';
import MedicalResultsScreen from '../screens/MedicalResultsScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import AiChatScreen from '../screens/AiChatScreen'; // Import AiChatScreen

// Theme
import { COLORS, FONT_SIZES } from '../styles/theme';

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigators for each Tab
const HomeStackNav = createStackNavigator();
const HomeStack = () => (
  <HomeStackNav.Navigator screenOptions={defaultStackScreenOptions}>
    <HomeStackNav.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Accueil' }} />
    <HomeStackNav.Screen name="AiChat" component={AiChatScreen} options={{ title: 'Assistant IA' }} />
  </HomeStackNav.Navigator>
);

const SymptomsStackNav = createStackNavigator();
const SymptomsStack = () => (
  <SymptomsStackNav.Navigator screenOptions={defaultStackScreenOptions}>
    <SymptomsStackNav.Screen name="SymptomTrackerTab" component={SymptomTrackerScreen} options={{ title: 'Suivi des Symptômes' }} />
    {/* Add other symptom-related screens here if needed, e.g., AddSymptomScreen */}
  </SymptomsStackNav.Navigator>
);

const ResultsStackNav = createStackNavigator();
const ResultsStack = () => (
  <ResultsStackNav.Navigator screenOptions={defaultStackScreenOptions}>
    <ResultsStackNav.Screen name="MedicalResultsTab" component={MedicalResultsScreen} options={{ title: 'Résultats Médicaux' }} />
    {/* Add other result-related screens here, e.g., AddResultScreen */}
  </ResultsStackNav.Navigator>
);

const AppointmentsStackNav = createStackNavigator();
const AppointmentsStack = () => (
  <AppointmentsStackNav.Navigator screenOptions={defaultStackScreenOptions}>
    <AppointmentsStackNav.Screen name="AppointmentsTab" component={AppointmentsScreen} options={{ title: 'Consultations' }} />
    {/* Add other appointment-related screens here, e.g., AddAppointmentScreen */}
  </AppointmentsStackNav.Navigator>
);

const ProfileStackNav = createStackNavigator();
const ProfileStack = () => (
  <ProfileStackNav.Navigator screenOptions={defaultStackScreenOptions}>
    <ProfileStackNav.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profil' }} />
  </ProfileStackNav.Navigator>
);

// Default screen options for StackNavigators within tabs
const defaultStackScreenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'ios' ? COLORS.lightGray : COLORS.primary,
  },
  headerTintColor: Platform.OS === 'ios' ? COLORS.primary : COLORS.white,
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: FONT_SIZES.large,
  },
};

// Bottom Tab Navigator for authenticated users
const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Accueil') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Symptômes') iconName = focused ? 'pulse' : 'pulse-outline';
          else if (route.name === 'Résultats') iconName = focused ? 'document-text' : 'document-text-outline';
          else if (route.name === 'Consultations') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'Profil') iconName = focused ? 'person-circle' : 'person-circle-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.darkGray,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.mediumGray,
        },
        headerShown: false, // Headers are handled by individual stack navigators for each tab
      })}
    >
      <Tab.Screen name="Accueil" component={HomeStack} />
      <Tab.Screen name="Symptômes" component={SymptomsStack} />
      <Tab.Screen name="Résultats" component={ResultsStack} />
      <Tab.Screen name="Consultations" component={AppointmentsStack} />
      <Tab.Screen name="Profil" component={ProfileStack} />
    </Tab.Navigator>
  );
};

// Main navigator: switches between Auth and App (Tab) stacks
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName="AuthLoading" screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <AuthStack.Screen name="SignIn" component={SignInScreen} />
        <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        <AuthStack.Screen name="App" component={AppTabs} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
