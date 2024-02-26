import { callAPI } from "@/services/api";
import { NotificationResponseUI } from "../../types/notification";
import { useQuery } from "@tanstack/react-query";

// USERS

export const getNotificationList = async (target: string) => {
  const res = await callAPI({
    path: `/notification`,
    params: {
      target,
    },
    method: "GET",
  });

  return res.data;
};

export const putNotificationReadedCondition = async (
  data: any,
  notificationId: any
) => {
  return await callAPI({
    path: `/notification/${notificationId}/readed`,
    method: "PUT",
    data: data,
  });
};

export const useNotificationList = (target: string) => {
  return useQuery<NotificationResponseUI>({
    queryKey: ["notification", target],
    queryFn: () => getNotificationList(target),
    keepPreviousData: false,
  });
};
