"use client";
import React, { FormEvent, Suspense, useEffect, useState } from "react";
import data from "../../lib/data.json";
import { useForm, Controller } from "react-hook-form";
import { CustomButton } from "@/components/button/custom-button";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { ConfirmDialog } from "@/components/confirmDialog";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { Vortex } from "react-loader-spinner";
import { useSession } from "../../../contexts/user-context";
import { supabase } from "@/lib/supabaseClient";

type Option = {
  id: string;
  value: string;
  score: number;
};

type Question = {
  id: string;
  question: string;
  options: Option[];
};

type FormData = {
  [key: string]: string;
};

const questions: Question[] = data.flatMap(
  (item) => item.questions
) as Question[];

export default function TesteLideranca() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <QuestionarioContent />
    </Suspense>
  );
}

function QuestionarioContent() {
  const { control, handleSubmit, watch, setValue } = useForm<FormData>();
  const [currentPage, setCurrentPage] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageUrl = Number(searchParams.get("page"));

  const questionsPerPage = 3;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const currentQuestions = questions.slice(
    pageUrl * questionsPerPage,
    pageUrl * questionsPerPage + questionsPerPage
  );

  // Calcula o progresso baseado nas perguntas respondidas
  const totalAnswered = questions.filter(
    (question) =>
      watch(`question${question.id}`) !== undefined &&
      watch(`question${question.id}`) !== ""
  ).length;

  const progress = (totalAnswered / questions.length) * 100; // Progresso total, baseado no número total de perguntas
  const { id } = useSession();
  const userId = id;

  useEffect(() => {
    if (currentPage === 0) {
      const savedPage = localStorage.getItem("currentPage");
      if (savedPage) {
        setCurrentPage(parseInt(savedPage, 10));
      }
    }
  }, [currentPage]);

  // Recupera o valor da página na URL ao carregar
  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    const pageFromURL = parseInt(searchParams.get("page") || "0", 10);
    setCurrentPage(pageFromURL);

    // Garante que a página seja válida e dentro do intervalo
    const pageToSet =
      !isNaN(pageFromURL) && pageFromURL >= 0 && pageFromURL < totalPages
        ? pageFromURL
        : savedPage
          ? parseInt(savedPage, 10)
          : 0;

    setCurrentPage(pageToSet);

  }, [searchParams, totalPages]);

  const currentThemeIndex = Math.floor(
    currentPage / (data[0].questions.length / questionsPerPage)
  );
  const currentTheme = data[currentThemeIndex]?.theme || "Tema não disponível";

  useEffect(() => {
    const savedData: { [key: string]: string } = JSON.parse(
      localStorage.getItem("formData") || "{}"
    );
    Object.keys(savedData).forEach((key) => {
      const value = savedData[key];
      if (typeof value === "string") {
        setValue(key, value);
      }
    });
  }, [setValue]);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (!pageParam || isNaN(pageUrl)) {
      router.replace(`/questionario?page=0`);
      localStorage.setItem("currentPage", "0");
      setCurrentPage(0);
    } else {
      const pageToSet =
        !isNaN(pageUrl) && pageUrl >= 0 && pageUrl < totalPages
          ? pageUrl
          : 0; // Se o valor estiver errado, cai para a primeira página
      setCurrentPage(pageToSet);
    }
  }, [searchParams, pageUrl, totalPages, router]);

  const saveResponseToLocalStorage = (fieldName: string, value: string) => {
    const savedData = JSON.parse(localStorage.getItem("formData") || "{}");
    savedData[fieldName] = value;
    localStorage.setItem("formData", JSON.stringify(savedData));
    localStorage.setItem("currentPage", currentPage.toString());
  };

  const handleNextPage = () => {
    const incompleteQuestionIds = isPageComplete();
    if (incompleteQuestionIds === null) {
      saveResponsesToLocalStorage();
      const nextPage = pageUrl + 1;
      router.push(`/questionario?page=${nextPage}`);
      localStorage.setItem("currentPage", nextPage.toString()); // Atualiza o localStorage
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast({
        title: "Perguntas incompletas",
        description: `Você não respondeu às seguintes perguntas: ${incompleteQuestionIds
          .map((q) => q.id)
          .join(", ")}.`,
        className:
          "flex w-full max-w-sm py-5 px-6 bg-white rounded-xl border border-gray-200 shadow-sm mb-4 gap-4",
        role: "alert",
      });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      router.push(`/questionario?page=${prevPage}`);
      localStorage.setItem("currentPage", prevPage.toString()); // Atualiza o localStorage
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isPageComplete = () => {
    const incompleteQuestions = currentQuestions
      .filter((question) => !watch(`question${question.id}`))
      .map((question) => ({ id: question.id, text: question.question }));

    return incompleteQuestions.length > 0 ? incompleteQuestions : null;
  };

  useEffect(() => {
    const handleUnload = () => {
      localStorage.setItem("currentPage", currentPage.toString());
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [currentPage]);

  const onSubmit = async (formData: FormData) => {
    let totalScore = 0;
    for (const key in formData) {
      const question = questions.find((q) => `question${q.id}` === key);
      const option = question?.options.find(
        (opt) => opt.value === formData[key]
      );
      totalScore += option ? option.score : 0;
    }

    let resultCategory;
    if (totalScore >= 18 && totalScore <= 35) {
      resultCategory = "Liderança frágil e pouco trabalhada";
    } else if (totalScore >= 36 && totalScore <= 53) {
      resultCategory = "Liderança em desenvolvimento";
    } else if (totalScore >= 54 && totalScore <= 72) {
      resultCategory = "Líder de alta performance";
    }

    const { data, error } = await supabase.from("results").insert([
      {
        user_id: userId,
        score: totalScore,
        category: resultCategory,
        created_at: new Date().toISOString(),
      },
    ]);

    console.log(data);
    console.log(error);

    const encodedResultCategory = encodeURIComponent(
      resultCategory || "Liderança não determinada"
    );
    localStorage.removeItem("responses");
    router.push(
      `/resultado-questionario?resultCategory=${encodedResultCategory}`
    );
    localStorage.removeItem("formData");
  };

  const handleSubmitDialog = (e?: FormEvent) => {
    e?.preventDefault();
    setIsLoading(true); // Ativa o carregamento
    handleSubmit(onSubmit)();
    setIsDialogOpen(false);
  };

  const confirmAction = () => {
    setIsDialogOpen(true);
  };

  const saveResponsesToLocalStorage = () => {
    const responses: FormData = {};
    currentQuestions.forEach((question) => {
      const response = watch(`question${question.id}`);
      if (response) {
        responses[`question${question.id}`] = response;
      }
    });
    localStorage.setItem("responses", JSON.stringify(responses));
  };


  return (
    <main className="flex min-h-screen justify-center px-4 pb-16 pt-24 sm:pt-28">
      <div className="w-full max-w-3xl">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-white p-10 text-center text-lg font-semibold">
            Enviando... Aguarde.
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
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <header className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold sm:text-3xl">Teste de liderança</h1>
                <span className="rounded-full bg-leaf/25 px-3 py-1 text-sm font-semibold text-leaf-700">
                  {currentTheme}
                </span>
              </div>

              <div>
                <div
                  className="h-2.5 w-full overflow-hidden rounded-full bg-line"
                  role="progressbar"
                  aria-label="Progresso do teste"
                  aria-valuemin={0}
                  aria-valuemax={questions.length}
                  aria-valuenow={totalAnswered}
                >
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${progress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-sm text-ink-muted">
                  <span>
                    Página {currentPage + 1} de {totalPages}
                  </span>
                  <span>{totalAnswered} de {questions.length} respondidas</span>
                </div>
              </div>
            </header>

            <div className="flex flex-col gap-6">
              {currentQuestions.map((question) => (
                <fieldset
                  key={question.id}
                  className="rounded-2xl border border-line bg-white p-5 sm:p-7"
                >
                  <legend className="sr-only">Pergunta {question.id}</legend>
                  <p className="text-sm font-semibold text-primary">
                    Pergunta {question.id} de {questions.length}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold leading-snug sm:text-[1.35rem]">
                    {question.question}
                  </h2>
                  <div className="mt-5 flex flex-col gap-3">
                    {question.options.map((option) => (
                      <Controller
                        key={option.id}
                        name={`question${question.id}`}
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                          <label
                            htmlFor={`question${question.id}_option${option.id}`}
                            className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-background/60 p-4 transition-colors hover:border-primary/60 has-[:checked]:border-primary has-[:checked]:bg-primary/[0.06] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/40"
                          >
                            <input
                              {...field}
                              type="radio"
                              id={`question${question.id}_option${option.id}`}
                              value={option.value}
                              checked={field.value === option.value}
                              onChange={(e) => {
                                field.onChange(e);
                                saveResponseToLocalStorage(
                                  `question${question.id}`,
                                  e.target.value
                                );
                              }}
                              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#1F6F8B]"
                            />
                            <span className="leading-snug text-ink">
                              {option.value}
                            </span>
                          </label>
                        )}
                      />
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3">
              {currentPage > 0 ? (
                <CustomButton type="button" variant="outline" onClick={handlePreviousPage}>
                  Anterior
                </CustomButton>
              ) : (
                <span />
              )}

              {currentPage < totalPages - 1 ? (
                <CustomButton type="button" onClick={handleNextPage} className="px-7">
                  Próximo
                </CustomButton>
              ) : (
                <CustomButton type="button" onClick={confirmAction} className="px-7">
                  Enviar respostas
                </CustomButton>
              )}
            </div>

            <ConfirmDialog
              isOpen={isDialogOpen}
              onConfirm={handleSubmitDialog}
              onCancel={() => setIsDialogOpen(false)}
              onClose={() => setIsDialogOpen(false)}
              confirmButtonLabel="Enviar respostas"
              icon={<ExclamationTriangleIcon />}
              title="Enviar suas respostas?"
              message="Depois do envio, não será possível alterar as respostas."
            />
          </form>
        )}
      </div>
    </main>
  );
}
