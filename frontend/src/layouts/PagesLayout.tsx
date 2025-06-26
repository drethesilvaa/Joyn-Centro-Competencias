import { ReactNode } from "react"
import Navbar from "../components/Navbar"
import { AppProgressBar } from "@/components/AppProgressBar"
import Image from "next/image"
import MarkdownRenderer from "@/components/MarkdownRenderer"


interface TemplateProps {
    children: ReactNode,
    pageTitle: string,
    pageDescription: string,
    pageImage: string,
    pageImageAlt: string,
}

export const PagesLayout = ({ children, pageTitle, pageDescription, pageImage, pageImageAlt }: TemplateProps) => {

    return (
        <div className="min-h-[90vh] grid content-between py-16">
            <div className="custom-gap-6 relative 2xl:grid 2xl:grid-cols-12">
                {/* Title - responsive positioning */}
                <div className="mb-6 2xl:mb-0 2xl:col-span-4 2xl:max-w-none">
                    <h1 className="heading-6xl font-bold max-w-md ">{pageTitle}</h1>
                </div>

                {/* Content container - responsive layout */}
                <div className="p-6 bg-box-grey rounded-2xl 2xl:col-span-11 ">
                    <Image
                        width={654}
                        height={435}
                        className="object-cover w-[35vw] max-w-[400px] rounded-2xl 
                                 float-right ml-6 mb-4 
                                 2xl:absolute 2xl:top-0 2xl:right-0 2xl:float-none 2xl:ml-0 2xl:mb-0 2xl:max-w-none brightness-90"
                        src={pageImage || ""}
                        alt={`${pageImageAlt} photo`}
                    />
                    <div className="body-2xl 2xl:max-w-1/2">
                        <MarkdownRenderer content={pageDescription || ""} />
                    </div>
                    <div className="clear-both 2xl:hidden"></div>
                </div>
            </div>

            {children}
        </div>
    )
}