"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { JSX } from "react";
import { homePageScreens } from "../data/homepage-screens";
import { cardData } from "../layouts/Template";
import { AnimatePresence, motion } from "framer-motion";

interface BottomNavigationProps {}

export const BottomNavigation = ({}: BottomNavigationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const xParam = searchParams?.get("screen");

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        role="navigation"
        className="fixed sm:hidden bottom-0 left-0 right-0 bg-white px-2 py-2 flex justify-evenly gap-2 custom-shadow-box"
      >
        {cardData.map((item, k) => {
          const isActive = xParam === homePageScreens[item.key];

          return (
            <div
              role="button"
              key={k}
              className={`grid items-center justify-center justify-items-center rounded-xl p-2 ${
                isActive ? "bg-secondary text-white" : ""
              }`}
              onClick={() => {
                router.push(`/?screen=${homePageScreens[item.key]}`);
              }}
            >
              {item.icon}
              {/* <p className="text-sm text-center">{item.title}</p> */}
            </div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};
