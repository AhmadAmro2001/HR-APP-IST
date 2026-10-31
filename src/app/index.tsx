import { Redirect } from 'expo-router';

export default function IndexRoute() {
  // Step 1: Open the explicit login route when the app starts.
  // A future real session check can choose between login and home here.
  return <Redirect href="/login" />;
}
