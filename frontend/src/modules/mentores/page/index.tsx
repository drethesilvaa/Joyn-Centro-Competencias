"use client"

import { PagesLayout } from "@/layouts/PagesLayout"

const pageMentores = {
    pageTitle: "Mentores",
    pageDescription: "Cada Centro de Competência é liderado por profissionais experientes e apaixonados, que estão comprometidos em guiar e motivar nossas equipes rumo à excelência. Nossos líderes são visionários que definem a direção estratégica dos centros, garantindo que estejamos sempre na vanguarda da inovação tecnológica.<br/> <br/> Além da liderança dos centros, contamos com um time talentoso de mentores, que trazem vasta experiência e conhecimento em áreas específicas, como .NET e ciência de dados. Nossos mentores trabalham de perto com os consultores, oferecendo orientação técnica, aconselhamento de carreira e inspiração para ajudá-los a alcançar todo o seu potencial.",
    videoUrl: "https://www.youtube.com/watch?v=example-video-id",
    imageToSwapForVideo: "/mentores/pexels-vanessa-garcia-6325984.jpg",
    imageAlt: "alt"
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
            <></>

        </PagesLayout>
    )
}