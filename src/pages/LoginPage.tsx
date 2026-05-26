import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { getApiErrorMessage, login } from '../services/api';
import { useAuthStore } from '../store/authStore';

const loginSchema = z.object({
  email: z.string().email('Informe um e-mail válido'),
  password: z.string().min(8, 'Senha com no mínimo 8 caracteres'),
});
type LoginForm = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  async function handleLogin(data: LoginForm) {
    console.log(data);

    try {
      const result = await login(data);
      setSession(result.user, result.token);
      toast.success('Login realizado com sucesso');
      navigate('/dashboard');
    } catch (apiError) {
      toast.error(getApiErrorMessage(apiError));
    }
  }

  return (
    <section className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-10 px-4 py-12 md:grid-cols-2">
      <div>
        <h1 className="text-5xl font-black text-ink">Acesse seu painel PointNear.</h1>
        <p className="mt-4 text-lg text-slate-600">
          Gerencie informações, acompanhe estatísticas e mantenha seu estabelecimento sempre atualizado.
        </p>
      </div>
      <form onSubmit={handleSubmit(handleLogin)} className="rounded-[2rem] bg-white p-8 shadow-soft">
        <h2 className="text-2xl font-bold text-ink">Entrar</h2>
        <div className="mt-6 space-y-4">
          <Input label="E-mail" type="email" error={errors.email?.message} {...register('email')} />
          <Input label="Senha" type="password" error={errors.password?.message} {...register('password')} />
          {isSubmitting && <p className="text-sm text-slate-500">Validando...</p>}
          <Button className="w-full" disabled={isSubmitting}>
            Entrar
          </Button>
        </div>
        <p className="mt-5 text-center text-sm text-slate-600">
          Ainda não tem conta?{' '}
          <Link className="font-bold text-brand-600" to="/cadastro">
            Cadastre-se
          </Link>
        </p>
      </form>
    </section>
  );
}
