import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Store, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../utils/ThemeToggle";
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const navLinks = [
    {
      name: "Início",
      path: "/",
    },
    {
      name: "Buscar",
      path: "/buscar",
    },
  ];

  if (isAuthenticated && user?.role === "MERCHANT") {
    navLinks.push({
      name: "Cadastrar meu negócio",
      path: "/cadastrar",
    });
  }

  const isActive = (path: string) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };
  return (
    <header className="sticky top-0 z-50 w-full bg-cream/90 dark:bg-dark-bg/95 backdrop-blur-md border-b border-moss/10 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-terracotta text-white p-1.5 rounded-lg group-hover:bg-terracotta-600 transition-colors">
              <Store size={24} />
            </div>
            <span className="font-serif text-xl font-bold text-moss-800">
              Point<span className="text-terracotta">Near</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-terracotta ${isActive(link.path) ? "text-terracotta" : "text-charcoal-light dark:text-dark-text"}`}>
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <Link
                  to={user?.role === "ADMIN" ? "/admin" : "/dashboard"}
                  className="text-sm font-medium text-charcoal-light hover:text-moss transition-colors dark:text-dark-text dark:hover:text-moss">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-charcoal-light hover:text-moss transition-colors dark:text-dark-text dark:hover:text-moss">
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-charcoal-light hover:text-moss transition-colors dark:text-dark-text dark:hover:text-moss">
                Entrar
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-charcoal-light hover:text-moss dark:text-dark-text dark:hover:text-moss"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-cream border-b border-moss/10 absolute w-full dark:bg-dark-bg dark:border-dark-border">
          <div className="px-4 pt-2 pb-6 space-y-1 shadow-soft">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-3 rounded-md text-base font-medium ${isActive(link.path) ? "bg-terracotta/10 text-terracotta" : "text-charcoal-light dark:text-dark-text hover:bg-moss/5 hover:text-moss dark:hover:bg-dark-surface dark:hover:text-moss"}`}
                onClick={() => setIsMobileMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-moss/10 dark:border-dark-border">
              <div className="px-3 py-3">
                <ThemeToggle />
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-moss/10 dark:border-dark-border">
              {isAuthenticated ? (
                <>
                  <Link
                    to={user?.role === "ADMIN" ? "/admin" : "/dashboard"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-3 text-base font-medium text-charcoal-light hover:text-moss dark:text-dark-text dark:hover:text-moss">
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-3 text-base font-medium text-charcoal-light hover:text-moss dark:text-dark-text dark:hover:text-moss">
                    Sair
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-charcoal-light hover:text-moss">
                  Entrar
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
