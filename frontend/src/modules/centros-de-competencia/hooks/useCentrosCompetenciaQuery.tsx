import { useQuery } from "@tanstack/react-query";
import { client } from "../../../../tina/__generated__/client";

export const useCentrosCompetenciaQuery = () =>
    useQuery({
        queryKey: ["centros-de-competencia"],
        queryFn: async () => {
            const res = await client.queries.centrosDeCompetencia({ relativePath: "centros.json" });

            const data = res.data.centrosDeCompetencia;

            return data;
        },
    });
