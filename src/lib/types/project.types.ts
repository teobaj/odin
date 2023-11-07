import type { UserRequest } from './userRequests.types';

export type Project = {
	id: number;
	name: string;
	requests: UserRequest[];
};
