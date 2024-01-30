import { callAPI } from "@/services/api";
import { ResponseUI } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";

// USERS

export const getGenreList = async () => {
  const res = await callAPI({
    path: `/genre`,
    method: "GET",
  });

  return res.data;
};

export const useGenreList = () => {
  return useQuery<ResponseUI>({
    queryKey: ["genre"],
    queryFn: () => getGenreList(),
    keepPreviousData: false,
  });
};
