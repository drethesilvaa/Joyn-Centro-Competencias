import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

type Mentor = {
  image: string;
  text: string;
  subtitle?: string;
};

type MentorCardProps = {
  mentor: Mentor;
  classNamesForCards: string[];
  k: number;
};

export default function MentorCard({
  mentor,
  classNamesForCards,
  k,
}: MentorCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      key={k}
      className={`perspective h-full grid justify-items-center gap-2 text-white`}
    >
      <motion.div
        className={`relative w-full h-full py-6 px-2 lg:py-4 rounded-4xl shadow-lg ${classNamesForCards[k]} cursor-pointer `}
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onClick={() => setFlipped(!flipped)}
      >
        {/* Front Side */}
        <div className={`inset-0 backface-hidden grid justify-items-center justify-center items-center gap-2 h-full hover:scale-[102%] transition-transform  `}>
          <div className={`relative h-full w-full min-w-[134px] min-h-[134px] aspect-auto rounded-2xl overflow-hidden `}>
            <Image
              src={mentor?.image || ""}
              alt={`${mentor?.text} photo`}
              className="object-contain rounded-2xl"
              fill
            />
          </div>
          <div className="grid gap-1 text-center">
            <h1 className="heading-3xl font-semibold">{mentor?.text}</h1>
          </div>
        </div>

        {/* Back Side */}
        <div className={`absolute inset-0 backface-hidden rotate-y-180 grid justify-items-center gap-2 rounded-2xl p-4`}>
          <h1 className="heading-xl font-semibold">Mais Informação</h1>
          <p className="text-lg text-white">
            {mentor?.subtitle || "No additional info"}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
