import { useQuery } from "@tanstack/react-query";

export const usePageMentoresQuery = () =>
    useQuery({
        queryKey: ["mentores page"],
        queryFn: async () => {
            // const res = await client.queries.mentores({ relativePath: "mentores.json" });

            // const data = res.data.mentores;

            return null;
        },
    });
