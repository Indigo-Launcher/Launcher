import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Library from './pages/Library.jsx';
import Settings from './pages/Settings.jsx';
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        // Layout component wraps all routes // Layout component wraps all routes
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route element={<Layout />}>
          {' '}
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
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
