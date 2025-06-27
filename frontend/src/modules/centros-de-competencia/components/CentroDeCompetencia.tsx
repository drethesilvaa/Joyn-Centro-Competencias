import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getPhosphorIcon } from "@/utils/getPhosphorIcon";
import { ArrowRightIcon, GraduationCapIcon, MegaphoneIcon, QuotesIcon, UsersThreeIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "antd";
import { Fragment } from "react";

interface ObjectivesProps {
    content: any
}

interface learningtype {
    title: string;
    description?: string | null;
    topics?: Array<{
        topicTitle: string;
        topicDetails?: Array<{
            iconName: string;
            description?: string | null;
            url?: string | null;
        } | null> | null;
    } | null> | null;
}

interface topic {
    iconName: string;
    title: string;
}


export const CentroDeCompetencia = ({ content }: ObjectivesProps) => {
    console.log(content)
    return (
        <>
            <h2 className="heading-5xl font-semibold">{content.title}</h2>
            <div className="mt-6 grid gap-16">
                <div className="flex gap-6 items-start">
                    <div>
                        <QuotesIcon weight="fill" size={65} />
                    </div>
                    <div className="body-xl">
                        <MarkdownRenderer content={content.description || ""} />
                    </div>
                </div>
                <div className="flex gap-6 items-start">
                    <div>
                        <GraduationCapIcon weight="fill" size={65} />
                    </div>
                    <div className="grid gap-12">
                        {content?.learning?.map((l: learningtype) => (
                            <div className="grid gap-6">
                                <h3 className="heading-3xl font-semibold">{l.title}</h3>
                                {l.description && <MarkdownRenderer content={l.description || ""} />}
                                {l.topics && l.topics?.length > 0 && (
                                    <ul>
                                        {l.topics.map((topic) => (
                                            <Fragment key={topic?.topicTitle}>
                                                <li className="font-semibold mt-6">{topic?.topicTitle}</li>
                                                <div className="flex gap-6 py-6 justify-evenly">
                                                    {topic?.topicDetails?.map((detail) => {
                                                        const Icon = getPhosphorIcon(detail?.iconName);
                                                        return (
                                                            <div className="grid items-start justify-items-center gap-3">
                                                                <Icon size={32} weight="bold" />
                                                                <p className="text-center">{detail?.description}</p>
                                                                {detail?.url && <Button color="primary" variant="solid" icon={<ArrowRightIcon />} />}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </Fragment>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-6 items-start">
                    <div>
                        <MegaphoneIcon weight="fill" size={65} />
                    </div>
                    <div className="grid gap-3">
                        <h3 className="heading-3xl font-semibold">Feedback & Melhoria Contínua</h3>
                        {content.feedback?.description && <MarkdownRenderer content={content.feedback?.description || ""} />}
                        <div className="grid gap-6">
                            {content.feedback?.topics?.map((topic: topic) => {
                                const Icon = getPhosphorIcon(topic?.iconName);

                                return (
                                    <div className="flex gap-3 rounded-md items-center" key={topic.title}>
                                        <div>
                                            <span className="flex items-center p-2 bg-accent text-white rounded-xl">
                                                <Icon size={24} />
                                            </span>
                                        </div>
                                        <p className="body-xl">{topic?.title}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex gap-6 items-start">
                    <div>
                        <UsersThreeIcon weight="fill" size={65} />
                    </div>
                    <div className="grid gap-3">
                        <h3 className="heading-3xl font-semibold">Incentivos & Envolvimento da Comunidade</h3>
                        {content.incentivos?.description && <MarkdownRenderer content={content.incentivos?.description || ""} />}
                        <div className="grid gap-6">
                            {content.incentivos?.topics?.map((topic: topic) => {
                                const Icon = getPhosphorIcon(topic?.iconName);

                                return (
                                    <div className="flex gap-3 rounded-md items-center" key={topic.title}>
                                        <div>
                                            <span className="flex items-center p-2 bg-accent text-white rounded-xl">
                                                <Icon size={24} />
                                            </span>
                                        </div>
                                        <p className="body-xl">{topic?.title}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {/* {content?.topics?.map((topic: any) => {
                    const iconName = topic?.iconName;
                    let Icon = PhosphorIcons.Question;

                    if (
                        typeof iconName === "string" &&
                        iconName in PhosphorIcons
                    ) {
                        Icon = (PhosphorIcons as any)[iconName];
                    }
                    return (
                        <div className="grid gap-3 p-3 bg-white shadow-sm rounded-md justify-items-start">
                            <div>
                                <span className="flex items-center p-2 bg-secondary text-white rounded-xl">
                                    <Icon size={24} />
                                </span>
                            </div>
                            <p className="body-xl">{topic?.description}</p>
                        </div>
                    )
                })} */}
            </div>
        </>
    )
}