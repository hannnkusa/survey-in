import { callAPI } from "@/services/api";
import { ResponseUI } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";

// USERS

export const getEducationList = async () => {
  const res = await callAPI({
    path: `/education`,
    method: "GET",
  });

  return res.data;
};

export const useEducationList = () => {
  return useQuery<ResponseUI>({
    queryKey: ["education"],
    queryFn: () => getEducationList(),
    keepPreviousData: false,
  });
};
