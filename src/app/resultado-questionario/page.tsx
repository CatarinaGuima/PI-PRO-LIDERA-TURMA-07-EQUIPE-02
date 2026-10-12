"use client";
import { CustomButton } from "@/components/button/custom-button";
import { Ladder, levelIndex } from "@/components/ladder";
import { Title } from "@/components/title";
import { useSearchParams } from "next/navigation";
import { jsPDF } from "jspdf";
import { Suspense, useCallback, useState } from "react";
import resultData from "../../lib/resultData.json";
import { useSession } from "../../../contexts/user-context";

export default function ResultadoQuestionario() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ResultadoContent />
    </Suspense>
  );
}

function ResultadoContent() {
  const searchParams = useSearchParams();
  const resultCategoryFromQuery = searchParams.get("resultCategory") || "";
  const { user } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mapeamento de categorias de resultado para mensagens
  const resultMessages: Record<string, string> = {
    "Liderança frágil e pouco trabalhada": resultData[0].textresult,
    "Liderança em desenvolvimento": resultData[1].textresult,
    "Líder de alta performance": resultData[2].textresult,
  };

  // Obter a mensagem correspondente
  const resultMessage =
    resultMessages[resultCategoryFromQuery] || "Resultado não encontrado.";

  // Agrupa as frases em parágrafos de até três frases para facilitar a leitura
  const sentences = resultMessage
    .split(".")
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) {
    paragraphs.push(`${sentences.slice(i, i + 3).join(". ")}.`);
  }

  const activeLevel = levelIndex(resultCategoryFromQuery);
  const levelTextColor = [
    "text-leaf-700",
    "text-primary",
    "text-violet-600",
  ][activeLevel];

  // Converter imagem para base64
  const getBase64ImageFromUrl = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Falha ao carregar a imagem.");

      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => reject("Erro ao ler a imagem.");
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Erro ao converter imagem para base64:", error);
      setError("Erro ao carregar a imagem.");
      throw error;
    }
  };

  // Função de download de PDF
  const handleDownload = useCallback(async () => {
    if (!user?.name) {
      setError("Nome do usuário não encontrado.");
      return;
    }

    setLoading(true);
    const userName = user?.name || "Usuário";
    const doc = new jsPDF("landscape", "mm", "a4");

    try {
      const base64Image = await getBase64ImageFromUrl("/Certificado.png");

      doc.addImage(base64Image, "PNG", 0, 0, 297, 210, undefined, "FAST");
      doc.setFontSize(32).setFont("helvetica", "bold");

      // Calcular a posição do nome
      const userNameWidth = doc.getTextWidth(userName); // Largura do nome
      const userNameX = (297 - userNameWidth) / 2; // Centraliza o nome
      doc.text(userName, userNameX, 120); // Posiciona o nome no certificado

      // Ajustar a posição da categoria para começar no começo da última linha
      const categoryX = 66; // Coloca no início da página (lado esquerdo)
      const categoryY = 164; // Defina a posição Y fixa (na última linha da página)

      // Exibir a categoria de resultado na última linha
      doc.setFontSize(12).text(resultCategoryFromQuery, categoryX, categoryY);

      doc.save("resultado_teste_lideranca.pdf");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao gerar o PDF:", error);
      setError("Erro ao gerar o PDF");
    }
  }, [user, resultCategoryFromQuery]);

  return (
    <main className="mx-auto max-w-[1100px] px-4 pb-20 pt-28 sm:px-6 lg:pt-32">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Title>Seu resultado</Title>
          <p className="mt-6 text-lg text-ink-soft">
            Com base nas suas respostas, seu nível de liderança é:
          </p>
          <h2
            className={`mt-1 text-3xl font-extrabold leading-tight sm:text-4xl ${
              levelTextColor ?? "text-ink"
            }`}
          >
            {resultCategoryFromQuery || "Liderança não determinada"}
          </h2>

          <div className="mt-6 flex max-w-[62ch] flex-col gap-4 text-lg leading-relaxed text-ink-soft">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 border-t border-line pt-6">
            <h3 className="text-xl font-bold">Seu certificado</h3>
            <p className="mt-1 text-ink-soft">
              Baixe o resultado em PDF para guardar o seu registro.
            </p>
            {error && (
              <p role="alert" className="mt-3 text-sm text-destructive">
                {error}
              </p>
            )}
            <div className="mt-4">
              <CustomButton
                onClick={handleDownload}
                disabled={loading}
                className="px-7 py-3"
              >
                {loading ? "Gerando PDF..." : "Baixar certificado em PDF"}
              </CustomButton>
            </div>
          </div>
        </div>

        <div className="lg:pt-10">
          <Ladder active={activeLevel} />
        </div>
      </div>
    </main>
  );
}
