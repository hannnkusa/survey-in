import { callAPI } from "@/services/api";
import { ResponseUI } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";

// USERS

export const getMusicGenreList = async () => {
  const res = await callAPI({
    path: `/music-genre`,
    method: "GET",
  });

  return res.data;
};

export const useMusicGenreList = () => {
  return useQuery<ResponseUI>({
    queryKey: ["music-genre"],
    queryFn: () => getMusicGenreList(),
    keepPreviousData: false,
  });
};
