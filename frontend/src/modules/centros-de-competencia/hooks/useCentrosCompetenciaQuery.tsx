import { CompetenciasData } from '@/types/competencias';
import { useQuery } from '@tanstack/react-query';

const fetchCompetencias = async (): Promise<CompetenciasData> => {
    const response = await fetch('/api/competencias');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const useCentrosCompetenciaQuery = () =>
    useQuery({
        queryKey: ["centros-de-competencia"],
        queryFn: fetchCompetencias,
        staleTime: 5 * 60 * 1000,
    });
