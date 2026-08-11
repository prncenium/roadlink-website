import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Projects from '@/pages/Projects';
import Sectors from '@/pages/Sectors';
import Contact from '@/pages/Contact';
import NotFound, { RouteErrorBoundary } from '@/pages/NotFound';

/**
 * Route table. Every route renders inside <RootLayout/>, which supplies
 * Header + Navbar + <Outlet/> + Footer.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'sectors', element: <Sectors /> },
      { path: 'projects', element: <Projects /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
