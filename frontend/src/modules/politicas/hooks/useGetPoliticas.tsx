import { useQuery } from "@tanstack/react-query";

const fetchPoliticas = async (): Promise<string> => {
    const response = await fetch('/api/politicas');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.text();
};

export const useGetPoliticas = () =>
    useQuery({
        queryKey: ["politicas page"],
        queryFn: fetchPoliticas,
    });
