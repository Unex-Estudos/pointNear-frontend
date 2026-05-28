import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Profile() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen bg-cream dark:bg-dark-bg flex items-center justify-center text-charcoal-light dark:text-dark-muted">Carregando perfil...</div>;
  }

  if (!user) {
    return <div className="min-h-screen bg-cream dark:bg-dark-bg flex items-center justify-center"><Link to="/login" className="text-terracotta font-medium">Entrar para ver perfil</Link></div>;
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-dark-surface rounded-3xl shadow-soft border border-moss/5 dark:border-dark-border p-8">
        <h1 className="text-3xl font-serif font-bold text-moss-900 dark:text-dark-text mb-2">Meu perfil</h1>
        <p className="text-charcoal-light dark:text-dark-muted mb-8">Gerencie seus dados de acesso.</p>
        <div className="space-y-4">
          <div><span className="text-sm text-moss-500 dark:text-dark-muted">Nome</span><p className="font-medium text-moss-900 dark:text-dark-text">{user.name}</p></div>
          <div><span className="text-sm text-moss-500 dark:text-dark-muted">E-mail</span><p className="font-medium text-moss-900 dark:text-dark-text">{user.email}</p></div>
          <div><span className="text-sm text-moss-500 dark:text-dark-muted">Permissão</span><p className="font-medium text-moss-900 dark:text-dark-text">{user.role}</p></div>
        </div>
      </div>
    </div>
  );
}
