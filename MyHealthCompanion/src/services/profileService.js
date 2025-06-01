import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_PROFILE_KEY = 'userProfile';

/**
 * Retrieves the user's profile data from AsyncStorage.
 * @returns {Promise<object|null>} The profile data object or null if not found/error.
 */
export const getProfile = async () => {
  try {
    const storedProfile = await AsyncStorage.getItem(USER_PROFILE_KEY);
    if (storedProfile) {
      return JSON.parse(storedProfile);
    }
    return null; // Or return a default profile structure
  } catch (error) {
    console.error('Error getting profile data from AsyncStorage:', error);
    return null;
  }
};

/**
 * Saves the user's profile data to AsyncStorage.
 * @param {object} profileData The profile data to save.
 * @returns {Promise<boolean>} True if successful, false otherwise.
 */
export const saveProfile = async (profileData) => {
  try {
    await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profileData));
    return true;
  } catch (error) {
    console.error('Error saving profile data to AsyncStorage:', error);
    return false;
  }
};

/**
 * Clears the user's profile data from AsyncStorage.
 * @returns {Promise<boolean>} True if successful, false otherwise.
 */
export const clearProfile = async () => {
    try {
        await AsyncStorage.removeItem(USER_PROFILE_KEY);
        return true;
    } catch (error) {
        console.error('Error clearing profile data from AsyncStorage:', error);
        return false;
    }
};

// Example of a default profile structure if needed elsewhere
export const defaultProfile = {
  fullName: '',
  dob: '',
  email: '', // This might be pre-filled from auth
  phoneNumber: '',
  medicalHistory: [], // Or other default structure for medical history
};
