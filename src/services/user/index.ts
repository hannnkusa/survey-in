import { callAPI } from '@/services/api';
import { UserPutUI } from './index.types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const putUserUpdate = async (data: UserPutUI, id: string | undefined) => {
    return await callAPI({
        path: `/user/${id}`,
        method: 'PUT',
        data: data,
    });
};