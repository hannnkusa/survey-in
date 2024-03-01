import { callAPI } from "@/services/api";
import { ResponseUI } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";

// USERS

export const getPetList = async () => {
  const res = await callAPI({
    path: `/pet`,
    method: "GET",
  });

  return res.data;
};

export const usePetList = () => {
  return useQuery<ResponseUI>({
    queryKey: ["pet"],
    queryFn: () => getPetList(),
    keepPreviousData: false,
  });
};
