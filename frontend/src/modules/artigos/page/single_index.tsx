"use client"

import { useParams } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Image from "next/image";
import { AppBreadcrumb } from "@/components/Breadcrumb";
import { useArticleQuery } from "../hooks/useArticleQuery";
import { useScroll, motion } from 'framer-motion';

export default function ArtigoPage() {
    const params = useParams();
    const encodedId = params?.id as string;

    const { scrollYProgress } = useScroll()

    const id = encodedId ? decodeURIComponent(encodedId) : '';

    const { data: artigo, isLoading } = useArticleQuery(id as string);

    if (isLoading) return <p>Loading</p>

    const titleSection = <>
        <h1 className="font-bold heading-5xl text-center">
            <MarkdownRenderer content={artigo?.title || ""} />
        </h1>
        <div className="flex gap-6">
            <div className="w-[10vw]">
                <Image width={262} height={262} className="object-cover rounded-2xl" src={artigo?.authorPic || ""} alt={`${artigo?.author} photo`} />
            </div>
            <div className="flex flex-col gap-2 justify-center">
                <p className="text-primary font-semibold" >{artigo?.author}</p>
                <p className="text-primary">{artigo?.authorRole}</p>
            </div>
        </div>
    </>

    return (
        <div className="py-16">
            <AppBreadcrumb />
            <div className="flex justify-end min-h-[40vh] flex-col bg-cover bg-center rounded-t-xl lg:rounded-xl relative"
                style={{ backgroundImage: `url(${artigo?.articleImage})` }}>

                <div className="top-0 left-0 w-full h-full absolute bg-black/20 rounded-t-xl lg:rounded-xl  "></div>

                <div className="hidden lg:grid items-center justify-items-center custom-gap-6 bg-box-grey rounded-xl p-6 absolute -bottom-[10vw] left-1/12 right-1/12">
                    {titleSection}
                </div>

            </div>

            <div className="grid lg:hidden rounded-t-none items-center justify-items-center custom-gap-6 bg-box-grey rounded-xl p-6 ">
                {titleSection}
            </div>

            <motion.div
                id="scroll-indicator"
                style={{
                    scaleX: scrollYProgress,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 5,
                    originX: 0,
                    backgroundColor: "#3e90be",
                }}
            />

            <div className="mt-[15vw] markdown-style">
                <MarkdownRenderer content={artigo?.content || ""} />
            </div>

        </div>
    );
}