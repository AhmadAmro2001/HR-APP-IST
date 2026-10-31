import { Stack } from 'expo-router';

export default function RootLayout() {
  // Each route draws its own header and shared app navigation inside this stack.
  return <Stack screenOptions={{ headerShown: false }} />;
}
