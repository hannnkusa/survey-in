import { callAPI } from "@/services/api";
import { UserResponseUI, UserPostUI } from "@/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getUserList = async ({ search }: { search?: string }) => {
  const params: any = {};

  if (search) params.search = search;

  const res = await callAPI({
    path: `/user`,
    method: "GET",
    params: params,
  });

  return res.data;
};

export const putUserUpdate = async (data: any, id: string | undefined) => {
  return await callAPI({
    path: `/user/${id}`,
    method: "PUT",
    data: data,
  });
};

export const postUserCreate = async (data: UserPostUI) => {
  return await callAPI({
    path: `/user`,
    method: "POST",
    data: data,
  });
};

export const putUserUpdateStatus = async (data: { disabled: boolean }, id: string | undefined) => {
  return await callAPI({
    path: `/user/${id}/status`,
    method: "PUT",
    data: data,
  });
};

export const useUserList = ({ search }: { search?: string }) => {
  return useQuery<UserResponseUI>({
    queryKey: ["user", search],
    queryFn: () => getUserList({ search }),
    keepPreviousData: false,
  });
};
