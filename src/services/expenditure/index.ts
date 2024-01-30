import { callAPI } from "@/services/api";
import { ResponseUI } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";

// USERS

export const getExpenditureList = async () => {
  const res = await callAPI({
    path: `/expenditure`,
    method: "GET",
  });

  return res.data;
};

export const useExpenditureList = () => {
  return useQuery<ResponseUI>({
    queryKey: ["expenditure"],
    queryFn: () => getExpenditureList(),
    keepPreviousData: false,
  });
};
