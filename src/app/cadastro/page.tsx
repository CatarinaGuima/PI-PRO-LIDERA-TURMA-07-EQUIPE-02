'use client';
import { useState } from 'react';
import { CustomButton } from '@/components/button/custom-button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { FcGoogle } from 'react-icons/fc';
import { FormEvent } from 'react';
import Image from 'next/image';
import image from '@/assets/images/sign.jpg';

export default function Cadastro() {
  // Adiciona o estado para capturar os valores dos campos
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validação simples de senha
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        // Redirecionar ou limpar campos conforme necessário
      } else {
        setError(data.message || 'Erro ao cadastrar usuário.');
      }
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error);
      setError('Erro ao se conectar com o servidor.');
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

          <div className="grid gap-3 sm:grid-cols-2">
            <CustomButton variant="outline" className="w-full" onClick={() => {}}>
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

          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <Checkbox id="aceita-ofertas" className="mt-0.5" />
              <label htmlFor="aceita-ofertas" className="cursor-pointer text-sm leading-snug text-ink-soft">
                Quero receber ofertas e novidades por e-mail, SMS, WhatsApp ou
                mensagens.*
              </label>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox id="aceita-politicas" className="mt-0.5" />
              <label htmlFor="aceita-politicas" className="cursor-pointer text-sm leading-snug text-ink-soft">
                Li e estou de acordo com as políticas da empresa e a política
                de privacidade.*
              </label>
            </div>
            <span className="text-sm text-ink-muted">(*) Campos obrigatórios</span>
          </div>

          <CustomButton href="/login" className="w-full py-3">
            Cadastrar
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
