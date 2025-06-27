import * as PhosphorIcons from "phosphor-react";

interface ObjectivesProps {
    content: any
}

export const Objectives = ({ content }: ObjectivesProps) => {

    return (
        <>
            <h2 className="heading-5xl font-semibold">Objetivos</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {content?.topics?.map((topic: any, key:any) => {
                    const iconName = topic?.iconName;
                    let Icon = PhosphorIcons.Question;

                    if (
                        typeof iconName === "string" &&
                        iconName in PhosphorIcons
                    ) {
                        Icon = (PhosphorIcons as any)[iconName];
                    }
                    return (
                        <div className="grid gap-3 p-3 bg-white shadow-sm rounded-md justify-items-start" key={key}>
                            <div>
                                <span className="flex items-center p-2 bg-secondary text-white rounded-xl">
                                    <Icon size={24} />
                                </span>
                            </div>
                            <p className="body-xl">{topic?.description}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}