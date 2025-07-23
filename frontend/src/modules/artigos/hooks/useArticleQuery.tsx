import { Article } from "@/types/articles";
import { useQuery } from "@tanstack/react-query";

const fetchArticle = async (slug: string): Promise<Article> => {
    const response = await fetch(`/api/articles/${slug}`);
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Article not found');
        }
        throw new Error(`Failed to fetch article: ${response.statusText}`);
    }
    return response.json();
};

export const useArticleQuery = (slug: string) =>
    useQuery({
        queryKey: ["article", slug],
        queryFn: () => fetchArticle(slug),
        enabled: !!slug, // Only run if slug is provided
        staleTime: 10 * 60 * 1000, // 10 minutes
    });