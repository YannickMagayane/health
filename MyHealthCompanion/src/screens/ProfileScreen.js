import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Keep for userToken for now
import { COLORS, FONT_SIZES, SPACING, GlobalStyles } from '../styles/theme';
import * as ProfileService from '../services/profileService'; // Import profile service

const DEFAULT_AVATAR_URL = 'https://via.placeholder.com/150';

const ProfileScreen = ({ navigation }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [medicalHistory, setMedicalHistory] = useState([
    // Default/initial structure if needed
    // { id: '1', condition: 'Pollen Allergy' },
  ]);

  const loadProfileData = useCallback(async () => {
    try {
      const profileData = await ProfileService.getProfile();
      const userAuthData = await AsyncStorage.getItem('userToken'); //
      const defaultEmail = userAuthData ? JSON.parse(userAuthData).email || 'user@example.com' : 'user@example.com';

      if (profileData) {
        setFullName(profileData.fullName || '');
        setDob(profileData.dob || '');
        setEmail(profileData.email || defaultEmail);
        setPhoneNumber(profileData.phoneNumber || '');
        setMedicalHistory(profileData.medicalHistory || []);
      } else {
        // If no profile in DB, set defaults (especially email from auth if available)
        setEmail(defaultEmail);
        setFullName(ProfileService.defaultProfile.fullName);
        setDob(ProfileService.defaultProfile.dob);
        setPhoneNumber(ProfileService.defaultProfile.phoneNumber);
        setMedicalHistory(ProfileService.defaultProfile.medicalHistory);
      }
    } catch (e) {
      // Error is logged in service, show user-friendly message
      Alert.alert('Erreur', 'Impossible de charger les données du profil.');
      // Set fallbacks
      setEmail('user@example.com');
      setMedicalHistory([]);
    }
  }, []);

  useEffect(() => {
    loadProfileData();
  }, [loadProfileData]);

  const handleSaveChanges = async () => {
    const profileData = { fullName, dob, email, phoneNumber, medicalHistory };
    const success = await ProfileService.saveProfile(profileData);
    if (success) {
      setIsEditMode(false);
      Alert.alert('Succès', 'Profil sauvegardé avec succès !');
    } else {
      Alert.alert('Erreur', 'Impossible de sauvegarder les données du profil.');
    }
  };

  const handleChangeAvatar = () => {
    Alert.alert('Changement d\'avatar', 'Cette fonctionnalité sera bientôt disponible.');
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Auth token direct removal
      await ProfileService.clearProfile(); // Clear profile using service
      navigation.replace('AuthLoading');
    } catch (e) {
      // Error is logged in service for clearProfile if it fails
      console.error('Failed to sign out overall', e)
      Alert.alert('Erreur', 'Échec de la déconnexion.');
    }
  };

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.avatarSection}>
          <Image source={{ uri: DEFAULT_AVATAR_URL }} style={styles.avatar} />
          <TouchableOpacity
            style={[styles.button, styles.changeAvatarButton, !isEditMode && styles.buttonDisabled]}
            onPress={handleChangeAvatar}
            disabled={!isEditMode}
          >
            <Text style={styles.buttonText}>Changer l'avatar</Text>
          </TouchableOpacity>
        </View>

        <Text style={GlobalStyles.sectionTitle}>Informations Personnelles</Text>

        <Text style={GlobalStyles.label}>Nom complet:</Text>
        <TextInput
          style={isEditMode ? GlobalStyles.input : styles.disabledInput}
          value={fullName}
          onChangeText={setFullName}
          editable={isEditMode}
          placeholder="Entrez votre nom complet"
        />

        <Text style={GlobalStyles.label}>Date de Naissance:</Text>
        <TextInput
          style={isEditMode ? GlobalStyles.input : styles.disabledInput}
          value={dob}
          onChangeText={setDob}
          editable={isEditMode}
          placeholder="YYYY-MM-DD"
        />

        <Text style={GlobalStyles.label}>Adresse e-mail:</Text>
        <TextInput
          style={styles.disabledInput}
          value={email}
          editable={false}
          keyboardType="email-address"
        />

        <Text style={GlobalStyles.label}>Numéro de téléphone:</Text>
        <TextInput
          style={isEditMode ? GlobalStyles.input : styles.disabledInput}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          editable={isEditMode}
          keyboardType="phone-pad"
          placeholder="Entrez votre numéro"
        />

        {!isEditMode ? (
          <TouchableOpacity style={[GlobalStyles.button, styles.editButton]} onPress={() => setIsEditMode(true)}>
            <Text style={GlobalStyles.buttonText}>Modifier le Profil</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[GlobalStyles.button, styles.saveButton]} onPress={handleSaveChanges}>
            <Text style={GlobalStyles.buttonText}>Sauvegarder</Text>
          </TouchableOpacity>
        )}

        <Text style={GlobalStyles.sectionTitle}>Historique Médical (Simulé)</Text>
        <FlatList
          data={medicalHistory}
          keyExtractor={(item) => item.id || item.condition } // Ensure key if id is missing for old data
          renderItem={({ item }) => <Text style={styles.medicalItem}>{item.condition}</Text>}
          ListEmptyComponent={<Text style={styles.emptyListText}>Aucun historique médical.</Text>}
          style={styles.listContainer}
        />

        <TouchableOpacity style={[GlobalStyles.button, styles.signOutButton]} onPress={handleSignOut}>
          <Text style={GlobalStyles.buttonText}>Déconnexion</Text>
        </TouchableOpacity>
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
    ...GlobalStyles.container,
    paddingBottom: SPACING.large,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: SPACING.large,
    marginTop: SPACING.medium,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: SPACING.medium,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  changeAvatarButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
  },
  disabledInput: {
    ...GlobalStyles.input,
    backgroundColor: COLORS.mediumGray, // Use a slightly different shade from theme.js if needed
    color: COLORS.darkGray, // Ensure text is readable
    opacity: 0.7, // Indicate non-interactivity
  },
  editButton: {
    marginTop: SPACING.medium,
  },
  saveButton: {
    backgroundColor: COLORS.success,
    marginTop: SPACING.medium,
  },
  medicalItem: {
    fontSize: FONT_SIZES.medium,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    marginBottom: SPACING.small,
    color: COLORS.darkGray,
  },
  listContainer: {
    maxHeight: 150,
    marginBottom: SPACING.medium,
  },
  emptyListText: {
    textAlign: 'center',
    color: COLORS.darkGray,
    fontSize: FONT_SIZES.medium,
    padding: SPACING.medium,
  },
  signOutButton: {
    backgroundColor: COLORS.danger,
    marginTop: SPACING.large,
  },
  button: {
    ...GlobalStyles.button,
  },
  buttonText: {
    ...GlobalStyles.buttonText,
  },
  buttonDisabled: {
    backgroundColor: COLORS.mediumGray, // Use a theme color for disabled state
    opacity: 0.7,
  }
});

export default ProfileScreen;
