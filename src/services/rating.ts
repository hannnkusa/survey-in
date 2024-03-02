import { callAPI } from "@/services/api";
import { RatingResponseUI, RatingSummaryResponseUI } from "@/types/rating";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getRatingList = async ({ rating }: { rating?: number }) => {
  const params: any = {};

  if (rating) params.rating = rating;

  const res = await callAPI({
    path: `/rating`,
    method: "GET",
    params: params,
  });

  return res.data;
};

export const getRatingSummary = async () => {
  const res = await callAPI({
    path: `/rating/summary`,
    method: "GET",
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

export const useRatingList = ({ rating }: { rating?: number }) => {
  return useQuery<RatingResponseUI>({
    queryKey: ["rating", rating],
    queryFn: () => getRatingList({ rating }),
    keepPreviousData: false,
  });
};

export const useRatingSummary = () => {
  return useQuery<RatingSummaryResponseUI>({
    queryKey: ["rating-summary"],
    queryFn: () => getRatingSummary(),
    keepPreviousData: false,
  });
};
