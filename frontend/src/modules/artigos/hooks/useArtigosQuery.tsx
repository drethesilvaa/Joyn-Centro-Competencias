import { ArticlesListResponse } from "@/types/articles";
import { useQuery } from "@tanstack/react-query";

const fetchArticles = async (): Promise<ArticlesListResponse> => {
    const response = await fetch('/api/articles');
    if (!response.ok) {
        throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }
    return response.json();
};

export const useArtigosQuery = () =>
    useQuery({
        queryKey: ["articles"],
        queryFn: fetchArticles,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
