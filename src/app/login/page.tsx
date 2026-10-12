"use client";
import { useState } from "react";
import Image from "next/image";
import image from "@/assets/images/sign.jpg";
import { Input } from "@/components/ui/input";
import { CustomButton } from "@/components/button/custom-button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    let emailError = "";
    let passwordError = "";

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      emailError = "E-mail é obrigatório.";
      valid = false;
    } else if (!emailRegex.test(email)) {
      emailError = "E-mail inválido.";
      valid = false;
    }

    // Validação de senha
    if (!password) {
      passwordError = "Senha é obrigatória.";
      valid = false;
    } else if (password.length < 6) {
      passwordError = "A senha deve ter pelo menos 6 caracteres.";
      valid = false;
    }

    setErrors({ email: emailError, password: passwordError });
    return valid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrors({ ...errors, email: error.message });
        } else {
          console.log("Usuário logado:", data);
        }
      } catch (err) {
        console.error("Erro ao tentar fazer login:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLoginGoogle = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/instrucoes`,
        },
      });

      if (error) {
        console.error("Erro ao logar:", error.message);
      } else {
        console.log("Usuário logado com Google:", data);
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col pt-16 md:flex-row">
      {isLoading ? (
        <div className="flex w-full flex-col items-center justify-center gap-3 text-center text-lg font-semibold text-ink">
          Enviando... Aguarde.
        </div>
      ) : (
        <>
          <section className="relative hidden w-1/2 md:flex">
            <Image
              src={image}
              alt=""
              fill
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-ink/75"></div>
            <p className="relative z-10 mt-auto max-w-[14ch] p-12 font-display text-5xl font-extrabold leading-[1.05] text-white lg:p-16">
              Seu próximo degrau começa aqui.
            </p>
          </section>
          <section className="flex w-full flex-col items-center justify-center px-4 py-12 sm:px-8 md:w-1/2 md:px-12 lg:px-16">
            <form
              className="flex w-full max-w-md flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              noValidate
            >
              <div>
                <h1 className="text-3xl font-bold sm:text-4xl">Entrar</h1>
                <p className="mt-2 text-ink-soft">
                  Acesse sua conta para fazer o teste de liderança.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-ink">
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  required
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="text-sm text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-semibold text-ink">
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  required
                />
                {errors.password && (
                  <p id="password-error" role="alert" className="text-sm text-destructive">
                    {errors.password}
                  </p>
                )}
                <div className="text-right">
                  <span className="cursor-pointer text-sm text-ink-soft underline underline-offset-2 hover:text-primary">
                    Esqueceu a senha?
                  </span>
                </div>
              </div>

              <CustomButton type="submit" className="w-full py-3">
                Entrar
              </CustomButton>

              <div className="flex items-center gap-4 text-sm text-ink-muted">
                <Separator className="flex-1 bg-line" />
                ou acesse com
                <Separator className="flex-1 bg-line" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <CustomButton
                  variant="outline"
                  className="w-full"
                  onClick={handleLoginGoogle}
                >
                  <FcGoogle className="text-lg" aria-hidden /> Google
                </CustomButton>
              </div>

              <p className="text-center text-ink-soft">
                Novo no PRO Lidera Skills?{" "}
                <Link
                  href="/cadastro"
                  className="font-semibold text-primary underline underline-offset-2 hover:text-primary-hover"
                >
                  Cadastre-se
                </Link>
              </p>
            </form>
          </section>
        </>
      )}
    </div>
  );
}
