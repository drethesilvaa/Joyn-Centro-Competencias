"use client";

import { ReactNode } from "react";
import {
  BrainIcon,
  ArrowRightIcon,
  LecternIcon,
  ChalkboardIcon,
  CalendarDotsIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Button, Card } from "antd";
import { useRouter } from "next/navigation";
import { homePageScreens } from "../data/homepage-screens";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { BottomNavigation } from "../components/BottomNavigation";

interface TemplateProps {
  children: ReactNode;
}

const classNameIcon = "h-[22px] w-[22px] sm:h-[32px] sm:w-[32px]";

export const cardData = [
  {
    key: "centros",
    icon: <BrainIcon className={classNameIcon} />,
    title: "Os Nossos Centros",
  },
  {
    key: "joynAcademy",
    icon: <LecternIcon className={classNameIcon} />,
    title: "JOYN ACADEMY",
  },
  {
    key: "lideres",
    icon: <ChalkboardIcon className={classNameIcon} />,
    title: "OS Líderes",
  },
  {
    key: "eventos",
    icon: <CalendarDotsIcon className={classNameIcon} />,
    title: "OS EVENTOS",
  },
];

export const HomepageTemplate = ({ children }: TemplateProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const xParam = searchParams?.get("screen");

  return (
    <div className="grid grid-flow-row auto-rows-max gap-20 pb-40 sm:pb-16 py-10 sm:py-16 sm:min-h-[90vh] content-between">
      <div className="grid row-span-4 2xl:row-span-8">{children}</div>
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, i) => {
          const isActive = xParam === homePageScreens[card.key];
          return (
            <motion.div
              key={card.key}
              initial={{ y: -25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 25, opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5 * i + 1,
                ease: "easeOut",
              }}
              role="button"
              className="overflow-hidden cursor-pointer active:scale-[99%] hover:shadow-lg"
              onClick={() => {
                router.push(`/?screen=${homePageScreens[card.key]}`);
              }}
            >
              <Card
                className={`flex items-center relative
                                w-full group p-4 pr-8 transition-all duration-300 rounded-sm
                                ${
                                  isActive
                                    ? "bg-secondary text-white shadow-lg"
                                    : ""
                                }
                            `}
              >
                <div className="flex items-center gap-2">
                  {card.icon}
                  <h1 className="uppercase font-semibold">{card.title}</h1>

                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
      <div className="grid sm:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
};
