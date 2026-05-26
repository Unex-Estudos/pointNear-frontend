import { Navigate, Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { EstablishmentDetailsPage } from './pages/EstablishmentDetailsPage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { SearchPage } from './pages/SearchPage';
import { useAuthStore } from './store/authStore';

function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
  { path: '/', element: <AppLayout />, children: [
    { index: true, element: <LandingPage /> },
    { path: 'buscar', element: <SearchPage /> },
    { path: 'estabelecimentos/:id', element: <EstablishmentDetailsPage /> },
    { path: 'login', element: <LoginPage /> },
    { path: 'cadastro', element: <RegisterPage /> },
    { element: <ProtectedRoute />, children: [
      { path: 'dashboard', element: <DashboardPage /> },
    ] },
  ] },
]);

export function App() { return <RouterProvider router={router} />; }
