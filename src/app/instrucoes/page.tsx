"use client";
import { Check } from "lucide-react";
import Image from "next/image";
import illustration from "@/assets/images/rb_76463.png";
import { CustomButton } from "@/components/button/custom-button";
import { Title } from "@/components/title";
import { Vortex } from "react-loader-spinner";
import { useState } from "react";
import { useSession } from "../../../contexts/user-context";


export default function Instrucoes() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSession();

  const handleStartTest = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
  };
  

  return (
    <main className="mx-auto flex min-h-screen max-w-[1100px] items-center px-4 pb-16 pt-28 sm:px-6">
      {isLoading ? (
        <div className="w-full rounded-2xl border border-line bg-white p-8">
          <div className="flex flex-col items-center justify-center gap-2 text-center text-lg font-semibold">
            Carregando o questionário... Aguarde.
            <div>
              <Vortex
                visible={true}
                height="80"
                width="80"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={["#88C16C", "#2A7E9E", "#7C55C7", "#88C16C", "#2A7E9E", "#7C55C7"]}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Title />
            <p className="mt-3 text-xl text-ink-soft">
              Olá
              {user?.name && (
                <>
                  , <span className="font-semibold text-primary">{user.name}</span>
                </>
              )}
              .
            </p>

            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
              O teste tem 18 perguntas. Ao responder todas, você recebe um de
              três resultados, com uma análise do seu desempenho: liderança
              frágil e pouco trabalhada, liderança em desenvolvimento ou líder
              de alta performance. Responda com honestidade: a precisão do
              resultado depende das suas respostas. Não há limite de tempo nem
              respostas certas ou erradas.
            </p>

            <h2 className="mt-10 text-xl font-bold">Antes de começar</h2>
            <ul className="mt-4 flex max-w-[62ch] flex-col gap-3">
              {[
                "Verifique a sua conexão com a internet antes de iniciar.",
                "Se você sair do teste, ao voltar ele estará na página em que parou.",
                "Busque um lugar calmo e livre de perturbações.",
                "Faça o teste, preferencialmente, pelo computador.",
                "Se alguma página, imagem ou texto não carregar, atualize o navegador para carregá-la de novo.",
              ].map((dica) => (
                <li key={dica} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-leaf/30 text-leaf-700">
                    <Check className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-ink-soft">{dica}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <CustomButton
                href="/questionario"
                className="px-8 py-3 text-base"
                onClick={handleStartTest}
              >
                Iniciar teste
              </CustomButton>
            </div>
          </div>

          <Image
            src={illustration}
            alt=""
            className="mx-auto hidden h-auto w-full max-w-md lg:block"
            priority
          />
        </div>
      )}
    </main>
  );
}
