"use client"
import { PagesLayout } from "@/layouts/PagesLayout"
import { useArtigosQuery } from "../hooks/useArtigosQuery";
import { Avatar, Card } from 'antd';
import { ArticleIcon } from "@phosphor-icons/react";
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";

const articlesPage = {
    title: "Artigos",
    description: "Os nossos artigos são uma extensão natural dos Centros de Competência JOYN, criados para partilhar conhecimento especializado e insights valiosos com a comunidade tecnológica. Aqui encontrará conteúdo técnico aprofundado, análises de tendências, melhores práticas e experiências reais dos nossos consultores no desenvolvimento de soluções inovadoras.\n<br /> <br />\nCada artigo reflete o compromisso do grupo JOYN com a excelência técnica e a partilha de conhecimento. Desde implementações práticas em .NET até estratégias avançadas de gestão de dados, exploramos temas que moldam o futuro da tecnologia empresarial.\n<br /> <br />\nEsta plataforma serve como ponte entre a nossa experiência interna e a comunidade externa, promovendo o diálogo, a inovação e o crescimento coletivo no ecossistema tecnológico português.",
    videoUrl: "https://www.youtube.com/watch?v=example-video-id",
    imageToSwapForVideo: "/Centros%20de%20Competencia/women-7527799_1920.jpg"
}

export const ArtigosPage = () => {


    const router = useRouter()

    const { Meta } = Card;

    const {
        data,
        isLoading,
        error
    } = useArtigosQuery();


    if (isLoading) return <p>Loading</p>

    return (
        <PagesLayout
            pageTitle={articlesPage?.title || ""}
            pageDescription={articlesPage?.description || ""}
            pageImage={articlesPage?.imageToSwapForVideo || ""}
            pageImageAlt=""
        >
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 articles mt-20">
                    {data?.articles.map((artigo, k) => (
                        <Card
                            key={k}
                            cover={
                                <motion.div
                                    className="relative cursor-pointer overflow-hidden"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={() => router.push("/artigos/" + artigo?.slug)}
                                >
                                    <motion.span
                                        className="absolute w-full h-full z-[1] flex items-center justify-center"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.25 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ArticleIcon size={56} color="#E6E6E6" />
                                        </motion.div>
                                    </motion.span>
                                    <motion.img
                                        className="brightness-75"
                                        alt="example"
                                        src={artigo?.articleImage || ""}
                                        whileHover={{
                                            scale: 1.05,
                                            filter: "brightness(0.5)"
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.div>
                            }
                        >
                            <Meta
                                className="p-4"
                                avatar={<Avatar src={artigo?.authorPic} />}
                                title={<MarkdownRenderer content={artigo?.title || ""} />}
                                description={artigo?.subTitle}
                            />
                        </Card>
                    ))}

                </div>
            </>
        </PagesLayout >
    )
}
