import { ReactNode } from "react"
import Image from "next/image"
import MarkdownRenderer from "@/components/MarkdownRenderer"
import { ProcessedEvent } from "@/types/events"
import { EventsList } from "@/modules/eventos/components/event-list"
import { motion } from 'framer-motion'

interface TemplateProps {
    children: ReactNode,
    pageTitle: string,
    pageDescription: string,
    pageImage: string,
    pageImageAlt: string,
    events?: { nextEvents: ProcessedEvent[], handleSignUp: any }
}

const titleVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" as const }
    }
};

const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.2, ease: "easeOut" as const }
    }
};

export const PagesLayout = ({ children, pageTitle, pageDescription, pageImage, pageImageAlt, events }: TemplateProps) => {
    return (
        <div className="min-h-[90vh] grid content-between py-16">
            <div className="custom-gap-6 relative 2xl:grid 2xl:grid-cols-12">
                {/* Title - responsive positioning */}
                {pageTitle && (
                    <motion.div
                        className="mb-6 2xl:mb-0 2xl:col-span-4 2xl:max-w-none"
                        variants={titleVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="heading-6xl font-bold max-w-md ">{pageTitle}</h1>
                    </motion.div>
                )}

                {/* Content container - responsive layout */}
                <motion.div
                    className="p-6 bg-box-grey rounded-2xl 2xl:col-span-11"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                    >
                        <Image
                            width={654}
                            height={435}
                            className="object-cover w-[35vw] max-w-[400px] rounded-2xl
                                      float-right ml-6 mb-4
                                      2xl:absolute 2xl:top-0 2xl:right-0 2xl:float-none 2xl:ml-0 2xl:mb-0 2xl:max-w-[30vw] brightness-90"
                            src={pageImage || ""}
                            alt={`${pageImageAlt} photo`}
                        />
                    </motion.div>

                    {pageDescription && (
                        <motion.div
                            className="body-xl 2xl:max-w-1/2 markdown-style"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <MarkdownRenderer content={pageDescription || ""} />
                        </motion.div>
                    )}

                    {events && events.nextEvents?.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <h3 className="text-xl font-semibold">
                                Próximo Evento:
                            </h3>
                            <div className="float-left 2xl:float-none 2xl:max-w-1/2">
                                <EventsList
                                    events={events.nextEvents}
                                    onSignUp={events.handleSignUp}
                                />
                            </div>
                        </motion.div>
                    )}
                    <div className="clear-both 2xl:hidden"></div>
                </motion.div>
            </div>

            {children}
        </div>
    )
}