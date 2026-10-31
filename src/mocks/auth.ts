// Step 1: Keep development-only credentials outside the login screen.
// Replace this fixture when the documented authentication API is ready.
const demoCredentials = {
  username: 'test',
  password: '1234',
} as const;

// Step 2: Compare the entered values for this local UI demonstration only.
export function matchesDemoCredentials(username: string, password: string): boolean {
  return username.trim() === demoCredentials.username && password === demoCredentials.password;
}
