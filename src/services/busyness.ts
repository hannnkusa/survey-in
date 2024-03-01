import { callAPI } from "@/services/api";
import { ResponseUI } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";

// USERS

export const getBusynessList = async () => {
  const res = await callAPI({
    path: `/busyness`,
    method: "GET",
  });

  return res.data;
};

export const useBusynessList = () => {
  return useQuery<ResponseUI>({
    queryKey: ["busyness"],
    queryFn: () => getBusynessList(),
    keepPreviousData: false,
  });
};
