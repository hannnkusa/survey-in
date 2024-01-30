import { callAPI } from "@/services/api";
import { ResponseUI } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";

// USERS

export const getReligionList = async () => {
  const res = await callAPI({
    path: `/religion`,
    method: "GET",
  });

  return res.data;
};

export const useReligionList = () => {
  return useQuery<ResponseUI>({
    queryKey: ["religion"],
    queryFn: () => getReligionList(),
    keepPreviousData: false,
  });
};
