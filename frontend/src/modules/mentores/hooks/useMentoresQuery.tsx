import { CentrosDeCompetenciaData } from "@/types/mentores";
import { useQuery } from "@tanstack/react-query";


const fetchMentores = async (): Promise<CentrosDeCompetenciaData> => {
    const response = await fetch('/api/mentores');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};


export const useMentoresQuery = () =>
    useQuery({
        queryKey: ["mentores"],
        queryFn: fetchMentores,
    });
