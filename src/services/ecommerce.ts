import { callAPI } from "@/services/api";
import { ResponseUI } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";

// USERS

export const getEcommerceList = async () => {
  const res = await callAPI({
    path: `/ecommerce`,
    method: "GET",
  });

  return res.data;
};

export const useEcommerceList = () => {
  return useQuery<ResponseUI>({
    queryKey: ["ecommerce"],
    queryFn: () => getEcommerceList(),
    keepPreviousData: false,
  });
};
