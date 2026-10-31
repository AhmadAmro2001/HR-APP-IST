import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppShell } from '@/components/app-shell';
import { AppTheme } from '@/constants/theme';
import { demoEmployee } from '@/mocks/employee';

// Step 1: Keep the four home shortcuts together so their destinations are easy to update.
const homeShortcuts = [
  { label: 'Personal Data', icon: '👤', href: '/personal-data' },
  { label: 'Pay Slip', icon: '💰', href: '/pay-slip' },
  { label: 'Requests', icon: '📋', href: '/requests' },
  { label: 'Approvals', icon: '✅', href: '/approvals' },
] as const;

export default function HomeScreen() {
  const router = useRouter();

  return (
    <AppShell activeRoute="/home" title="Home">
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Step 2: Show the greeting and mock employee name from the design. */}
        <View style={styles.welcomeBlock}>
          <Text style={styles.welcomeBack}>Welcome Back</Text>
          <Text style={styles.employeeName}>{demoEmployee.displayName}</Text>
          <Text style={styles.prompt}>What would you like to do today?</Text>
        </View>

        {/* Step 3: Open the future feature routes from the four teal cards. */}
        <View style={styles.shortcutGrid}>
          {homeShortcuts.map((shortcut) => (
            <Pressable
              key={shortcut.href}
              accessibilityLabel={shortcut.label}
              accessibilityRole="button"
              onPress={() => router.push(shortcut.href)}
              style={styles.shortcutCard}>
              <Text style={styles.shortcutIcon}>{shortcut.icon}</Text>
              <Text style={styles.shortcutLabel}>{shortcut.label}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 100,
    paddingBottom: 48,
    alignItems: 'center',
  },
  welcomeBlock: {
    alignItems: 'center',
  },
  welcomeBack: {
    color: AppTheme.colors.text,
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
  },
  employeeName: {
    marginTop: 2,
    color: AppTheme.colors.text,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
    textAlign: 'center',
  },
  prompt: {
    marginTop: 2,
    color: AppTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 17,
    textAlign: 'center',
  },
  shortcutGrid: {
    width: '78%',
    maxWidth: 320,
    marginTop: 29,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
  shortcutCard: {
    width: '47%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: AppTheme.radii.homeTile,
    backgroundColor: AppTheme.colors.primary,
  },
  shortcutIcon: {
    fontSize: 34,
    lineHeight: 43,
    textAlign: 'center',
  },
  shortcutLabel: {
    marginTop: 10,
    color: AppTheme.colors.surface,
    fontSize: 13,
    lineHeight: 17,
    textAlign: 'center',
  },
});
