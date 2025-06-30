"use client"
import { PagesLayout } from "@/layouts/PagesLayout"
import { useArtigosInfiteQuery } from "../hooks/useArtigosQuery";
import { usePageArtigosQuery } from "../hooks/usePageArtigosQuery";
import { Avatar, Card } from 'antd';
import { ArticleIcon } from "@phosphor-icons/react";
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export const ArtigosPage = () => {


    const router = useRouter()

    const { Meta } = Card;

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useArtigosInfiteQuery(10);

    const allArtigos = data?.pages.flatMap(page => page.data) ?? [];

    const { data: pageArtigos, isLoading } = usePageArtigosQuery()

    if (isLoading) return <p>Loading</p>

    return (
        <PagesLayout
            pageTitle={pageArtigos?.title || ""}
            pageDescription={pageArtigos?.description || ""}
            pageImage={pageArtigos?.imageToSwapForVideo || ""}
            pageImageAlt=""
        >
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 articles mt-20">
                    {allArtigos.map(artigo => (
                        <Card
                            key={artigo?.id}
                            cover={
                                <motion.div
                                    className="relative cursor-pointer overflow-hidden"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={() => router.push("/artigos/" + artigo?._sys?.filename)}
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

                {hasNextPage && (
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                    </button>
                )}
            </>
        </PagesLayout >
    )
}
