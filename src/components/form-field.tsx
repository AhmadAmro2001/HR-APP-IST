import { forwardRef, useState } from 'react';
import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { tenantBrand } from '@/config/tenant';
import { AppTheme } from '@/constants/theme';

export const FormField = forwardRef<TextInput, TextInputProps>(function FormField(
  { onBlur, onFocus, style, ...props },
  ref,
) {
  // Step 1: Track focus locally so every shared field follows the same border behavior.
  const [isFocused, setIsFocused] = useState(false);

  // Step 2: Preserve any focus handlers supplied by the screen using this field.
  return (
    <TextInput
      {...props}
      ref={ref}
      onBlur={(event) => {
        setIsFocused(false);
        onBlur?.(event);
      }}
      onFocus={(event) => {
        setIsFocused(true);
        onFocus?.(event);
      }}
      placeholderTextColor={AppTheme.colors.placeholder}
      selectionColor={tenantBrand.colors.primary}
      style={[styles.input, style, isFocused && styles.focused]}
    />
  );
});

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 42,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: AppTheme.colors.inputBorder,
    borderRadius: AppTheme.radii.input,
    // The browser's default outline must not cover the teal focus border.
    outlineWidth: 0,
    backgroundColor: AppTheme.colors.surface,
    color: AppTheme.colors.text,
    fontSize: 16,
  },
  focused: {
    borderWidth: 2,
    borderColor: tenantBrand.colors.primary,
    paddingHorizontal: 15,
  },
});
