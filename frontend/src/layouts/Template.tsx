import { ReactNode } from "react"
import Navbar from "../components/Navbar"
import { AppProgressBar } from "@/components/AppProgressBar"


interface TemplateProps {
    children: ReactNode
}

export const Template = ({ children }: TemplateProps) => {

    return (
        <div className="bg-gradient-to-bl from-[#FCFCFC] to-[#F4F4F6] min-h-screen pt-10">
            <AppProgressBar />
            <div className="custom-container">
                <header>
                    <Navbar />
                </header>
                <main>{children}</main>
                {/* <footer>TODO: Add footer content here</footer> */}
            </div>
        </div>
    )
}