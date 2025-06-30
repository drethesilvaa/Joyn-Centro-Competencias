import { useQuery } from "@tanstack/react-query";
import { client } from "../../../../tina/__generated__/client";

export const usePageArtigosQuery = () =>
    useQuery({
        queryKey: ["artigos page"],
        queryFn: async () => {
            const res = await client.queries.pageArtigos({ relativePath: "pageArtigos.json" });

            const data = res.data.pageArtigos;

            return data;
        },
    });
