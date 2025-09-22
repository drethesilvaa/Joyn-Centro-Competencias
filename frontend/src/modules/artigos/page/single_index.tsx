"use client";

import { useParams } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Image from "next/image";
import { AppBreadcrumb } from "@/components/Breadcrumb";
import { useArticleQuery } from "../hooks/useArticleQuery";
import { useScroll, motion, Transition } from "framer-motion";
import { AppProgressBar } from "@/components/AppProgressBar";
import { createTransition } from "@/utils/createTransition";

export default function ArtigoPage() {
  const params = useParams();
  const encodedId = params?.id as string;

  const { scrollYProgress } = useScroll();

  const id = encodedId ? decodeURIComponent(encodedId) : "";

  const { data: artigo, isLoading } = useArticleQuery(id as string);

  if (isLoading) return <AppProgressBar />;

  const titleSection = (
    <>
      <motion.h1
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={createTransition(0.3)}
        className="font-bold heading-5xl text-center"
      >
        <MarkdownRenderer content={artigo?.title || ""} />
      </motion.h1>
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={createTransition(0.5)}
        className="flex gap-6"
      >
        <div className="w-[10vw]">
          <Image
            width={262}
            height={262}
            className="object-cover rounded-2xl"
            src={artigo?.authorPic || ""}
            alt={`${artigo?.author} photo`}
          />
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <p className="text-primary font-semibold">{artigo?.author}</p>
          <p className="text-primary">{artigo?.authorRole}</p>
        </div>
      </motion.div>
    </>
  );

  return (
    <div className="py-16">
      <AppBreadcrumb />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={createTransition(0.2)}
        className="flex justify-end min-h-[40vh] flex-col bg-cover bg-center rounded-t-xl lg:rounded-xl relative"
        style={{ backgroundImage: `url(${artigo?.articleImage})` }}
      >
        <div className="top-0 left-0 w-full h-full absolute bg-black/20 rounded-t-xl lg:rounded-xl  "></div>

        <div className="hidden lg:grid items-center justify-items-center custom-gap-6 glass-bg glass-bg--whitter rounded-xl p-6 absolute -bottom-[10vw] left-1/12 right-1/12">
          {titleSection}
        </div>
      </motion.div>

      <div className="grid lg:hidden rounded-t-none items-center justify-items-center custom-gap-6 glass-bg rounded-xl p-6 ">
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={createTransition(0.5)}
        className="mt-[15vw] markdown-style"
      >
        <MarkdownRenderer content={artigo?.content || ""} />
      </motion.div>
    </div>
  );
}
