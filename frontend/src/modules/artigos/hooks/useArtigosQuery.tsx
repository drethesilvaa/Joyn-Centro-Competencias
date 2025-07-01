import { useInfiniteQuery } from "@tanstack/react-query";
import { client } from "../../../../tina/__generated__/client";

export const useArtigosInfiteQuery = (limit = 10) => {
    return useInfiniteQuery({
        queryKey: ["artigos-infinite", limit],
        queryFn: async ({ pageParam = "" }) => {
            try {
                const res = await client.queries.artigosConnection({
                    first: limit,
                    after: pageParam
                });

                return {
                    data: res?.data?.artigosConnection?.edges?.map(edge => edge?.node),
                    nextCursor: res.data.artigosConnection.pageInfo.hasNextPage
                        ? res.data.artigosConnection.pageInfo.endCursor
                        : undefined,
                    hasNextPage: res.data.artigosConnection.pageInfo.hasNextPage
                };
            } catch (error) {
                console.error("artigosConnection not available, falling back to manual pagination");
                throw error;
            }
        },
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialPageParam: "",
    });
};
