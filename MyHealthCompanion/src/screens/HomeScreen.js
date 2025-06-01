import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Not used directly now
import { COLORS, FONT_SIZES, SPACING, GlobalStyles } from '../styles/theme';

const HomeScreen = ({ navigation }) => {
  // Navigation functions for each button
  const menuItems = [
    { title: "Mon Profil", navigateTo: "ProfileTab", icon: "person-outline" }, // Updated to tab name if direct, or screen in stack
    { title: "Suivi des Symptômes", navigateTo: "SymptomTrackerTab", icon: "pulse-outline" },
    { title: "Résultats Médicaux", navigateTo: "MedicalResultsTab", icon: "document-text-outline" },
    { title: "Mes Consultations", navigateTo: "AppointmentsTab", icon: "calendar-outline" },
    { title: "Assistant IA (Chat)", navigateTo: "AiChat", icon: "chatbubbles-outline" },
  ];

  // Note: The navigation names ('ProfileTab', 'SymptomTrackerTab', etc.)
  // should match the screen names defined in the StackNavigators for each tab in AppNavigator.js

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.welcomeTitle}>Bienvenue !</Text>
        <Text style={styles.subtitle}>Votre compagnon de santé personnel.</Text>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuButton}
              onPress={() => navigation.navigate(item.navigateTo)}
            >
              {/* Icons can be added here later if desired */}
              <Text style={styles.menuButtonText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  container: {
    ...GlobalStyles.container, // Use global container style
    alignItems: 'center',
    paddingTop: SPACING.large,
  },
  welcomeTitle: {
    fontSize: FONT_SIZES.title,
    color: COLORS.primary,
    marginBottom: SPACING.small,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.darkGray,
    marginBottom: SPACING.xlarge,
    textAlign: 'center',
  },
  menuContainer: {
    width: '100%',
  },
  menuButton: {
    backgroundColor: COLORS.white,
    padding: SPACING.large,
    borderRadius: 10,
    marginBottom: SPACING.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center text if no icon
    // Shadow for iOS
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },
  menuButtonText: {
    fontSize: FONT_SIZES.large,
    color: COLORS.primary,
    fontWeight: '500',
    // marginLeft: SPACING.medium, // Add if icons are used
  },
});

export default HomeScreen;
