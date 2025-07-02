"use client"

import { PagesLayout } from "@/layouts/PagesLayout"

const pageEventos = {
    pageTitle: "Eventos",
    pageDescription: "O gamification tem como objetivo aumentar o envolvimento e a motivação dos colaboradores, tornando as tarefas mais interativas e gratificantes. Através da aplicação de  pontos, incentiva-se a produtividade, o trabalho em equipa e o desenvolvimento contínuo no ambiente de trabalho",
    videoUrl: "https://www.youtube.com/watch?v=example-video-id",
    imageToSwapForVideo: "/eventos/pexels-zhuhehuai-716276.jpg",
    imageAlt: "alt"
}

export const EventosPage = () => {

    // const { data: pageMentores, isLoading } = usePageMentoresQuery()

    return (

        <PagesLayout
            pageTitle={pageEventos?.pageTitle || ""}
            pageDescription={""}
            pageImage={pageEventos?.imageToSwapForVideo || ""}
            pageImageAlt={pageEventos?.imageAlt || ""}
        >
            <></>

        </PagesLayout>
    )
}