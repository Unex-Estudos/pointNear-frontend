import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export function AppLayout() {
  return <div className="min-h-screen bg-[#fffaf5]"><Navbar/><main><Outlet/></main><Footer/><Toaster position="top-right"/></div>;
}
