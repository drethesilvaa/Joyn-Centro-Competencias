import { Transition } from "framer-motion";

export const createTransition = (delay: number = 0): Transition => ({
  duration: 0.5,
  delay: delay,
  ease: "easeOut" as const,
});
