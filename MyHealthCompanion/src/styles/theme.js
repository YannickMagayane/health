// Basic Theme for MyHealthCompanion

export const COLORS = {
  primary: '#007bff', // A calming blue
  secondary: '#28a745', // A reassuring green
  accent: '#17a2b8', // Teal - can be used for highlights or secondary actions

  white: '#ffffff',
  black: '#000000',

  lightGray: '#f8f9fa', // For backgrounds, list items
  mediumGray: '#ced4da', // For borders, dividers
  darkGray: '#343a40', // For text, headers

  danger: '#dc3545', // For error messages, delete buttons
  warning: '#ffc107',
  success: '#28a745',
  info: '#17a2b8',
};

export const FONT_SIZES = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  title: 28,
};

export const SPACING = {
  xsmall: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
};

export const GlobalStyles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray, // Default background for most screens
    padding: SPACING.medium,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SPACING.medium,
    paddingTop: Platform.OS === 'ios' ? SPACING.large : SPACING.medium,
  },
  titleText: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: SPACING.medium,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600', // semi-bold
    color: COLORS.primary,
    marginTop: SPACING.large,
    marginBottom: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.mediumGray,
    paddingBottom: SPACING.small,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    padding: SPACING.medium,
    borderRadius: 8,
    marginBottom: SPACING.medium,
    fontSize: FONT_SIZES.medium,
    color: COLORS.darkGray,
  },
  label: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.darkGray,
    marginBottom: SPACING.small,
    fontWeight: '500',
  },
  errorText: {
      color: COLORS.danger,
      fontSize: FONT_SIZES.medium,
      textAlign: 'center',
      marginBottom: SPACING.medium,
  }
  // Add more global styles as needed
};
