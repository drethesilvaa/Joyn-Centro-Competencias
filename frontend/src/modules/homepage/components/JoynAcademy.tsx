import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useHomepageData } from "@/providers/HomepageDataProvider";
import { Button } from "antd";
import { ReactNode } from "react"
import * as PhosphorIcons from "phosphor-react";

interface TemplateProps {
}

export const HomepageJoynAcademy = ({ }: TemplateProps) => {
    const { data, isLoading, error } = useHomepageData();


    return <>
        <div className="grid lg:grid-cols-2 items-center gap-6 h-full ">
            <div>
                <h2 className="heading-6xl italic">Joyn Academy</h2>
                <div className="mt-4">
                    <MarkdownRenderer content={data?.joynAcademy?.text || ""} />
                </div>
                <div className="hidden lg:block mt-4">
                    <Button onClick={() => {
                        window.open("https://academy.joyn-group.com/login/index.php", '_blank')
                    }} className="uppercase" size='large' type="primary">{data?.joynAcademy?.ctaText}</Button>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                {data?.joynAcademy?.topics?.map((topic, k) => {
                    const iconName = topic?.iconName;
                    let Icon = PhosphorIcons.Question;

                    if (
                        typeof iconName === "string" &&
                        iconName in PhosphorIcons
                    ) {
                        Icon = (PhosphorIcons as any)[iconName];
                    }

                    return (
                        <div key={k} className="flex gap-4 items-center">
                            <span className="flex items-center p-2 bg-secondary text-white rounded-xl">
                                <Icon size={24} />
                            </span>
                            <p className="uppercase">{topic?.text}</p>
                        </div>
                    );
                })}
            </div>
            <div className="block lg:hidden mt-4">
                <Button className="uppercase" size='large' type="primary">{data?.joynAcademy?.ctaText}</Button>
            </div>
        </div>
    </>
}