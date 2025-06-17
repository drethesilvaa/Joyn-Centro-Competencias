import { ReactNode } from "react"
import Navbar from "../components/Navbar"


interface TemplateProps {
    children: ReactNode
}

export const Template = ({ children }: TemplateProps) => {

    return (
        <>
            <main className="bg-linear-to-bl from-[#FCFCFC] to-[#F4F4F6] h-screen pt-10">
                <header>
                    <Navbar />
                </header>
                <section className="custom-container">{children}</section>
                <footer></footer>
            </main>
        </>
    )
}