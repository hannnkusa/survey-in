import { callAPI } from "@/services/api";
import {
  QuestionnairePostUI,
  QuestionnairePutUI,
  QuestionnaireResponseUI,
  QuestionnaireUI,
} from "./index.types";
import { useMutation, useQuery } from "@tanstack/react-query";

// USERS

export const getQuestionnaireList = async () => {
  const res = await callAPI({
    path: `/questionnaire`,
    method: "GET",
  });

  return res.data;
};

export const putUserUpdate = async (
  data: QuestionnairePutUI,
  id: string | undefined
) => {
  return await callAPI({
    path: `/user/customer-coordinator/update-user/${id}`,
    method: "PUT",
    data: data,
  });
};

export const deleteCalonSiswa = async ({ id }: { id: string | undefined }) => {
  return await callAPI({
    path: `/user/customer-coordinator/remove-user/${id}`,
    method: "DELETE",
  });
};

export const useQuestionnaireList = (param?: {
  status?: string[];
  page?: number;
}) => {
  return useQuery<QuestionnaireResponseUI>({
    queryKey: ["questionnaire"],
    queryFn: () => getQuestionnaireList(),
    keepPreviousData: false,
  });
};

// export const useCalonSiswaQuery = (id: string | undefined) =>
//     useMutation(['calon-siswa'], async (body: UserBodyRequest<typeof id>) => {
//         const res = await putCalonSiswaUpdate(body as UserCustomerPutUI, id)
//         return res;
//     });

export const useRemoveCalonSiswaQuery = () =>
  useMutation(["calon-siswa"], async (body: { id: string | undefined }) => {
    const res = await deleteCalonSiswa(body);
    return res;
  });
