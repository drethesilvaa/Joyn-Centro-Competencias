import { useQuery } from "@tanstack/react-query";
import client from "../../../../tina/__generated__/client";

export const useArtigoByFilename = (filename: string) => {
    return useQuery({
        queryKey: ["artigo", filename],
        queryFn: async () => {
            const relativePath = `${filename}.md`;
            const res = await client.queries.artigos({
                relativePath: relativePath
            });
            return res.data.artigos;
        },
        enabled: !!filename,
    });
};