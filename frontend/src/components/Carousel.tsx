"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";

export default function Carousel({
  slides,
  auto = true,
  className = "",
}: {
  slides: ReactNode[];
  auto?: boolean;
  className?: string;
}) {
  const slideVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: i * 0.1,
      },
    }),
  };

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay, Navigation]}
        loop
        autoplay={auto ? { delay: 3500, disableOnInteraction: true } : false}
        className="mySwiper pb-10"
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
        }}
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index} className="pb-10">
            <motion.div
              className=""
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideVariants}
            >
              {item}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
