import { StyleSheet, Text, View } from 'react-native';

import { AppShell } from '@/components/app-shell';
import type { MainRoute } from '@/constants/navigation';
import { AppTheme } from '@/constants/theme';

type FeaturePlaceholderProps = {
  activeRoute: MainRoute;
  title: string;
};

export function FeaturePlaceholder({ activeRoute, title }: FeaturePlaceholderProps) {
  // Step 1: Keep unfinished destinations navigable while their designs are added later.
  return (
    <AppShell activeRoute={activeRoute} title={title}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>This screen will be built next.</Text>
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: AppTheme.colors.text,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    marginTop: 10,
    color: AppTheme.colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
});
