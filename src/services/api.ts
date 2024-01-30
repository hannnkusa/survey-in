import axios, { AxiosResponse } from 'axios';

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	adapter: ['http', 'xhr'],
});

type ParamUI = {
	path: string;
	method: string;
	data?: any;
	isAuthenticated?: boolean;
	formData?: any;
	params?: any;
	isBase?: boolean;
};

type Headers = {
	[key: string]: string;
};

export const fetcher = async <Data>(url: string) => {
	const response = await api.request<Data, AxiosResponse<Data>>({
		url,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return response.data as Data;
};

export async function callAPI({
	path,
	method,
	data,
	isAuthenticated = true,
	formData,
	params,
	isBase = false,
}: ParamUI) {
	const headers: Headers = {
		'Content-Type': `${formData ? 'multipart/form-data' : 'application/json'}`,

		Accept: `${formData ? 'multipart/form-data' : 'application/json'}`,
	};

	const response = await api({
		url: isBase
			? process.env.NEXT_PUBLIC_BASE_API_URL + path
			: process.env.NEXT_PUBLIC_API_URL + path,

		params,

		method,

		data,

		headers,
	});

	return response;
}
