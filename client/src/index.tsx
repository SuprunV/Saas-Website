import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import AppNavbar from './components/AppNavbar';
import AppRouter from './components/AppRouter';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <AppNavbar />
    <AppRouter />
  </BrowserRouter>
);
