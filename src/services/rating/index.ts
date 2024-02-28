import { callAPI } from "@/services/api";
import {
  OrderResponseUI,
  OrderUI,
  OrderPostUI,
  OrderDetailUI,
} from "../../types/order";
import { useMutation, useQuery } from "@tanstack/react-query";

export const postRating = async (data: any) => {
  return await callAPI({
    path: `/rating`,
    method: "POST",
    data: data,
  });
};
