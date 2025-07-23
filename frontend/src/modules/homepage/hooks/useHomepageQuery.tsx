import { useQuery } from "@tanstack/react-query";
import { HomepageData } from "@/types/homepage";


const fetchHomepage = async (): Promise<HomepageData> => {
    const response = await fetch('/api/homepage');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};


export const useHomepageQuery = () =>
    useQuery({
        queryKey: ["homepage"],
        queryFn: fetchHomepage,
    });
