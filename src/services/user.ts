import { callAPI } from "@/services/api";
import { UserResponseUI, UserPostUI, UserResponseDetailUI } from "@/types/user";
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

export const getUserDetail = async (userId: string) => {
  const res = await callAPI({
    path: `/user/${userId}`,
    method: "GET",
  });

  return res.data;
};

export const putUserUpdate = (data: any, id: string | undefined) => {
  return new Promise(async (resolve, reject) => {
    const result = await callAPI({
      path: `/user/${id}`,
      method: "PUT",
      data: data,
    });
    if (result) resolve(result);
    else reject(new Error('Could not update'))
  });
};

export const postUserCreate = async (data: UserPostUI) => {
  return await callAPI({
    path: `/user`,
    method: "POST",
    data: data,
  });
};

export const putUserUpdateStatus = async (
  data: { disabled: boolean },
  id: string | undefined
) => {
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

export const useUserDetail = (userId: string) => {
  return useQuery<UserResponseDetailUI>({
    queryKey: ["user-detail", userId],
    queryFn: () => getUserDetail(userId),
    keepPreviousData: false,
  });
};
