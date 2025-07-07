import { ReactNode } from "react"
import Image from "next/image"
import MarkdownRenderer from "@/components/MarkdownRenderer"
import { ProcessedEvent } from "@/types/events"
import { EventsList } from "@/modules/eventos/components/event-list"


interface TemplateProps {
    children: ReactNode,
    pageTitle: string,
    pageDescription: string,
    pageImage: string,
    pageImageAlt: string,
    events?: { nextEvents: ProcessedEvent[], handleSignUp: any }
}

export const PagesLayout = ({ children, pageTitle, pageDescription, pageImage, pageImageAlt, events }: TemplateProps) => {

    console.log(events)
    return (
        <div className="min-h-[90vh] grid content-between py-16">
            <div className="custom-gap-6 relative 2xl:grid 2xl:grid-cols-12">
                {/* Title - responsive positioning */}
                {pageTitle && (
                    <div className="mb-6 2xl:mb-0 2xl:col-span-4 2xl:max-w-none">
                        <h1 className="heading-6xl font-bold max-w-md ">{pageTitle}</h1>
                    </div>
                )}

                {/* Content container - responsive layout */}
                <div className="p-6 bg-box-grey rounded-2xl 2xl:col-span-11 ">
                    <Image
                        width={654}
                        height={435}
                        className="object-cover w-[35vw] max-w-[400px] rounded-2xl 
                                 float-right ml-6 mb-4 
                                 2xl:absolute 2xl:top-0 2xl:right-0 2xl:float-none 2xl:ml-0 2xl:mb-0 2xl:max-w-[30vw] brightness-90"
                        src={pageImage || ""}
                        alt={`${pageImageAlt} photo`}
                    />
                    {pageDescription && (
                        <div className="body-xl 2xl:max-w-1/2 markdown-style ">
                            <MarkdownRenderer content={pageDescription || ""} />
                        </div>
                    )}

                    {events && events.nextEvents?.length > 0 && (
                        <>
                            <h3 className="text-xl font-semibold">
                                Próximo Evento:
                            </h3>
                            <div className="float-left 2xl:float-none 2xl:max-w-1/2">
                                <EventsList
                                    events={events.nextEvents}
                                    onSignUp={events.handleSignUp}
                                />
                            </div>
                        </>
                    )}
                    <div className="clear-both 2xl:hidden"></div>
                </div>
            </div>

            {children}
        </div>
    )
}