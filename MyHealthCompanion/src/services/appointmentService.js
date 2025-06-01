import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const USER_APPOINTMENTS_KEY = 'userAppointments';

/**
 * Retrieves all appointments from AsyncStorage.
 * @returns {Promise<Array>} An array of appointments, or an empty array if none/error.
 */
export const getAppointments = async () => {
  try {
    const storedAppointments = await AsyncStorage.getItem(USER_APPOINTMENTS_KEY);
    if (storedAppointments) {
      const parsedAppointments = JSON.parse(storedAppointments);
      // Sort by date, upcoming first
      parsedAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
      return parsedAppointments;
    }
    return [];
  } catch (error) {
    console.error('Error getting appointments from AsyncStorage:', error);
    return [];
  }
};

/**
 * Adds a new appointment to AsyncStorage.
 * Ensures each appointment has a unique ID.
 * @param {object} appointmentData The appointment data to add.
 * @returns {Promise<Array|null>} The updated array of appointments or null if error.
 */
export const addAppointment = async (appointmentData) => {
  try {
    const currentAppointments = await getAppointments();
    const newAppointment = {
      ...appointmentData,
      id: Date.now().toString(), // Assign a unique ID
    };
    const updatedAppointments = [...currentAppointments, newAppointment];
    updatedAppointments.sort((a, b) => new Date(a.date) - new Date(b.date)); // Keep sorted
    await AsyncStorage.setItem(USER_APPOINTMENTS_KEY, JSON.stringify(updatedAppointments));
    return updatedAppointments;
  } catch (error) {
    console.error('Error adding appointment to AsyncStorage:', error);
    return null;
  }
};

/**
 * Deletes an appointment by its ID from AsyncStorage and cancels its notification.
 * @param {string} appointmentId The ID of the appointment to delete.
 * @returns {Promise<Array|null>} The updated array of appointments or null if error.
 */
export const deleteAppointment = async (appointmentId) => {
  try {
    let currentAppointments = await getAppointments();
    const appointmentToDelete = currentAppointments.find(app => app.id === appointmentId);

    if (appointmentToDelete && appointmentToDelete.notificationId) {
      await Notifications.cancelScheduledNotificationAsync(appointmentToDelete.notificationId);
    }

    currentAppointments = currentAppointments.filter(appointment => appointment.id !== appointmentId);
    await AsyncStorage.setItem(USER_APPOINTMENTS_KEY, JSON.stringify(currentAppointments));
    return currentAppointments;
  } catch (error) {
    console.error('Error deleting appointment from AsyncStorage:', error);
    return null;
  }
};

/**
 * Updates an existing appointment in AsyncStorage.
 * Also handles re-scheduling or cancelling notification if date changes.
 * @param {object} updatedAppointment The appointment object with updated data (must include ID).
 * @returns {Promise<Array|null>} The updated array of appointments or null if error.
 */
export const updateAppointment = async (updatedAppointment, scheduleNotificationFn) => {
    if (!updatedAppointment || !updatedAppointment.id) {
        console.error('Error: updatedAppointment requires an ID.');
        return null;
    }
    try {
        let currentAppointments = await getAppointments();
        const appointmentIndex = currentAppointments.findIndex(a => a.id === updatedAppointment.id);

        if (appointmentIndex === -1) {
            console.error('Error: Appointment with ID not found for update.');
            return currentAppointments;
        }

        const oldAppointment = currentAppointments[appointmentIndex];

        // Cancel old notification if it exists
        if (oldAppointment.notificationId) {
            await Notifications.cancelScheduledNotificationAsync(oldAppointment.notificationId);
            updatedAppointment.notificationId = null; // Clear old ID
        }

        // Schedule new notification if date is in future and scheduleNotificationFn is provided
        if (new Date(updatedAppointment.date) > new Date() && typeof scheduleNotificationFn === 'function') {
            // The scheduleNotificationFn is expected to be passed from the screen,
            // as it might involve UI (Alerts) or specific logic not suitable for a generic service.
            // It should return a new notificationId or null.
            updatedAppointment.notificationId = await scheduleNotificationFn(updatedAppointment);
        }

        currentAppointments[appointmentIndex] = updatedAppointment;
        currentAppointments.sort((a, b) => new Date(a.date) - new Date(b.date)); // Re-sort
        await AsyncStorage.setItem(USER_APPOINTMENTS_KEY, JSON.stringify(currentAppointments));
        return currentAppointments;
    } catch (error) {
        console.error('Error updating appointment in AsyncStorage:', error);
        return null;
    }
};
