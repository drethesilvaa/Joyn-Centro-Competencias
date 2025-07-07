"use client"

import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useHomepageData } from "@/providers/HomepageDataProvider";
import { Button } from "antd";

interface TemplateProps {

}

export const HomepageCentros = ({ }: TemplateProps) => {

    const { data, isLoading, error } = useHomepageData();


    return <>
        <div className="grid lg:grid-cols-2 items-center custom-gap-6 h-full">
            <div>
                <h2 className="heading-6xl italic">Os Nossos Centros</h2>
                <div className="mt-4">
                    <MarkdownRenderer content={data?.centros?.text || ""} />
                </div>
                <div className="hidden lg:block mt-4">
                    <Button size='large' type="primary">{data?.centros?.ctaText}</Button>
                </div>
            </div>
            <div className="text-foreground heading-4xl uppercase lg:text-right"><MarkdownRenderer content={data?.centros?.quote || ""} /></div>
            <div className="block lg:hidden mt-4">
                <Button size='large' type="primary">{data?.centros?.ctaText}</Button>
            </div>
        </div>
    </>
}