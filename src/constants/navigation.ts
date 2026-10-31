// Step 1: Keep the four main destinations in one list for the bottom bar and menu.
export const mainNavigation = [
  { label: 'Home', icon: '🏠', href: '/home' },
  { label: 'Requests', icon: '📋', href: '/requests' },
  { label: 'Approvals', icon: '✅', href: '/approvals' },
  { label: 'Profile', icon: '👤', href: '/profile' },
] as const;

export type MainRoute = (typeof mainNavigation)[number]['href'];
