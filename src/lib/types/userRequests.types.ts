type RequestType = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

export type UserRequest = {
	id: number;
	name: string;
	type: RequestType;
	url: string;
	body?: object;
	headers?: object;
};
