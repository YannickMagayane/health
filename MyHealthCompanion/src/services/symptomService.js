import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_SYMPTOMS_KEY = 'userSymptoms';

/**
 * Retrieves all symptoms from AsyncStorage.
 * @returns {Promise<Array>} An array of symptoms, or an empty array if none/error.
 */
export const getSymptoms = async () => {
  try {
    const storedSymptoms = await AsyncStorage.getItem(USER_SYMPTOMS_KEY);
    if (storedSymptoms) {
      const parsedSymptoms = JSON.parse(storedSymptoms);
      // Ensure data is sorted, typically by date
      parsedSymptoms.sort((a, b) => new Date(a.date) - new Date(b.date));
      return parsedSymptoms;
    }
    return [];
  } catch (error) {
    console.error('Error getting symptoms from AsyncStorage:', error);
    return [];
  }
};

/**
 * Adds a new symptom to AsyncStorage.
 * Ensures each symptom has a unique ID.
 * @param {object} symptomData The symptom data to add (should not include ID).
 * @returns {Promise<Array|null>} The updated array of symptoms or null if error.
 */
export const addSymptom = async (symptomData) => {
  try {
    const currentSymptoms = await getSymptoms(); // Reuses getSymptoms to fetch and parse
    const newSymptom = {
      ...symptomData,
      id: Date.now().toString(), // Assign a unique ID
    };
    const updatedSymptoms = [...currentSymptoms, newSymptom];
    updatedSymptoms.sort((a, b) => new Date(a.date) - new Date(b.date)); // Keep sorted
    await AsyncStorage.setItem(USER_SYMPTOMS_KEY, JSON.stringify(updatedSymptoms));
    return updatedSymptoms;
  } catch (error) {
    console.error('Error adding symptom to AsyncStorage:', error);
    return null;
  }
};

/**
 * Deletes a symptom by its ID from AsyncStorage.
 * @param {string} symptomId The ID of the symptom to delete.
 * @returns {Promise<Array|null>} The updated array of symptoms or null if error.
 */
export const deleteSymptom = async (symptomId) => {
  try {
    let currentSymptoms = await getSymptoms();
    currentSymptoms = currentSymptoms.filter(symptom => symptom.id !== symptomId);
    await AsyncStorage.setItem(USER_SYMPTOMS_KEY, JSON.stringify(currentSymptoms));
    return currentSymptoms;
  } catch (error) {
    console.error('Error deleting symptom from AsyncStorage:', error);
    return null;
  }
};

/**
 * Updates an existing symptom in AsyncStorage.
 * @param {object} updatedSymptom The symptom object with updated data (must include ID).
 * @returns {Promise<Array|null>} The updated array of symptoms or null if error.
 */
export const updateSymptom = async (updatedSymptom) => {
    if (!updatedSymptom || !updatedSymptom.id) {
        console.error('Error: updatedSymptom requires an ID.');
        return null;
    }
    try {
        let currentSymptoms = await getSymptoms();
        const symptomIndex = currentSymptoms.findIndex(s => s.id === updatedSymptom.id);
        if (symptomIndex === -1) {
            console.error('Error: Symptom with ID not found for update.');
            return currentSymptoms; // Or handle as an error
        }
        currentSymptoms[symptomIndex] = updatedSymptom;
        currentSymptoms.sort((a, b) => new Date(a.date) - new Date(b.date)); // Re-sort
        await AsyncStorage.setItem(USER_SYMPTOMS_KEY, JSON.stringify(currentSymptoms));
        return currentSymptoms;
    } catch (error) {
        console.error('Error updating symptom in AsyncStorage:', error);
        return null;
    }
};
