import { useQuery } from "@tanstack/react-query";
import { client } from "../../../../tina/__generated__/client";

export const usePageMentoresQuery = () =>
    useQuery({
        queryKey: ["mentores page"],
        queryFn: async () => {
            const res = await client.queries.mentores({ relativePath: "mentores.json" });

            const data = res.data.mentores;

            return data;
        },
    });
