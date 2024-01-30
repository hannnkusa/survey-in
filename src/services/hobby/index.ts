import { callAPI } from "@/services/api";
import { ResponseUI } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";

// USERS

export const getHobbyList = async () => {
  const res = await callAPI({
    path: `/hobby`,
    method: "GET",
  });

  return res.data;
};

export const useHobbyList = () => {
  return useQuery<ResponseUI>({
    queryKey: ["hobby"],
    queryFn: () => getHobbyList(),
    keepPreviousData: false,
  });
};
