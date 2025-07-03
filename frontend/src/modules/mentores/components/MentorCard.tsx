import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Dialog from '@/components/Dialog';

interface Person {
    name: string;
    role: string;
    photo: string;
    bio: string;
}

interface MentorCardProps {
    person: Person;
    isLeader: boolean;
}

const MentorCard: React.FC<MentorCardProps> = ({ person, isLeader }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const openModal = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent flip when clicking the button
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <motion.div
                className="flip-image rounded-full"
                onHoverStart={handleFlip}
                onHoverEnd={handleFlip}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    scale: (!isFlipped && !isHovered) ? [1, 1.02, 1] : 1,
                    // boxShadow: (!isFlipped && !isHovered) ? [
                    //     "0 0 0 0 rgba(62, 144, 190, 0.7)",
                    //     "0 0 0 10px rgba(62, 144, 190, 0)",
                    //     "0 0 0 0 rgba(62, 144, 190, 0)"
                    // ] : "0 0 0 0 rgba(62, 144, 190, 0)"
                }}
                transition={{
                    duration: 2,
                    repeat: (!isFlipped && !isHovered) ? Infinity : 0,
                    ease: "easeInOut"
                }}
                style={{
                    width: isLeader ? 250 : 200,
                    height: isLeader ? 250 : 200,
                }}
            >
                <motion.div
                    className={`flip-image-inner ${isFlipped ? 'flipped' : ''}`}
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
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className="flip-image-back rounded-full">
                        <div className="back-content">
                            <h3>{person.name}</h3>
                            <p>{person.role}</p>
                            <button onClick={openModal} className="read-more-btn">
                                Read More
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <Dialog
                isOpen={isModalOpen}
                onClose={closeModal}
                title={person.name}
            >
                <div>
                    <p>{person.bio}</p>
                    {/* Additional person details can be added here */}
                </div>
            </Dialog>
        </div>
    );
};

export default MentorCard;