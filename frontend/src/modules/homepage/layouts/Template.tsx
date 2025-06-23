"use client"

import { ReactNode } from "react"
import { BrainIcon, ArrowRightIcon, LecternIcon, ChalkboardIcon, CalendarDotsIcon } from '@phosphor-icons/react/dist/ssr';
import { Button, Card } from 'antd';
import { useRouter } from "next/navigation";
import { homePageScreens } from "../data/homepage-screens";
import { useSearchParams } from "next/navigation";

interface TemplateProps {
    children: ReactNode
}

const cardData = [
    {
        key: "centros",
        icon: <BrainIcon size={32} />,
        title: "Os Nossos Centros",
    },
    {
        key: "joynAcademy",
        icon: <LecternIcon size={32} />,
        title: "JOYN ACADEMY",
    },
    {
        key: "lideres",
        icon: <ChalkboardIcon size={32} />,
        title: "OS Líderes",
    },
    {
        key: "eventos",
        icon: <CalendarDotsIcon size={32} />,
        title: "OS EVENTOS",
    },
];

export const HomepageTemplate = ({ children }: TemplateProps) => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const xParam = searchParams?.get('screen');

    return (
        <div className='grid grid-flow-row auto-rows-max gap-20 py-16 min-h-[90vh] content-between'>
            <div className="grid row-span-6 2xl:row-span-8">
                {children}
            </div>
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {cardData.map(card => {
                    const isActive = xParam === homePageScreens[card.key];
                    return (
                        <Card
                            key={card.key}
                            className={`flex items-center relative
                                w-full group p-4 pr-8 transition-all duration-300 rounded-sm
                                ${isActive ? "bg-secondary text-white shadow-lg" : ""}
                            `}
                        >
                            <div className="flex items-center gap-2">
                                {card.icon}
                                <h1 className="uppercase font-semibold">{card.title}</h1>

                                <div className="
                                    absolute w-full z-10 right-0
                                    opacity-0 max-h-0 overflow-hidden 
                                    group-hover:opacity-100 group-hover:max-h-40
                                    transition-all duration-300 px-4
                                ">
                                    <div className='flex justify-end'>
                                        <Button
                                            icon={<ArrowRightIcon />}
                                            onClick={() => router.push(`/?screen=${homePageScreens[card.key]}`)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    )
}
