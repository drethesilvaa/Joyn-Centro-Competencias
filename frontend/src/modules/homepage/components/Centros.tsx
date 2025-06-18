"use client"

import { useHomepageData } from "@/providers/HomepageDataProvider";

interface TemplateProps {

}

export const HomepageCentros = ({ }: TemplateProps) => {

    const { data, isLoading, error } = useHomepageData();


    return <div className="grid grid-cols-2">
        <div>  </div>
        <div>{data?.centros?.quote}</div>
    </div>
}