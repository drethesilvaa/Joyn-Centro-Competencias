import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from '@phosphor-icons/react/dist/ssr';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    {/* Dialog Content */}
                    <motion.div
                        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300,
                            duration: 0.4
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        {title ? (
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {title}
                                </h2>
                                <motion.button
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    onClick={onClose}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <XIcon className="w-6 h-6 text-gray-500" />
                                </motion.button>
                            </div>
                        ) : <motion.button
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors absolute right-1 top-1"
                            onClick={onClose}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <XIcon className="w-4 h-4 text-gray-500" />
                        </motion.button>}

                        {/* Dialog Body */}
                        <div className="p-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                            >
                                {children}
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
export default Dialog;