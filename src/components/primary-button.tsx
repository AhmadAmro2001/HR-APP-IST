import { Pressable, StyleSheet, Text } from 'react-native';

import { tenantBrand } from '@/config/tenant';
import { AppTheme } from '@/constants/theme';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
};

export function PrimaryButton({ label, onPress }: PrimaryButtonProps) {
  // Use the same client color and button shape across future app screens.
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.button}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: AppTheme.radii.button,
    backgroundColor: tenantBrand.colors.primary,
  },
  label: {
    color: tenantBrand.colors.onPrimary,
    fontSize: 20,
    lineHeight: 25,
  },
});
