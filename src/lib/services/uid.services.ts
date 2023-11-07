import type { Project } from '$lib/types/project.types';
import { PROJECTS } from './localstorage.keys';

export const generateProjectId = (): number => {
	try {
		const projectStr = localStorage.getItem(PROJECTS);
		if (projectStr) {
			const projects = JSON.parse(projectStr) as Project[];
			const lastId = projects.sort((current, next) => next.id - current.id)[0].id;
			return lastId + 1;
		} else {
			throw new Error('no projects');
		}
	} catch (error) {
		return 1;
	}
};

export const generateRequestId = (): number => {
	try {
		const projectStr = localStorage.getItem(PROJECTS);
		if (projectStr) {
			const projects = JSON.parse(projectStr) as Project[];
			const requests = projects
				.flatMap((project) => project.requests)
				.sort((current, next) => next.id - current.id);
			const lastId = requests[0].id;
			return lastId + 1;
		} else {
			throw new Error('no prjects');
		}
	} catch (error) {
		return 1;
	}
};
