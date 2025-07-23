import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useHomepageData } from "@/providers/HomepageDataProvider";
import { Button } from "antd";
import Image from "next/image";
import { ReactNode } from "react"
import { motion } from "framer-motion";
interface TemplateProps {

}

export const HomepageEventos = ({ }: TemplateProps) => {
    const { data, isLoading, error } = useHomepageData();

    const imagesConfig = [
        {
            width: 216,
            height: 323,
            className: "flex justify-end"
        },
        {
            width: 238,
            height: 220,
            className: "flex items-end"
        },
        {
            width: 193,
            height: 150,
            className: "flex justify-end items-start"
        },
        {
            width: 262,
            height: 347,
            className: ""
        }
    ]

    return <>
        <div className="grid lg:grid-cols-2 items-center custom-gap-6  ">
            <div>
                <h2 className="heading-6xl italic">Os Eventos</h2>
                <div className="mt-4">
                    <MarkdownRenderer content={data?.eventos?.text || ""} />
                </div>
                <div className="hidden lg:block mt-4">
                    <Button className="uppercase" size='large' type="primary">{data?.eventos?.ctaText}</Button>
                </div>
            </div>
            <div className="grid grid-cols-2 custom-gap-6">
                {data?.eventos?.images?.map((img, k) => (
                    <div className={`${imagesConfig[k].className}`} key={k}>
                        <Image
                            width={imagesConfig[k].width}
                            height={imagesConfig[k].height}
                            className={`object-cover rounded-2xl `}
                            src={img?.src || ""}
                            alt={`${img?.alt} photo`}
                        />
                    </div>
                ))}
            </div>
            <div className="block lg:hidden mt-4">
                <Button className="uppercase" size='large' type="primary">{data?.eventos?.ctaText}</Button>
            </div>
        </div>
    </>
}