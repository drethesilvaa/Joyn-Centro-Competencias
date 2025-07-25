"use client";

import { PagesLayout } from "@/layouts/PagesLayout";
import Image from "next/image";
import { useGamificationQuery } from "../hooks/useGamificationQuery";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { motion } from "framer-motion";
import { createTransition } from "@/utils/createTransition";

const pageGamification = {
  pageTitle: "Gamification",
  pageDescription:
    "O gamification tem como objetivo aumentar o envolvimento e a motivação dos colaboradores, tornando as tarefas mais interativas e gratificantes. Através da aplicação de  pontos, incentiva-se a produtividade, o trabalho em equipa e o desenvolvimento contínuo no ambiente de trabalho",
  videoUrl: "https://www.youtube.com/watch?v=example-video-id",
  imageToSwapForVideo: "/gamification/pexels-rdne-7005687.jpg",
  imageAlt: "alt",
};

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
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={createTransition(0)}
              viewport={{ once: true, amount: 0.3 }}
              className="heading-5xl font-semibold"
            >
              Pontos
            </motion.h2>
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={createTransition(0)}
              viewport={{ once: true, amount: 0.3 }}
              className="pt-4"
            >
              {data?.pontos.map((content, k) => (
                <li key={k}>{content}</li>
              ))}
            </motion.ul>
          </div>
          <div>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={createTransition(0)}
              viewport={{ once: true, amount: 0.3 }}
              className="heading-5xl font-semibold"
            >
              Reconhece quem merece
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={createTransition(0)}
              viewport={{ once: true, amount: 0.3 }}
              className="heading-2xl font-semibold pt-4"
            >
              Como atribuir medalhas:
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={createTransition(0)}
              viewport={{ once: true, amount: 0.3 }}
              className="pt-4"
            >
              Envia um e-mail para {data?.reconhece.email}:
            </motion.p>
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={createTransition(0)}
              viewport={{ once: true, amount: 0.3 }}
            >
              {data?.reconhece.passos.map((content, k) => (
                <li key={k}>{content}</li>
              ))}
            </motion.ul>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={createTransition(0)}
              viewport={{ once: true, amount: 0.3 }}
              className="heading-2xl font-semibold pt-4"
            >
              Regras:
            </motion.h3>
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={createTransition(0)}
              viewport={{ once: true, amount: 0.3 }}
              className="pt-4"
            >
              {data?.reconhece.regras.map((content, k) => (
                <li key={k}>{content}</li>
              ))}
            </motion.ul>
          </div>
          <div>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={createTransition(0)}
              viewport={{ once: true, amount: 0.3 }}
              className="heading-5xl font-semibold"
            >
              Medalhas
            </motion.h2>
            <div className="grid gap-4 mt-4">
              {data?.medalhas.map((medalha, k) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={createTransition(0)}
                  viewport={{ once: true, amount: 0.3 }}
                  key={k}
                  className="flex gap-4 items-center"
                >
                  <span className="flex items-center p-2 bg-secondary text-white rounded-xl">
                    <Image
                      width={26}
                      height={26}
                      src={medalha.icon || ""}
                      alt="icon"
                    />
                    {/* <Icon size={24} /> */}
                  </span>
                  <MarkdownRenderer content={medalha?.title} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </>
    </PagesLayout>
  );
};
