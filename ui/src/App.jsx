import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Library from './pages/Library.jsx';
import Settings from './pages/Settings.jsx';
import Quests from './pages/Quests.jsx';
import Landing from './pages/Landing.jsx';
import Welcome from './pages/Welcome.jsx';
import Genres from './pages/Genres.jsx';
import AccountLink from './pages/AccountLink.jsx';
import Login from './pages/auth/Login.jsx';
import Signup from './pages/auth/Signup.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/account-link" element={<AccountLink />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/quests" element={<Quests />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="users">
            <Route path=":id" element={null} />
            <Route path=":id/library" element={<Library />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
