import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useHomepageData } from "@/providers/HomepageDataProvider";
import { Button } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import MentorCard from "./MentorCard";

interface TemplateProps {}

export const HomepageMentores = ({}: TemplateProps) => {
  const { data, isLoading, error } = useHomepageData();
  const { data: session, status } = useSession();
  const router = useRouter();

  const ctaButton = (
    <Button
      className="text-wrap"
      onClick={() => {
        status === "authenticated" && session?.user
          ? router.push("/mentores")
          : router.push("/auth/signin");
      }}
      size="large"
      type="primary"
    >
      {data?.mentores?.ctaText}
    </Button>
  );

  const classNamesForCards = [
    "bg-primary ",
    "bg-accent",
    "bg-[#004552]",
    "bg-[#2f3847]",
  ];

  return (
    <>
      <div className="grid lg:grid-cols-2 items-center custom-gap-6 h-full">
        <div>
          <h2 className="heading-6xl italic">Os Líderes</h2>
          <div className="mt-4">
            <MarkdownRenderer content={data?.mentores?.text || ""} />
          </div>
          <div className="hidden lg:block mt-4">{ctaButton}</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-stretch gap-4 h-full">
          {data?.mentores?.mentors?.map((mentor, k) => (
            <MentorCard
              mentor={mentor}
              key={k}
              classNamesForCards={classNamesForCards}
              k={k}
            />
          ))}
        </div>
        <div className="block lg:hidden mt-4">{ctaButton}</div>
      </div>
    </>
  );
};
