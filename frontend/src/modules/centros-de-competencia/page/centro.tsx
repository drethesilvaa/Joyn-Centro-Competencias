"use client";

import { AppProgressBar } from "@/components/AppProgressBar";
import { CentroDeCompetencia } from "../components/CentroDeCompetencia";
import { useCentrosCompetenciaQuery } from "../hooks/useCentrosCompetenciaQuery";

export const CentrosDeCompetenciaSinglePage = ({
  centro,
}: {
  centro: ".NET" | "Dados" | "Human Evolution" | "Cloud";
}) => {
  const query = useCentrosCompetenciaQuery();
  if (query.isLoading) return <AppProgressBar />;

  return query.data?.centrosDeCompetencia
    ?.filter((c) => c.title.includes(centro))
    .map((centro, index) => {
      return (
        <div key={index} className="py-20">
          <CentroDeCompetencia content={centro} />
        </div>
      );
    });
};
