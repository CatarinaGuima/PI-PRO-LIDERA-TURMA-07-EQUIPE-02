"use client";
import React, { FormEvent, useEffect, useState } from "react";
import data from "../../lib/data.json";
import { useForm, Controller } from "react-hook-form";
import { CustomButton } from "@/components/button/custom-button";
import { useToast } from "@/hooks/use-toast";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ConfirmDialog } from "@/components/confirmDialog";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

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
  const { control, handleSubmit, watch, setValue } = useForm<FormData>();
  const [currentPage, setCurrentPage] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const questionsPerPage = 3;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const currentQuestions = questions.slice(
    currentPage * questionsPerPage,
    currentPage * questionsPerPage + questionsPerPage
  );

  useEffect(() => {
    if (currentPage === 0) {
      const savedPage = localStorage.getItem('currentPage');
      if (savedPage) {
        setCurrentPage(parseInt(savedPage, 10));
      }
    }
  }, [currentPage]);
  

  // Recupera o valor da página na URL ao carregar
  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    const pageFromURL = parseInt(searchParams.get("page") || "", 10);

    const pageToSet =
      !isNaN(pageFromURL) && pageFromURL >= 0 && pageFromURL < totalPages
        ? pageFromURL
        : savedPage
        ? parseInt(savedPage, 10)
        : 0;

    setCurrentPage(pageToSet);
  }, [searchParams, totalPages]);

  useEffect(() => {
    // Atualiza a URL quando a página muda
    router.replace(`${pathname}?page=${currentPage}`);
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage, pathname, router]);

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

  const saveResponseToLocalStorage = (fieldName: string, value: string) => {
    const savedData = JSON.parse(localStorage.getItem("formData") || "{}");
    savedData[fieldName] = value;
    localStorage.setItem("formData", JSON.stringify(savedData));
    localStorage.setItem("currentPage", currentPage.toString()); //salva a página atual.
  };

  const handleNextPage = () => {
    const incompleteQuestionIds = isPageComplete();
    if (incompleteQuestionIds === null) {
      saveResponsesToLocalStorage();
      setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
      window.scrollTo(0, 0);
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
    setCurrentPage((prev) => Math.max(prev - 1, 0));
    window.scrollTo(0, 0);
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

  const onSubmit = (formData: FormData) => {
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
    <div className="flex justify-center items-center h-full py-24 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-screen-md relative">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <h1 className="text-2xl font-bold text-center mb-8 text-primary">
            Teste de Liderança - PRO Lidera Skills
          </h1>
          <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-purple-400">
            Tema: {currentTheme}
          </span>

          {currentQuestions.map((question) => (
            <div
              key={question.id}
              className="flex flex-col text-justify space-y-5"
            >
              <h2 className="text-xl text-primary font-bold">
                Pergunta {question.id}
              </h2>
              <h3 className="font-semibold text-base">{question.question}</h3>
              {question.options.map((option) => (
                <Controller
                  key={option.id}
                  name={`question${question.id}`}
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="flex items-center">
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
                        className="mr-2"
                      />
                      <label
                        htmlFor={`question${question.id}_option${option.id}`}
                        className="text-gray-700"
                      >
                        {option.value}
                      </label>
                    </div>
                  )}
                />
              ))}
            </div>
          ))}

          <div className="flex justify-between mt-8">
            {currentPage > 0 && (
              <CustomButton onClick={handlePreviousPage}>Anterior</CustomButton>
            )}
            {currentPage < totalPages - 1 ? (
              <CustomButton onClick={handleNextPage}>Próximo</CustomButton>
            ) : (
              <CustomButton type="button" onClick={confirmAction}>
                Enviar
              </CustomButton>
            )}
          </div>
        </form>
        <ConfirmDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={handleSubmitDialog}
          icon={<ExclamationTriangleIcon />}
          message="Deseja mesmo enviar o questionário?"
          confirmButtonLabel="Enviar"
        />
      </div>
    </div>
  );
}
