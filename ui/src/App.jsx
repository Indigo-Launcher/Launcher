import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';

import Index from './pages/Index';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Quests from './pages/Quests';
import Friends from './pages/Friends';
import PointsShop from './pages/PointsShop';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

import Welcome from './pages/onboarding/Welcome';
import LinkAccounts from './pages/onboarding/LinkAccounts';
import ScanFiles from './pages/onboarding/ScanFiles';
import Genres from './pages/onboarding/Genres';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dev index — no layout */}
        <Route path="/" element={<Index />} />

        {/* Pages WITH sidebar/layout (logged in) */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/quests" element={<Quests />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/points-shop" element={<PointsShop />} />
        </Route>

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Onboarding — 4 step flow */}
        <Route path="/onboarding/welcome" element={<Welcome />} />
        <Route path="/onboarding/link" element={<LinkAccounts />} />
        <Route path="/onboarding/scan" element={<ScanFiles />} />
        <Route path="/onboarding/genres" element={<Genres />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
