import { callAPI } from "@/services/api";
import { ResponseUI } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";

// USERS

export const getFoodList = async () => {
  const res = await callAPI({
    path: `/food`,
    method: "GET",
  });

  return res.data;
};

export const useFoodList = () => {
  return useQuery<ResponseUI>({
    queryKey: ["food"],
    queryFn: () => getFoodList(),
    keepPreviousData: false,
  });
};
