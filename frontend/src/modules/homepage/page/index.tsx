"use client"

import { Button, Card } from 'antd';
import { HomepageTemplate } from '../layouts/Template';
import { useSearchParams } from 'next/navigation';
import { HomepageCentros } from '../components/Centros';
import { HomepageMentores } from '../components/Mentores';
import { HomepageEventos } from '../components/Eventos';
import { HomepageJoynAcademy } from '../components/JoynAcademy';
import { JSX } from 'react';
import Image from 'next/image';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { useHomepageData } from '@/providers/HomepageDataProvider';



const homePageComponents: Record<string, JSX.Element> = {
    "nossos-centros": <HomepageCentros />,
    mentores: <HomepageMentores />,
    eventos: <HomepageEventos />,
    "joyn-academy": <HomepageJoynAcademy />,
};


const Homepage = () => {


    const searchParams = useSearchParams();
    const { data, isLoading, error } = useHomepageData();

    if (isLoading) return <p>Loading...</p>;
    if (error || !data) return <p>Erro ao carregar dados</p>;

    const xParam = searchParams?.get('screen');
    const children = homePageComponents[xParam || ""];

    if (children) {
        return <HomepageTemplate>{children}</HomepageTemplate>
    }

    console.log(data)

    return (
        <HomepageTemplate>
            <div className="grid lg:grid-cols-2 custom-gap-6">
                <div className='flex flex-col custom-gap-6 justify-center'>
                    <span className='heading-6xl'><MarkdownRenderer content={data.home?.title || ""} /></span>
                    <p className=''>{data.home?.subtitle}</p>
                    <div>
                        <Button size='large' type="primary">{data.home?.ctaText}</Button>
                    </div>
                </div>
                <div className='grid grid-cols-2 custom-gap-6'>
                    <div className='grid grid-rows-9 custom-gap-6 pt-16'>
                        <Card className='row-span-5 p-0 rounded-2xl'>
                            <Image fill={true} className="object-cover rounded-2xl" src={data.home?.card1 || ""} alt='card image' />
                        </Card>
                        <Card className='row-span-4 bg-primary flex items-end p-6 rounded-2xl'>
                            <p className='text-white heading-5xl'>{data.home?.card2?.split(" ")[0]}</p>
                            <p className='text-white heading-xl'>{data.home?.card2?.split(" ")[1]}</p>
                        </Card>

                    </div>
                    <div className='grid grid-rows-9 custom-gap-6 pb-16'>
                        <Card className='row-span-4 bg-secondary flex items-end p-6 rounded-2xl'>
                            <p className='text-white heading-5xl'>{data.home?.card3?.split(" ")[0]}</p>
                            <p className='text-white heading-xl'>{data.home?.card3?.split(" ")[1]}</p>
                        </Card>
                        <Card className='row-span-5 bg-accent flex items-end p-6 text-white heading-2xl font-light rounded-2xl'>
                            <MarkdownRenderer content={data.home?.card4 || ""} />
                        </Card>
                    </div>
                </div>
            </div>
        </HomepageTemplate>
    )
}

export default Homepage