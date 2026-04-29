import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from './providers/AuthProvider';
import Layout from './layout/Layout';
import { Login, Signup } from '../features/auth';
import DevIndex from '../features/dev-index';
import DiscoverPage from '../features/discover';
import FriendsPage from '../features/friends';
import HomePage from '../features/home';
import { Genres, LinkAccounts, ScanFiles, Welcome } from '../features/onboarding';
import PointsShopPage from '../features/points-shop';
import QuestsPage from '../features/quests';

const APP_ROUTES = [
  { path: '/home', element: <HomePage /> },
  { path: '/discover', element: <DiscoverPage /> },
  { path: '/quests', element: <QuestsPage /> },
  { path: '/friends', element: <FriendsPage /> },
  { path: '/points-shop', element: <PointsShopPage /> },
];

const AUTH_ROUTES = [
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
];

const ONBOARDING_ROUTES = [
  { path: '/onboarding/welcome', element: <Welcome /> },
  { path: '/onboarding/link', element: <LinkAccounts /> },
  { path: '/onboarding/scan', element: <ScanFiles /> },
  { path: '/onboarding/genres', element: <Genres /> },
];

function renderRoutes(routes) {
  return routes.map(({ path, element }) => <Route key={path} path={path} element={element} />);
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-[#0a0a14] text-zinc-400">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PublicOnlyRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-[#0a0a14] text-zinc-400">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/home" replace /> : children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DevIndex />} />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {renderRoutes(APP_ROUTES)}
      </Route>
      {AUTH_ROUTES.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<PublicOnlyRoute>{element}</PublicOnlyRoute>}
        />
      ))}
      {ONBOARDING_ROUTES.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<ProtectedRoute>{element}</ProtectedRoute>}
        />
      ))}
    </Routes>
  );
}
