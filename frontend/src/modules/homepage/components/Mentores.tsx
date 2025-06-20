import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useHomepageData } from "@/providers/HomepageDataProvider";
import { Button } from "antd";
import Image from "next/image";
import { ReactNode } from "react"

interface TemplateProps {
}

export const HomepageMentores = ({ }: TemplateProps) => {
    const { data, isLoading, error } = useHomepageData();

    const classNamesForCards = ["bg-primary lg:mb-10", "bg-accent lg:mt-10"]


    return <div>
        <div className="grid lg:grid-cols-2 items-center custom-gap-6 h-full">
            <div>
                <h2 className="heading-6xl italic">Os Mentores</h2>
                <div className="mt-4">
                    <MarkdownRenderer content={data?.mentores?.text || ""} />
                </div>
                <div className="hidden lg:block mt-4">
                    <Button size='large' type="primary">{data?.mentores?.ctaText}</Button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 items-stretch custom-gap-6">
                {data?.mentores?.mentors?.map((mentor, k) => (
                    <div key={k} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 justify-items-center gap-2 ${classNamesForCards[k]} text-white py-6 px-6 lg:py-4 rounded-2xl`}>
                        <div className="relative aspect-square">
                            <Image width={262} height={262} className="object-cover rounded-2xl" src={mentor?.image || ""} alt={`${mentor?.text} photo`} />
                        </div>
                        <div className="grid gap-1 text-center sm:text-left lg:text-center">
                            <h1 className="heading-3xl font-semibold">{mentor?.text}</h1>
                            <p className="heading-xl">{mentor?.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="block lg:hidden mt-4">
                <Button size='large' type="primary">{data?.mentores?.ctaText}</Button>
            </div>
        </div>
    </div>
}