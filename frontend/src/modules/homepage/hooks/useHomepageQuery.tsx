import { useQuery } from "@tanstack/react-query";
import { client } from "../../../../tina/__generated__/client";

export const useHomepageQuery = () =>
    useQuery({
        queryKey: ["homepage"],
        queryFn: async () => {
            const res = await client.queries.homepage({ relativePath: "home.json" });
            return res.data.homepage;
        },
    });
