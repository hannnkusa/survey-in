import { callAPI } from "@/services/api";
import { RatingResponseUI } from "@/types/rating";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getRatingList = async ({ search }: { search?: string }) => {
  const params: any = {};

  if (search) params.search = search;

  const res = await callAPI({
    path: `/rating`,
    method: "GET",
    params: params,
  });

  return res.data;
};

export const postRating = async (data: any) => {
  return await callAPI({
    path: `/rating`,
    method: "POST",
    data: data,
  });
};

export const useRatingList = ({ search }: { search?: string }) => {
  return useQuery<RatingResponseUI>({
    queryKey: ["rating", search],
    queryFn: () => getRatingList({ search }),
    keepPreviousData: false,
  });
};
