import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './app/routes';
import TitleBar from './app/layout/TitleBar';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen flex-col overflow-hidden" style={{ backgroundColor: '#0f0f1a' }}>
        <TitleBar />
        <div className="flex-1 overflow-hidden">
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
