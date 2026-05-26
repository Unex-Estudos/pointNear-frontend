import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { getApiErrorMessage, registerUser } from '../services/api';
import { useAuthStore } from '../store/authStore';

const registerSchema = z.object({ fullName: z.string().min(3, 'Informe seu nome completo'), email: z.string().email('Informe um e-mail válido'), password: z.string().min(8, 'Senha com no mínimo 8 caracteres') });
type RegisterForm = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  async function handleRegister(data: RegisterForm) {
    try {
      const result = await registerUser(data);
      setSession(result.user, result.token);
      toast.success('Cadastro criado. Complete seu perfil no dashboard.');
      navigate('/dashboard');
    } catch (apiError) {
      toast.error(getApiErrorMessage(apiError));
    }
  }

  return <section className="mx-auto max-w-3xl px-4 py-12"><form onSubmit={handleSubmit(handleRegister)} className="rounded-[2rem] bg-white p-8 shadow-soft"><p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Para parceiros</p><h1 className="mt-3 text-4xl font-black text-ink">Cadastre seu estabelecimento</h1><p className="mt-3 text-slate-600">Crie sua conta para gerenciar sua presença local com página completa, contato direto e informações organizadas.</p><div className="mt-8 grid gap-4 md:grid-cols-2"><Input label="Nome completo" error={errors.fullName?.message} {...register('fullName')}/><Input label="E-mail" type="email" error={errors.email?.message} {...register('email')}/><Input label="Senha" type="password" error={errors.password?.message} {...register('password')}/></div><Button className="mt-6 w-full" disabled={isSubmitting}>Criar cadastro</Button></form></section>;
}
