'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CustomButton } from '@/components/button/custom-button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { FcGoogle } from 'react-icons/fc';
import { FormEvent } from 'react';
import Image from 'next/image';
import image from '@/assets/images/sign.jpg';
import { supabase } from "@/lib/supabaseClient";

const MIN_PASSWORD_LENGTH = 6;

function traduzErro(message: string) {
  const m = message.toLowerCase();
  if (m.includes("already registered")) return "Este e-mail já está cadastrado. Tente entrar na sua conta.";
  if (m.includes("password")) return `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  if (m.includes("rate limit")) return "Muitas tentativas. Aguarde um pouco e tente novamente.";
  if (m.includes("invalid") && m.includes("email")) return "E-mail inválido.";
  return message;
}

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (senha.length < MIN_PASSWORD_LENGTH) {
      setError(`A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`);
      return;
    }

    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: senha,
        options: {
          data: {
            name: nome.trim(),
            full_name: nome.trim(),
          },
        },
      });

      if (error) {
        setError(traduzErro(error.message));
        return;
      }

      // Se o Supabase ainda exigir confirmação de e-mail, não vem sessão.
      if (!data.session) {
        setError(
          "Cadastro criado, mas é preciso confirmar o e-mail antes de entrar. Verifique sua caixa de entrada."
        );
        return;
      }

      // Usuário criado e salvo no Supabase. Encerra a sessão automática
      // e leva para o login.
      await supabase.auth.signOut();
      router.push("/login");
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
      setError("Não foi possível realizar o cadastro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCadastroGoogle = async () => {
    setError("");
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/instrucoes`,
        },
      });

      if (error) {
        setError(error.message);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Erro ao cadastrar com Google:", err);
      setError("Não foi possível continuar com o Google. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen pt-16">
      <section className="flex w-full flex-col items-center justify-center px-4 py-12 sm:px-8 md:w-1/2 md:px-12 lg:px-16">
        <form onSubmit={handleSubmit} className="flex w-full max-w-lg flex-col gap-5">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">Criar conta</h1>
            <p className="mt-2 text-ink-soft">
              Cadastre-se para fazer o teste de liderança e baixar seu certificado.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <CustomButton
              variant="outline"
              className="w-full"
              onClick={handleCadastroGoogle}
              disabled={isLoading}
            >
              <FcGoogle className="text-lg" aria-hidden />
              Google
            </CustomButton>
          </div>

          <div className="flex items-center gap-4 text-sm text-ink-muted">
            <Separator className="flex-1 bg-line" />
            ou cadastre com e-mail
            <Separator className="flex-1 bg-line" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label htmlFor="nome" className="text-sm font-semibold text-ink">
                Nome completo*
              </label>
              <Input
                id="nome"
                type="text"
                autoComplete="name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label htmlFor="email" className="text-sm font-semibold text-ink">
                E-mail*
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="voce@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="senha" className="text-sm font-semibold text-ink">
                Crie sua senha*
              </label>
              <Input
                id="senha"
                type="password"
                autoComplete="new-password"
                minLength={MIN_PASSWORD_LENGTH}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirmar-senha" className="text-sm font-semibold text-ink">
                Confirme sua senha*
              </label>
              <Input
                id="confirmar-senha"
                type="password"
                autoComplete="new-password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                aria-invalid={!!error}
                aria-describedby={error ? "cadastro-error" : undefined}
                required
              />
            </div>
            {error && (
              <p
                id="cadastro-error"
                role="alert"
                className="text-sm text-destructive md:col-span-2"
              >
                {error}
              </p>
            )}
          </div>

          <CustomButton type="submit" className="w-full py-3" disabled={isLoading}>
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </CustomButton>

          <p className="text-center text-ink-soft">
            Já possui cadastro?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary underline underline-offset-2 hover:text-primary-hover"
            >
              Entrar
            </Link>
          </p>
        </form>
      </section>
      <section className="relative hidden w-1/2 md:flex">
        <Image src={image} alt="" fill sizes="50vw" className="object-cover" />
        <div className="absolute inset-0 bg-ink/75"></div>
        <p className="relative z-10 mt-auto max-w-[14ch] p-12 font-display text-5xl font-extrabold leading-[1.05] text-white lg:p-16">
          Descubra que tipo de líder você é.
        </p>
      </section>
    </div>
  );
}