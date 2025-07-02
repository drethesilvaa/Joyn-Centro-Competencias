import { Gamification } from "@/types/gamification";
import { useQuery } from "@tanstack/react-query";


const fetchGamification = async (): Promise<Gamification> => {
    const response = await fetch('/api/gamification');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};


export const useGamificationQuery = () =>
    useQuery({
        queryKey: ["Gamification"],
        queryFn: fetchGamification,
    });
