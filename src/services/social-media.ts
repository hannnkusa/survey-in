import { callAPI } from "@/services/api";
import { ResponseUI } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";

// USERS

export const getSocialMediaList = async () => {
  const res = await callAPI({
    path: `/social-media`,
    method: "GET",
  });

  return res.data;
};

export const useSocialMediaList = () => {
  return useQuery<ResponseUI>({
    queryKey: ["social-media"],
    queryFn: () => getSocialMediaList(),
    keepPreviousData: false,
  });
};
