import { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { FormField } from '@/components/form-field';
import { FormMessage } from '@/components/form-message';
import { PrimaryButton } from '@/components/primary-button';
import { tenantBrand } from '@/config/tenant';
import { AppTheme } from '@/constants/theme';
import { matchesDemoCredentials } from '@/mocks/auth';

type LoginFeedback = {
  kind: 'error' | 'info';
  message: string;
};

export default function LoginScreen() {
  // Step 1: Keep form input in local state until the authentication API is defined.
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [feedback, setFeedback] = useState<LoginFeedback | null>(null);
  const passwordInput = useRef<TextInput>(null);

  // Step 2: Show a reusable form error for missing or incorrect credentials.
  const handleLogin = () => {
    if (!username.trim() || !password) {
      setFeedback({ kind: 'error', message: 'Enter your username and password.' });
      return;
    }

    if (!matchesDemoCredentials(username, password)) {
      setFeedback({ kind: 'error', message: 'Incorrect username or password. Please try again.' });
      return;
    }

    // Step 3: A valid demo login opens the temporary home route.
    setFeedback(null);
    router.replace('/home');
  };

  const handleForgotPassword = () => {
    setFeedback({ kind: 'info', message: 'Password recovery is not available yet.' });
  };

  // Step 4: Remove an old error as soon as the user edits either field.
  const updateUsername = (value: string) => {
    setUsername(value);
    setFeedback(null);
  };

  const updatePassword = (value: string) => {
    setPassword(value);
    setFeedback(null);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}>
      <StatusBar style="light" backgroundColor={tenantBrand.colors.primary} />
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.page}>
          {/* Step 5: Show the client logo and app name in the teal header. */}
          <View style={styles.header}>
            <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
              <Image
                accessibilityLabel={`${tenantBrand.name} logo`}
                resizeMode="contain"
                source={tenantBrand.logo}
                style={styles.logo}
              />
              <Text style={styles.brandTitle}>{tenantBrand.name}</Text>
              <Text style={styles.brandSubtitle}>{tenantBrand.subtitle}</Text>
            </SafeAreaView>
          </View>

          <View style={styles.body}>
            {/* Step 6: Build the rounded login card from reusable form controls. */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Login</Text>

              <FormField
                accessibilityLabel="Username"
                autoCapitalize="none"
                autoComplete="username"
                onChangeText={updateUsername}
                onSubmitEditing={() => passwordInput.current?.focus()}
                placeholder="Username"
                returnKeyType="next"
                style={styles.usernameField}
                value={username}
              />

              <FormField
                accessibilityLabel="Password"
                autoComplete="password"
                onChangeText={updatePassword}
                onSubmitEditing={handleLogin}
                placeholder="Password"
                ref={passwordInput}
                returnKeyType="done"
                secureTextEntry
                style={styles.passwordField}
                value={password}
              />

              {/* Step 7: Pair password recovery with the local Remember me selection. */}
              <View style={styles.actionsRow}>
                <Pressable
                  accessibilityRole="button"
                  onPress={handleForgotPassword}
                  style={styles.forgotPasswordHitArea}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </Pressable>
                <Pressable
                  accessibilityLabel="Remember me"
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: rememberMe }}
                  hitSlop={10}
                  onPress={() => setRememberMe((current) => !current)}
                  style={styles.rememberMeControl}>
                  <Text style={styles.rememberMeText}>Remember me</Text>
                  <View style={styles.rememberMeCircle}>
                    <View
                      style={[styles.rememberMeInner, rememberMe && styles.rememberMeInnerSelected]}
                    />
                  </View>
                </Pressable>
              </View>

              <PrimaryButton label="Login" onPress={handleLogin} />
              {feedback && <FormMessage kind={feedback.kind} message={feedback.message} />}
            </View>

            {/* Step 8: Anchor the small brand credit near the bottom of the screen. */}
            <SafeAreaView edges={['bottom']} style={styles.footerSafeArea}>
              <Text style={styles.footerText}>{tenantBrand.footer}</Text>
            </SafeAreaView>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppTheme.colors.pageSurround,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  page: {
    flexGrow: 1,
    width: '100%',
    maxWidth: AppTheme.layout.maxPhoneWidth,
    backgroundColor: AppTheme.colors.surface,
  },
  header: {
    height: AppTheme.layout.loginHeaderHeight,
    backgroundColor: tenantBrand.colors.primary,
  },
  headerSafeArea: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'web' ? 21 : 8,
  },
  logo: {
    width: 80,
    height: 80,
  },
  brandTitle: {
    marginTop: 9,
    color: tenantBrand.colors.onPrimary,
    fontSize: 29,
    fontWeight: '700',
    lineHeight: 35,
    textAlign: 'center',
  },
  brandSubtitle: {
    color: tenantBrand.colors.onPrimary,
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
  },
  body: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    width: '88%',
    maxWidth: 340,
    marginTop: 44,
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 27,
    borderWidth: 1,
    borderColor: AppTheme.colors.cardBorder,
    borderRadius: AppTheme.radii.loginCard,
    backgroundColor: AppTheme.colors.surface,
  },
  cardTitle: {
    marginBottom: 27,
    color: AppTheme.colors.text,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    textAlign: 'center',
  },
  usernameField: {
    marginBottom: 22,
  },
  passwordField: {
    marginBottom: 26,
  },
  actionsRow: {
    minHeight: 22,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forgotPasswordHitArea: {
    minHeight: 22,
    justifyContent: 'center',
  },
  forgotPasswordText: {
    color: tenantBrand.colors.primary,
    fontSize: 14,
  },
  rememberMeControl: {
    minHeight: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rememberMeText: {
    color: AppTheme.colors.text,
    fontSize: 14,
  },
  rememberMeCircle: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: AppTheme.colors.muted,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rememberMeInner: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: AppTheme.colors.muted,
    borderRadius: 6,
  },
  rememberMeInnerSelected: {
    borderColor: tenantBrand.colors.primary,
    backgroundColor: tenantBrand.colors.primary,
  },
  footerSafeArea: {
    marginTop: 40,
    paddingBottom: 15,
    alignItems: 'center',
  },
  footerText: {
    color: AppTheme.colors.muted,
    fontSize: 14,
  },
});
