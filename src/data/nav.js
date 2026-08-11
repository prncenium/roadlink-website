/**
 * Primary navigation + the small utility links in the top header bar.
 */
export const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Sectors', to: '/sectors' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact Us', to: '/contact' },
];

/** Utility links rendered on the right of the dark header strip. */
export const utilityLinks = [
  { label: 'Tenders', href: '#tenders' },
  { label: 'RTI', href: '#rti' },
  { label: 'Circulars', href: '#circulars' },
];

/** Staff / contractor sign-in entry point (top-right of header). */
export const portalLogin = {
  label: 'Client Login',
  href: '#login',
};

export default navItems;
