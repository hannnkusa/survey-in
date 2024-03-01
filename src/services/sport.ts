import { callAPI } from "@/services/api";
import { ResponseUI } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";

// USERS

export const getSportList = async () => {
  const res = await callAPI({
    path: `/sport`,
    method: "GET",
  });

  return res.data;
};

export const useSportList = () => {
  return useQuery<ResponseUI>({
    queryKey: ["sport"],
    queryFn: () => getSportList(),
    keepPreviousData: false,
  });
};
