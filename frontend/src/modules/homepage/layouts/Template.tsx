"use client"

import { ReactNode } from "react"
import { BrainIcon, ArrowRightIcon } from '@phosphor-icons/react/dist/ssr';
import { Button, Card } from 'antd';
import { useRouter } from "next/navigation";
import { homePageScreens } from "../data/homepage-screens";
import { useSearchParams } from "next/navigation";

interface TemplateProps {
    children: ReactNode
}

export const HomepageTemplate = ({ children }: TemplateProps) => {

    const router = useRouter()
    const searchParams = useSearchParams();
    const xParam = searchParams?.get('screen');


    return (
        <div className='grid gap-24 min-h-[89vh] content-evenly'>
            {children}
            <div className='grid grid-cols-4  gap-6'>
                <Card className="w-full group p-4 transition-all duration-300 rounded-sm">
                    <div className="flex items-center gap-2">
                        <BrainIcon size={32} />
                        <h1 className="uppercase">Os Nossos Centros</h1>
                    </div>
                    <div className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 transition-all duration-300">
                        Card content
                        <div className='flex justify-end'>
                            <Button icon={<ArrowRightIcon />} onClick={() => router.push(`/?screen=${homePageScreens["centros"]}`)}></Button>
                        </div>
                    </div>
                </Card>
                <Card className="w-full group p-4 transition-all duration-300">
                    <div className="flex items-center gap-2">
                        <BrainIcon size={32} />
                        <h1 className="uppercase">JOYN ACADEMY</h1>
                    </div>
                    <p className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 transition-all duration-300">
                        Card content
                    </p>
                </Card>
                <Card className="w-full group p-4 transition-all duration-300">
                    <div className="flex items-center gap-2">
                        <BrainIcon size={32} />
                        <h1 className="uppercase">OS MENTORES</h1>
                    </div>
                    <p className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 transition-all duration-300">
                        Card content
                    </p>
                </Card>
                <Card className="w-full group p-4 transition-all duration-300">
                    <div className="flex items-center gap-2">
                        <BrainIcon size={32} />
                        <h1 className="uppercase">OS EVENTOS</h1>
                    </div>
                    <p className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 transition-all duration-300">
                        Card content
                    </p>
                </Card>
            </div>
        </div>
    )

}
