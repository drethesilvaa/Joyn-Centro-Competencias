"use client";

import { PagesLayout } from "@/layouts/PagesLayout";
import MentorCard from "../components/MentorCard";
import { useMentoresQuery } from "../hooks/useMentoresQuery";
import { motion } from "framer-motion";
import { createTransition } from "@/utils/createTransition";
import Carousel from "@/components/Carousel";

const pageMentores = {
  pageTitle: "Mentores",
  pageDescription:
    "Cada Centro de Competência é liderado por profissionais experientes e apaixonados, que estão comprometidos em guiar e motivar as nossas equipas rumo à excelência. Nossos líderes são visionários que definem a direção estratégica dos centros, garantindo que estejamos sempre na vanguarda da inovação tecnológica.<br/> <br/> Além da liderança dos centros, contamos com uma equipa talentosa de mentores, que trazem vasta experiência e conhecimento em áreas específicas, como .NET e ciência de dados. Nossos mentores trabalham de perto com os consultores, oferecendo orientação técnica, aconselhamento de carreira e inspiração para ajudá-los a alcançar todo o seu potencial.",
  videoUrl: "https://www.youtube.com/watch?v=example-video-id",
  imageToSwapForVideo: "/mentores/pexels-vanessa-garcia-6325984.jpg",
  imageAlt: "alt",
};

export const MentoresPage = () => {
  const { data: mentoresData, isLoading } = useMentoresQuery();

  return (
    <PagesLayout
      pageTitle={pageMentores?.pageTitle || ""}
      pageDescription={pageMentores?.pageDescription || ""}
      pageImage={pageMentores?.imageToSwapForVideo || ""}
      pageImageAlt={pageMentores?.imageAlt || ""}
    >
      <Carousel
        auto={false}
        className="mt-16"
        slides={(mentoresData?.centros ?? [])?.map((centro, k) => {
          return (
            <div className="w-full py-5" key={k}>
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={createTransition(0)}
                viewport={{ once: true, amount: 0.3 }}
                className="heading-5xl font-semibold text-center "
              >
                Mentores do <span className="font-medium">{centro.title} </span>
              </motion.h2>

              <div className="grid justify-items-center gap-6 items-baseline my-10">
                <MentorCard isLeader={true} person={centro.lider} />
                <div className="flex flex-wrap items-center justify-center gap-6">
                  {centro.mentores.map((mentor, mk) => (
                    <MentorCard isLeader={false} key={mk} person={mentor} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      />
    </PagesLayout>
  );
};
