import * as PhosphorIcons from "phosphor-react";
import { motion } from "framer-motion";
import { createTransition } from "@/utils/createTransition";

interface ObjectivesProps {
  content: any;
}

export const Objectives = ({ content }: ObjectivesProps) => {
  return (
    <>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={createTransition(0.1)}
        className="heading-5xl font-semibold"
      >
        Objetivos
      </motion.h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {content?.topics?.map((topic: any, key: any) => {
          const iconName = topic?.iconName;
          let Icon = PhosphorIcons.Question;

          if (typeof iconName === "string" && iconName in PhosphorIcons) {
            Icon = (PhosphorIcons as any)[iconName];
          }
          return (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              className="grid gap-3 p-3 bg-white shadow-sm rounded-md justify-items-start"
              key={key}
            >
              <div>
                <span className="flex items-center p-2 bg-secondary text-white rounded-xl">
                  <Icon size={24} />
                </span>
              </div>
              <p className="body-xl">{topic?.description}</p>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};
