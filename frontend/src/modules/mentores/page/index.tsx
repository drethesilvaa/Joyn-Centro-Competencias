"use client"

import { PagesLayout } from "@/layouts/PagesLayout"
import { m } from "framer-motion"
import Image from "next/image"
import { Fragment } from "react"
import MentorCard from "../components/MentorCard"

const pageMentores = {
    pageTitle: "Mentores",
    pageDescription: "Cada Centro de Competência é liderado por profissionais experientes e apaixonados, que estão comprometidos em guiar e motivar nossas equipes rumo à excelência. Nossos líderes são visionários que definem a direção estratégica dos centros, garantindo que estejamos sempre na vanguarda da inovação tecnológica.<br/> <br/> Além da liderança dos centros, contamos com um time talentoso de mentores, que trazem vasta experiência e conhecimento em áreas específicas, como .NET e ciência de dados. Nossos mentores trabalham de perto com os consultores, oferecendo orientação técnica, aconselhamento de carreira e inspiração para ajudá-los a alcançar todo o seu potencial.",
    videoUrl: "https://www.youtube.com/watch?v=example-video-id",
    imageToSwapForVideo: "/mentores/pexels-vanessa-garcia-6325984.jpg",
    imageAlt: "alt"
}

const mentoresData = {
    centros: [{
        title: "Centro de Competência .NET",
        lider: {
            name: "Ricardo Santos",
            email: "",
            stack: [],
            photo: "/HomePage/ricardosantos.png",
            description: ""
        },
        mentores: [{
            name: "Gilberto Barros",
            email: "gilberto.barros@fyld.pt",
            stack: [{
                name: "C#",
                percent: 90,
            },
            {
                name: ".Net",
                percent: 90,
            }, {
                name: "MS SQL Server",
                percent: 90,
            }],
            photo: "/mentores/gilberto-barros.png",
            description: "C#, .Net framework, Queries e Stored Procedures SQL, Webservices Soap, regras de negócio ligadas a seguradoras."
        },
        {
            name: "Pietro Bottino",
            email: "pietro.bottino@fyld.pt",
            stack: [{
                name: ".Net",
                percent: 90,
            },
            {
                name: "ReactJs",
                percent: 90,
            },
            {
                name: "Angular",
                percent: 90,
            },
            {
                name: "SQLServer",
                percent: 90,
            }],
            photo: "/mentores/pietrobottino.png",
            description: ".Net, SQL Server, ReactJs, Lógica"
        },
        ]
    },
    {
        title: "Centro de Competência de Dados",
        lider: {
            name: "Daniel Guarino",
            email: "",
            stack: [],
            photo: "/HomePage/danielguarino.png",
            description: ""
        },
        mentores: [{
            name: "Emanoella Oliveira",
            email: "914134718",
            stack: [{
                name: "SSIS",
                percent: 90,
            },
            {
                name: "SSAS",
                percent: 90,
            },
            {
                name: "Azure Data Factory",
                percent: 90,
            },
            {
                name: " Power BI",
                percent: 90,
            }],
            photo: "/mentores/emanoellaoliveira.png",
            description: "Storytelling de dados com Power BI"
        },
        {
            name: "Bruno Duarte",
            email: "963518047 / bruno.duarte@fyld.pt",
            stack: [{
                name: "Azure Data Factory",
                percent: 90,
            },
            {
                name: "Databricks",
                percent: 90,
            },
            {
                name: "Azure Synapse",
                percent: 90,
            },
            {
                name: " Azure Data Lake Storage",
                percent: 90,
            },
            {
                name: "Power BI",
                percent: 90,
            }],
            photo: "/mentores/brunoduarte.png",
            description: "Power BI"
        }
        ]
    }

    ]
}

export const MentoresPage = () => {

    // const { data: pageMentores, isLoading } = usePageMentoresQuery()

    return (

        <PagesLayout
            pageTitle={pageMentores?.pageTitle || ""}
            pageDescription={pageMentores?.pageDescription || ""}
            pageImage={pageMentores?.imageToSwapForVideo || ""}
            pageImageAlt={pageMentores?.imageAlt || ""}
        >
            <div className="py-6 grid gap-10">
                {mentoresData.centros?.map((centro, k) => {
                    return (
                        <div key={k}>
                            <h2 className="heading-5xl font-semibold ">Mentores do <span className="font-medium">{centro.title} </span></h2>

                            <div className="flex gap-6 items-baseline mt-4">
                                <MentorCard isLeader={true} person={centro.lider} />
                                {centro.mentores.map((mentor, mk) => (
                                    <MentorCard isLeader={false} key={mk} person={mentor} />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>


        </PagesLayout>
    )
}