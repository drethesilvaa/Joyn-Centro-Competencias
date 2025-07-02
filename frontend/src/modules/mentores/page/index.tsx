"use client"

import { PagesLayout } from "@/layouts/PagesLayout"
import { usePageMentoresQuery } from "../hooks/usePageMentoresQuery"

export const MentoresPage = () => {

    const { data: pageMentores, isLoading } = usePageMentoresQuery()

    return (
        <></>
        // <PagesLayout
        //     pageTitle={pageMentores?.pageTitle || ""}
        //     pageDescription={pageMentores?.pageDescription || ""}
        //     pageImage={pageMentores?.pageImage || ""}
        //     pageImageAlt={pageMentores?.pageImageAlt || ""}
        // >
        //     <></>

        // </PagesLayout>
    )
}