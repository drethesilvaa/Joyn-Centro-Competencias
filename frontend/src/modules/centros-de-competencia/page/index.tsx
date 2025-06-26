"use client"

import { PagesLayout } from "@/layouts/PagesLayout";
import { useCentrosCompetenciaQuery } from "../hooks/useCentrosCompetenciaQuery";

export const CentrosDeCompetenciaPage = () => {

    const query = useCentrosCompetenciaQuery();

    if (query.isLoading) return <p>Loading</p>

    return <PagesLayout
        pageTitle={query.data?.header?.title || ""}
        pageDescription={query.data?.header?.description || ""}
        pageImage={query.data?.header?.imageToSwapForVideo || ""}
        pageImageAlt="">
        <p></p>
    </PagesLayout>
}