"use client"

import { PagesLayout } from "@/layouts/PagesLayout"
import { useGetPoliticas } from "../hooks/useGetPoliticas"

const pagePoliticas = {
    pageTitle: "Políticas",
    pageDescription: "O gamification tem como objetivo aumentar o envolvimento e a motivação dos colaboradores, tornando as tarefas mais interativas e gratificantes. Através da aplicação de  pontos, incentiva-se a produtividade, o trabalho em equipa e o desenvolvimento contínuo no ambiente de trabalho",
    videoUrl: "https://www.youtube.com/watch?v=example-video-id",
    imageToSwapForVideo: "/politicas/pexels-olly-3760067.jpg",
    imageAlt: "alt"
}

export const PoliticasPage = () => {

    const { data: politicas, isLoading } = useGetPoliticas()

    return (

        <PagesLayout
            pageTitle={pagePoliticas?.pageTitle || ""}
            pageDescription={politicas || ""}
            pageImage={pagePoliticas?.imageToSwapForVideo || ""}
            pageImageAlt={pagePoliticas?.imageAlt || ""}
        >
            <></>

        </PagesLayout>
    )
}