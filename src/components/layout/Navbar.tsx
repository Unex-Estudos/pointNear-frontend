import { LogOut, Menu, MapPin, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../common/Button';

const publicLinks = [{ to: '/', label: 'Início' }, { to: '/buscar', label: 'Buscar' }];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const links = user ? [...publicLinks, { to: '/dashboard', label: 'Dashboard' }] : publicLinks;

  return <header className="sticky top-0 z-40 border-b border-white/70 bg-white/85 backdrop-blur"><nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4"><Link to="/" className="flex items-center gap-2 text-xl font-black text-ink"><span className="rounded-2xl bg-brand-600 p-2 text-white"><MapPin size={20}/></span>PointNear</Link><div className="hidden items-center gap-8 md:flex">{links.map((link) => <NavLink key={link.to} to={link.to} className={({ isActive }) => `text-sm font-semibold ${isActive ? 'text-brand-600' : 'text-slate-600 hover:text-ink'}`}>{link.label}</NavLink>)}{user ? <Button variant="secondary" onClick={logout}><LogOut className="mr-2" size={16}/>Sair</Button> : <Link to="/login"><Button>Entrar</Button></Link>}</div><button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X/> : <Menu/>}</button></nav>{isOpen && <div className="space-y-3 border-t bg-white px-4 py-4 md:hidden">{links.map((link) => <NavLink key={link.to} to={link.to} onClick={() => setIsOpen(false)} className="block rounded-2xl px-4 py-3 font-semibold text-slate-700 hover:bg-brand-50">{link.label}</NavLink>)}{user ? <Button variant="secondary" className="w-full" onClick={() => { logout(); setIsOpen(false); }}><LogOut className="mr-2" size={16}/>Sair</Button> : <Link to="/login" onClick={() => setIsOpen(false)}><Button className="w-full">Entrar</Button></Link>}</div>}</header>;
}
