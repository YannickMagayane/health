import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_MEDICAL_RESULTS_KEY = 'userMedicalResults';

/**
 * Retrieves all medical results from AsyncStorage.
 * @returns {Promise<Array>} An array of medical results, or an empty array if none/error.
 */
export const getMedicalResults = async () => {
  try {
    const storedResults = await AsyncStorage.getItem(USER_MEDICAL_RESULTS_KEY);
    if (storedResults) {
      const parsedResults = JSON.parse(storedResults);
      // Sort by date, most recent first
      parsedResults.sort((a, b) => new Date(b.date) - new Date(a.date));
      return parsedResults;
    }
    return [];
  } catch (error) {
    console.error('Error getting medical results from AsyncStorage:', error);
    return [];
  }
};

/**
 * Adds a new medical result to AsyncStorage.
 * Ensures each result has a unique ID.
 * @param {object} resultData The medical result data to add.
 * @returns {Promise<Array|null>} The updated array of results or null if error.
 */
export const addMedicalResult = async (resultData) => {
  try {
    const currentResults = await getMedicalResults();
    const newResult = {
      ...resultData,
      id: Date.now().toString(), // Assign a unique ID
    };
    const updatedResults = [...currentResults, newResult];
    updatedResults.sort((a, b) => new Date(b.date) - new Date(a.date)); // Keep sorted
    await AsyncStorage.setItem(USER_MEDICAL_RESULTS_KEY, JSON.stringify(updatedResults));
    return updatedResults;
  } catch (error) {
    console.error('Error adding medical result to AsyncStorage:', error);
    return null;
  }
};

/**
 * Deletes a medical result by its ID from AsyncStorage.
 * @param {string} resultId The ID of the result to delete.
 * @returns {Promise<Array|null>} The updated array of results or null if error.
 */
export const deleteMedicalResult = async (resultId) => {
  try {
    let currentResults = await getMedicalResults();
    currentResults = currentResults.filter(result => result.id !== resultId);
    await AsyncStorage.setItem(USER_MEDICAL_RESULTS_KEY, JSON.stringify(currentResults));
    return currentResults;
  } catch (error) {
    console.error('Error deleting medical result from AsyncStorage:', error);
    return null;
  }
};

/**
 * Updates an existing medical result in AsyncStorage.
 * @param {object} updatedResult The result object with updated data (must include ID).
 * @returns {Promise<Array|null>} The updated array of results or null if error.
 */
export const updateMedicalResult = async (updatedResult) => {
    if (!updatedResult || !updatedResult.id) {
        console.error('Error: updatedMedicalResult requires an ID.');
        return null;
    }
    try {
        let currentResults = await getMedicalResults();
        const resultIndex = currentResults.findIndex(r => r.id === updatedResult.id);
        if (resultIndex === -1) {
            console.error('Error: Medical result with ID not found for update.');
            return currentResults;
        }
        currentResults[resultIndex] = updatedResult;
        currentResults.sort((a, b) => new Date(b.date) - new Date(a.date)); // Re-sort
        await AsyncStorage.setItem(USER_MEDICAL_RESULTS_KEY, JSON.stringify(currentResults));
        return currentResults;
    } catch (error) {
        console.error('Error updating medical result in AsyncStorage:', error);
        return null;
    }
};
