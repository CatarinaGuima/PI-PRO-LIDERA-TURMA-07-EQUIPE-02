"use client";
import { CustomButton } from "@/components/button/custom-button";
import { Ladder } from "@/components/ladder";
import image from "@/assets/images/main-image.png";
import Image from "next/image";
import data from "@/lib/data.json";
import { useSession } from "../../../contexts/user-context";

const steps = [
  {
    title: "Crie sua conta",
    text: "Cadastre-se com e-mail e senha ou entre com sua conta Google.",
  },
  {
    title: "Responda 18 perguntas",
    text: "São seis temas, com três perguntas cada. Se você sair, o teste continua de onde parou.",
  },
  {
    title: "Veja seu nível e baixe o certificado",
    text: "Você recebe uma análise do seu desempenho e um certificado em PDF.",
  },
];

export default function HomePage() {
  const { user } = useSession();

  return (
    <main>
      <section className="mx-auto grid max-w-[1240px] items-end gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:pb-24 lg:pt-32">
        <div className="flex flex-col items-start gap-6 lg:pb-6">
          <h1 className="max-w-[16ch] text-[2.25rem] font-extrabold leading-[1.04] sm:text-6xl lg:text-7xl">
            Descubra em que degrau da liderança você está
          </h1>
          <p className="max-w-[46ch] text-lg leading-relaxed text-ink-soft sm:text-xl">
            Responda 18 perguntas sobre comunicação, decisão e inteligência
            emocional e receba seu nível de liderança, com uma análise do seu
            desempenho.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            {user ? (
              <CustomButton href="/instrucoes" className="px-7 py-3 text-base">
                Fazer o teste
              </CustomButton>
            ) : (
              <>
                <CustomButton href="/cadastro" className="px-7 py-3 text-base">
                  Criar conta
                </CustomButton>
                <CustomButton
                  href="/login"
                  variant="outline"
                  className="px-7 py-3 text-base"
                >
                  Entrar
                </CustomButton>
              </>
            )}
          </div>
        </div>

        <Ladder animated />
      </section>

      <section
        aria-labelledby="como-funciona"
        className="border-y border-line bg-white"
      >
        <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-20">
          <h2 id="como-funciona" className="max-w-[22ch] text-3xl font-bold sm:text-4xl">
            Do cadastro ao certificado em três passos
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {steps.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-3 border-t-2 border-ink pt-5">
                <span className="font-display text-4xl font-extrabold text-primary">
                  {index + 1}
                </span>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="max-w-[38ch] text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="o-que-avalia"
        className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <h2 id="o-que-avalia" className="max-w-[16ch] text-3xl font-bold sm:text-4xl">
              O que o teste avalia
            </h2>
            <p className="mt-4 max-w-[40ch] text-ink-soft">
              Cada tema reúne três situações do dia a dia de quem lidera. Você
              escolhe a atitude que mais combina com a sua.
            </p>
          </div>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {data.map((item) => (
              <li
                key={item.theme}
                className="flex items-baseline justify-between gap-4 border-b border-line py-4"
              >
                <span className="font-display text-lg font-semibold">{item.theme}</span>
                <span className="shrink-0 text-sm text-ink-muted">
                  {item.questions.length} perguntas
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="about-us"
        aria-labelledby="quem-somos"
        className="mx-auto max-w-[1240px] px-4 pb-20 sm:px-6 lg:pb-28"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={image}
              alt="Mãos de uma equipe reunidas no centro de uma mesa de trabalho"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 id="quem-somos" className="max-w-[18ch] text-3xl font-bold sm:text-4xl">
              Quem somos
            </h2>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
              A PRO Lidera Skills é uma aplicação que avalia suas capacidades
              de liderança. Nossa missão é ajudar você a compreender suas
              habilidades para alcançar todo o seu potencial. Com uma abordagem
              personalizada, buscamos promover o desenvolvimento contínuo.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
