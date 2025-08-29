import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getPhosphorIcon } from "@/utils/getPhosphorIcon";
import {
  ArrowRightIcon,
  GraduationCapIcon,
  MegaphoneIcon,
  QuotesIcon,
  UsersThreeIcon,
  ChartDonutIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "antd";
import { Fragment } from "react";
import { ChartsGrid } from "./ChartsGrid";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createTransition } from "@/utils/createTransition";
import Image from "next/image";

interface ObjectivesProps {
  content: any;
}

interface learningtype {
  title: string;
  description?: string | null;
  topics?: Array<{
    topicTitle: string;
    topicDetails?: Array<{
      iconName: string;
      description?: string | null;
      url?: string | null;
    } | null> | null;
  } | null> | null;
}

interface topic {
  iconName: string;
  title: string;
}

const openInNewTab = (url: string) => {
  window.open(url, "_blank");
};

export const CentroDeCompetencia = ({ content }: ObjectivesProps) => {
  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-12 gap-6 ">
        <div className="col-span-10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={createTransition(0.1)}
            viewport={{ once: true, amount: 0.3 }}
            className="heading-5xl font-semibold"
          >
            {content.title}
          </motion.h2>
          <div className="mt-6 grid gap-16">
            <div className="flex gap-6 items-start">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={createTransition(0.1)}
                viewport={{ once: true, amount: 0.3 }}
                className="sticky top-5"
              >
                <QuotesIcon weight="fill" size={65} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={createTransition(0.1)}
                viewport={{ once: true, amount: 0.3 }}
                className="body-xl"
              >
                <MarkdownRenderer content={content.description || ""} />
              </motion.div>
            </div>
            {content?.charts && content?.charts?.length > 0 && (
              <div className="flex gap-6 items-start">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={createTransition(0.1)}
                  className="sticky top-5"
                >
                  <ChartDonutIcon weight="fill" size={65} />
                </motion.div>
                <ChartsGrid charts={content.charts || []} />
              </div>
            )}
            <div className="flex gap-6 items-start">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={createTransition(0.1)}
                viewport={{ once: true, amount: 0.3 }}
                className="sticky top-5"
              >
                <GraduationCapIcon weight="fill" size={65} />
              </motion.div>
              <div className="grid gap-12">
                {content?.learning?.map((l: learningtype) => (
                  <div className="grid gap-6" key={l.title}>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={createTransition(0.1)}
                      viewport={{ once: true, amount: 0.3 }}
                      className="heading-3xl font-semibold"
                    >
                      {l.title}
                    </motion.h3>
                    {l.description && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={createTransition(0.1)}
                        viewport={{ once: true, amount: 0.3 }}
                      >
                        <MarkdownRenderer content={l.description || ""} />
                      </motion.div>
                    )}
                    {l.topics && l.topics?.length > 0 && (
                      <ul>
                        {l.topics.map((topic) => (
                          <Fragment key={topic?.topicTitle}>
                            <motion.p
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={createTransition(0.1)}
                              viewport={{ once: true, amount: 0.3 }}
                              className="font-semibold mt-6"
                            >
                              {topic?.topicTitle}
                            </motion.p>
                            <div className="flex gap-6 py-6 justify-evenly">
                              {topic?.topicDetails?.map((detail, i) => {
                                const Icon = getPhosphorIcon(detail?.iconName);
                                return (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={createTransition(0.1)}
                                    viewport={{ once: true, amount: 0.3 }}
                                    className="grid items-start justify-items-center gap-3"
                                    key={i}
                                  >
                                    <Icon size={32} />
                                    <p className="text-center">
                                      {detail?.description}
                                    </p>
                                    {detail?.url && (
                                      <Button
                                        onClick={() =>
                                          openInNewTab(detail?.url || "")
                                        }
                                        color="primary"
                                        variant="solid"
                                        icon={<ArrowRightIcon />}
                                      />
                                    )}
                                  </motion.div>
                                );
                              })}
                            </div>
                          </Fragment>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {content.feedback && (
              <div className="flex gap-6 items-start">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={createTransition(0.1)}
                  viewport={{ once: true, amount: 0.3 }}
                  className="sticky top-5"
                >
                  <MegaphoneIcon weight="fill" size={65} />
                </motion.div>
                <div className="grid gap-3">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={createTransition(0.1)}
                    viewport={{ once: true, amount: 0.3 }}
                    className="heading-3xl font-semibold"
                  >
                    Feedback & Melhoria Contínua
                  </motion.h3>
                  {content.feedback?.description && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={createTransition(0.1)}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <MarkdownRenderer
                        content={content.feedback?.description || ""}
                      />
                    </motion.div>
                  )}
                  <div className="grid gap-6">
                    {content.feedback?.topics?.map((topic: topic) => {
                      const Icon = getPhosphorIcon(topic?.iconName);

                      return (
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={createTransition(0.1)}
                          viewport={{ once: true, amount: 0.3 }}
                          className="flex gap-3 rounded-md items-center"
                          key={topic.title}
                        >
                          <div>
                            <span className="flex items-center p-2 bg-accent text-white rounded-xl">
                              <Icon size={24} />
                            </span>
                          </div>
                          <p className="body-xl">{topic?.title}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {content.incentivos && (
              <div className="flex gap-6 items-start">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={createTransition(0.1)}
                  viewport={{ once: true, amount: 0.3 }}
                  className="sticky top-5"
                >
                  <UsersThreeIcon weight="fill" size={65} />
                </motion.div>
                <div className="grid gap-3">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={createTransition(0.1)}
                    viewport={{ once: true, amount: 0.3 }}
                    className="heading-3xl font-semibold"
                  >
                    Incentivos & Envolvimento da Comunidade
                  </motion.h3>
                  {content.incentivos?.description && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={createTransition(0.1)}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <MarkdownRenderer
                        content={content.incentivos?.description || ""}
                      />
                    </motion.div>
                  )}
                  <div className="grid gap-6">
                    {content.incentivos?.topics?.map((topic: topic) => {
                      const Icon = getPhosphorIcon(topic?.iconName);

                      return (
                        <motion.div
                          className="flex gap-3 rounded-md items-center"
                          key={topic.title}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={createTransition(0.1)}
                          viewport={{ once: true, amount: 0.3 }}
                        >
                          <div>
                            <span className="flex items-center p-2 bg-accent text-white rounded-xl">
                              <Icon size={24} />
                            </span>
                          </div>
                          <p className="body-xl">{topic?.title}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-2 flex justify-end items-start">
          <Image
            width={200}
            height={200}
            className="object-cover rounded-2xl"
            src={content?.mentor_img || ""}
            alt={`${content?.mentorName} photo`}
          />
        </div>
      </div>
    </>
  );
};
