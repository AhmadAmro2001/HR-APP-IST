import { useState, type ReactNode } from 'react';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tenantBrand } from '@/config/tenant';
import { mainNavigation, type MainRoute } from '@/constants/navigation';
import { AppTheme } from '@/constants/theme';

type AppShellProps = {
  activeRoute: MainRoute;
  children: ReactNode;
  title: string;
};

export function AppShell({ activeRoute, children, title }: AppShellProps) {
  // Step 1: Keep the menu state and shared navigation in one component.
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigateTo = (href: MainRoute) => {
    setMenuOpen(false);
    router.replace(href);
  };

  const logout = () => {
    // The demo has no saved session yet; the future auth service will clear it here.
    setMenuOpen(false);
    router.replace('/login');
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" backgroundColor={tenantBrand.colors.primary} />
      <View style={styles.page}>
        {/* Step 2: Show the same teal header on the main app screens. */}
        <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
          <View style={styles.header}>
            <Pressable
              accessibilityLabel="Open navigation menu"
              accessibilityRole="button"
              onPress={() => setMenuOpen(true)}
              style={styles.headerAction}>
              <View style={styles.menuIcon}>
                <View style={styles.menuIconLine} />
                <View style={styles.menuIconLine} />
                <View style={styles.menuIconLine} />
              </View>
            </Pressable>
            <Text style={styles.headerTitle}>{title}</Text>
            <Pressable
              accessibilityLabel="Notifications"
              accessibilityRole="button"
              onPress={() => router.push('/notifications')}
              style={styles.headerAction}>
              <Text style={styles.bellIcon}>🔔</Text>
            </Pressable>
          </View>
        </SafeAreaView>

        <View style={styles.content}>{children}</View>

        {/* Step 3: Reuse one navigation list for the four bottom destinations. */}
        <SafeAreaView edges={['bottom']} style={styles.bottomSafeArea}>
          <View style={styles.bottomBar}>
            {mainNavigation.map((item) => (
              <Pressable
                key={item.href}
                accessibilityLabel={item.label}
                accessibilityRole="button"
                accessibilityState={{ selected: item.href === activeRoute }}
                onPress={() => navigateTo(item.href)}
                style={styles.bottomItem}>
                <Text style={styles.bottomIcon}>{item.icon}</Text>
                <Text style={styles.bottomLabel}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        </SafeAreaView>

        {/* Step 4: The side menu mirrors the bottom bar and adds Logout. */}
        {menuOpen && (
          <View style={styles.menuOverlay}>
            <View accessibilityViewIsModal style={styles.drawer}>
              <SafeAreaView edges={['top']} style={styles.drawerBrandSafeArea}>
                <View style={styles.drawerBrand}>
                  <Image resizeMode="contain" source={tenantBrand.logo} style={styles.drawerLogo} />
                  <Text style={styles.drawerBrandName}>{tenantBrand.name}</Text>
                </View>
              </SafeAreaView>
              <View style={styles.drawerBody}>
                <View style={styles.drawerLinks}>
                  {mainNavigation.map((item) => (
                    <Pressable
                      key={item.href}
                      accessibilityRole="button"
                      accessibilityState={{ selected: item.href === activeRoute }}
                      onPress={() => navigateTo(item.href)}
                      style={[
                        styles.drawerItem,
                        item.href === activeRoute && styles.drawerItemSelected,
                      ]}>
                      <Text style={styles.drawerIcon}>{item.icon}</Text>
                      <Text style={styles.drawerLabel}>{item.label}</Text>
                    </Pressable>
                  ))}
                </View>
                <Pressable accessibilityRole="button" onPress={logout} style={styles.logoutItem}>
                  <Text style={styles.drawerIcon}>🚪</Text>
                  <Text style={styles.drawerLabel}>Logout</Text>
                </Pressable>
              </View>
              <SafeAreaView edges={['bottom']} style={styles.drawerBottomSafeArea} />
            </View>
            <Pressable
              accessibilityLabel="Close navigation menu"
              accessibilityRole="button"
              onPress={() => setMenuOpen(false)}
              style={styles.menuBackdrop}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppTheme.colors.pageSurround,
  },
  page: {
    flex: 1,
    width: '100%',
    maxWidth: AppTheme.layout.maxPhoneWidth,
    backgroundColor: AppTheme.colors.surface,
  },
  headerSafeArea: {
    backgroundColor: tenantBrand.colors.primary,
  },
  header: {
    height: AppTheme.layout.appHeaderHeight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAction: {
    width: 66,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    width: 19,
    gap: 4,
  },
  menuIconLine: {
    width: 19,
    height: 2,
    backgroundColor: tenantBrand.colors.onPrimary,
  },
  headerTitle: {
    flex: 1,
    color: tenantBrand.colors.onPrimary,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  bellIcon: {
    fontSize: 25,
  },
  content: {
    flex: 1,
    backgroundColor: AppTheme.colors.surface,
  },
  bottomSafeArea: {
    backgroundColor: tenantBrand.colors.primary,
  },
  bottomBar: {
    height: AppTheme.layout.bottomNavHeight,
    flexDirection: 'row',
  },
  bottomItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomIcon: {
    color: tenantBrand.colors.onPrimary,
    fontSize: 16,
    lineHeight: 20,
  },
  bottomLabel: {
    color: tenantBrand.colors.onPrimary,
    fontSize: 13,
    lineHeight: 16,
  },
  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    elevation: 10,
    flexDirection: 'row',
    backgroundColor: AppTheme.colors.menuOverlay,
  },
  drawer: {
    width: '80%',
    maxWidth: AppTheme.layout.drawerWidth,
    backgroundColor: AppTheme.colors.surface,
  },
  drawerBrandSafeArea: {
    backgroundColor: tenantBrand.colors.primary,
  },
  drawerBrand: {
    minHeight: 130,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  drawerLogo: {
    width: 58,
    height: 58,
  },
  drawerBrandName: {
    marginTop: 9,
    color: tenantBrand.colors.onPrimary,
    fontSize: 19,
    fontWeight: '700',
  },
  drawerBody: {
    flex: 1,
    justifyContent: 'space-between',
  },
  drawerLinks: {
    paddingTop: 16,
    paddingHorizontal: 10,
  },
  drawerItem: {
    minHeight: 52,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
  },
  drawerItemSelected: {
    backgroundColor: AppTheme.colors.selectedMenuItem,
  },
  drawerIcon: {
    width: 34,
    fontSize: 21,
  },
  drawerLabel: {
    color: AppTheme.colors.text,
    fontSize: 16,
  },
  logoutItem: {
    minHeight: 58,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: AppTheme.colors.cardBorder,
  },
  drawerBottomSafeArea: {
    backgroundColor: AppTheme.colors.surface,
  },
  menuBackdrop: {
    flex: 1,
  },
});
