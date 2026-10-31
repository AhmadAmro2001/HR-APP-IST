import { StyleSheet, Text, View } from 'react-native';

import { AppTheme } from '@/constants/theme';

type FormMessageProps = {
  kind: 'error' | 'info';
  message: string;
};

export function FormMessage({ kind, message }: FormMessageProps) {
  // Step 1: Use the error style for failed sign-in and the quiet style for notices.
  const isError = kind === 'error';

  // Step 2: Announce new messages and keep the same component for future API errors.
  return (
    <View
      accessibilityLiveRegion={isError ? 'assertive' : 'polite'}
      style={[styles.container, isError ? styles.errorContainer : styles.infoContainer]}>
      <Text style={[styles.message, isError ? styles.errorText : styles.infoText]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  errorContainer: {
    borderWidth: 1,
    borderColor: AppTheme.colors.errorBorder,
    backgroundColor: AppTheme.colors.errorBackground,
  },
  infoContainer: {
    backgroundColor: AppTheme.colors.surface,
  },
  message: {
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  errorText: {
    color: AppTheme.colors.errorText,
  },
  infoText: {
    color: AppTheme.colors.muted,
  },
});
