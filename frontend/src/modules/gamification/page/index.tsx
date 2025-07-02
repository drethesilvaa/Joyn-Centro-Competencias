"use client"

import { PagesLayout } from "@/layouts/PagesLayout"
import Image from "next/image"
import { useGamificationQuery } from "../hooks/useGamificationQuery"
import MarkdownRenderer from "@/components/MarkdownRenderer"



const pageGamification = {
    pageTitle: "Gamification",
    pageDescription: "O gamification tem como objetivo aumentar o envolvimento e a motivação dos colaboradores, tornando as tarefas mais interativas e gratificantes. Através da aplicação de  pontos, incentiva-se a produtividade, o trabalho em equipa e o desenvolvimento contínuo no ambiente de trabalho",
    videoUrl: "https://www.youtube.com/watch?v=example-video-id",
    imageToSwapForVideo: "/gamification/pexels-rdne-7005687.jpg",
    imageAlt: "alt"
}

export const GamificationPage = () => {

    const { data, isLoading, error } = useGamificationQuery();

    return (

        <PagesLayout
            pageTitle={pageGamification?.pageTitle || ""}
            pageDescription={pageGamification?.pageDescription || ""}
            pageImage={pageGamification?.imageToSwapForVideo || ""}
            pageImageAlt={pageGamification?.imageAlt || ""}
        >
            <>
                <div className="grid gap-6 py-6">
                    <div>
                        <h2 className="heading-5xl font-semibold">Pontos</h2>
                        <ul className="pt-4">
                            {data?.pontos.map(content => (
                                <li>{content}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="heading-5xl font-semibold">Reconhece quem merece</h2>
                        <h3 className="heading-2xl font-semibold pt-4">Como atribuir medalhas:</h3>
                        <p className="pt-4">Envia um e-mail para {data?.reconhece.email}:</p>
                        <ul>
                            {data?.reconhece.passos.map(content => (
                                <li>{content}</li>
                            ))}
                        </ul>
                        <h3 className="heading-2xl font-semibold pt-4">Regras:</h3>
                        <ul className="pt-4">
                            {data?.reconhece.regras.map(content => (
                                <li>{content}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="heading-5xl font-semibold">Medalhas</h2>
                        <div className="grid gap-4 mt-4">
                            {data?.medalhas.map((medalha, k) => (
                                <div key={k} className="flex gap-4 items-center">
                                    <span className="flex items-center p-2 bg-secondary text-white rounded-xl">
                                        <Image width={26} height={26} src={medalha.icon || ""} alt="icon" />
                                        {/* <Icon size={24} /> */}
                                    </span>
                                    <MarkdownRenderer content={medalha?.title} />
                                </div>
                            )
                            )}
                        </div>
                    </div>
                </div>

            </>

        </PagesLayout>
    )
}