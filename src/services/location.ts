import { callAPI } from "@/services/api";
import { ResponseUI } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";

// USERS

export const getLocationList = async () => {
  const res = await callAPI({
    path: `/location`,
    method: "GET",
  });

  return res.data;
};

export const useLocationList = () => {
  return useQuery<ResponseUI>({
    queryKey: ["location"],
    queryFn: () => getLocationList(),
    keepPreviousData: false,
  });
};
