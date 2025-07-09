import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Dialog from "@/components/Dialog";
import { Button, Progress } from "antd";
import { createTransition } from "@/utils/createTransition";

interface Person {
  name: string;
  email: string;
  stack: {
    name: string;
    percent: number;
  }[];
  photo: string;
  description: string;
}

interface MentorCardProps {
  person: Person;
  isLeader: boolean;
}

const MentorCard: React.FC<MentorCardProps> = ({ person, isLeader }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <motion.div
        className="flip-image rounded-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.95 }}
        initial={{ width: 0, height: 0 }}
        whileInView={{
          width: isLeader ? 250 : 200,
          height: isLeader ? 250 : 200,
          transition: createTransition(0.2)
        }}
        viewport={{ once: true, amount: 0.3 }}
        animate={{
          scale: !isFlipped ? [1, 1.02, 1] : 1,
          boxShadow: !isFlipped
            ? [
                "0 0 0 0 rgba(62, 144, 190, 0.7)",
                "0 0 0 10px rgba(62, 144, 190, 0)",
                "0 0 0 0 rgba(62, 144, 190, 0)",
              ]
            : "0 0 0 0 rgba(62, 144, 190, 0)",
        }}
        transition={{
          duration: 2,
          repeat: !isFlipped ? Infinity : 0,
          ease: "easeInOut",
        }}
        style={{
          width: isLeader ? 250 : 200,
          height: isLeader ? 250 : 200,
        }}
      >
        <motion.div
          className={`flip-image-inner ${isFlipped ? "flipped" : ""}`}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flip-image-front">
            <Image
              src={person.photo}
              alt={`${person.name} photo`}
              width={isLeader ? 250 : 200}
              height={isLeader ? 250 : 200}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flip-image-back rounded-full">
            <div className="back-content">
              <h3>{person.name}</h3>
              <p>{person.email}</p>
              {!isLeader && (
                <Button onClick={openModal} className="read-more-btn">
                  Read More
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <Dialog isOpen={isModalOpen} onClose={closeModal}>
        <div className="grid gap-6">
          <div className="flex gap-6">
            <div className="relative mb-5">
              <Image
                width={200}
                height={200}
                src={person.photo}
                alt="photo"
                className="rounded-lg"
              />
            </div>
            <div className="w-full grid gap-4">
              <div className="grid items-center">
                <p className="heading-2xl font-bold">{person.name}</p>
                <p>{person.email}</p>
              </div>
              <div className="grid gap-1">
                {person?.stack &&
                  person?.stack?.map((stack, k) => (
                    <div className="grid grid-cols-3 gap-2" key={k}>
                      <p>{stack.name}</p>
                      <Progress
                        className="col-span-2"
                        strokeColor={`var(--color-accent)`}
                        showInfo={false}
                        percent={stack.percent}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <motion.div
            className="bg-gradient-to-r bg-box-grey  p-4 rounded-xl shadow-xl relative"
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <p className="font-medium italic">
              Estou disponivel para ajudar em {person.description}
            </p>
            {/* Triangle pointer */}
            <div className="absolute -top-2 left-6 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-box-grey shadow-xl"></div>
          </motion.div>
          {/* Additional person details can be added here */}
        </div>
      </Dialog>
    </div>
  );
};

export default MentorCard;
