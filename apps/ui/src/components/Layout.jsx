import { Outlet } from 'react-router-dom';
import TitleBar from './TitleBar';
import Sidebar from './Sidebar';

function Layout() {
  return (
    <div className="h-screen flex flex-col bg-[#0f0f1a] text-white overflow-hidden">
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
          {' '}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
