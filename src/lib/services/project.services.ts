import type { Project } from '$lib/types/project.types';
import type { UserRequest } from '$lib/types/userRequests.types';
import type { ValueResponse } from '$lib/types/utility.types';
import { PROJECTS } from './localstorage.keys';
import { generateProjectId, generateRequestId } from './uid.services';

export interface ProjectService {
	getProjects: () => ValueResponse<Project[]>;
	addNewProject: (project: Project) => ValueResponse<Project>;
	updateProject: (id: number, project: Project) => ValueResponse<Project>;
	deleteProject: (id: number) => ValueResponse<boolean>;
	addNewRequest: (projectId: number) => ValueResponse<UserRequest>;
	sync: (projects: Project[]) => void;
}

export class LocalStorageService implements ProjectService {
	private static instance: LocalStorageService;

	public static getInstance() {
		if (!LocalStorageService.instance) {
			LocalStorageService.instance = new LocalStorageService();
		}
		return LocalStorageService.instance;
	}

	getProjects(): ValueResponse<Project[]> {
		try {
			const projectStr = localStorage.getItem(PROJECTS);
			if (projectStr) {
				return [JSON.parse(projectStr) as Project[], null];
			} else {
				throw new Error('localStorage corrupted');
			}
		} catch (error) {
			return [null, error as Error];
		}
	}
	addNewProject(): ValueResponse<Project> {
		try {
			const project: Project = {
				name: 'New Project',
				id: generateProjectId(),
				requests: []
			};
			const projectStr = localStorage.getItem(PROJECTS);
			if (projectStr) {
				const projects = JSON.parse(projectStr) as Project[];
				projects.push(project);
				localStorage.setItem(PROJECTS, JSON.stringify(projects));
				return [project, null];
			} else {
				const projects = [];
				projects.push(project);
				localStorage.setItem(PROJECTS, JSON.stringify(projects));
				return [project, null];
			}
		} catch (error) {
			return [null, error as Error];
		}
	}
	updateProject(id: number, project: Project): ValueResponse<Project> {
		try {
			const projectStr = localStorage.getItem(PROJECTS);
			if (projectStr) {
				const projects = JSON.parse(projectStr) as Project[];
				const projectIndex = projects.findIndex((project) => project.id === id);
				if (projectIndex === -1) {
					throw new Error('Project Not Found');
				}
				projects[projectIndex] = project;
				localStorage.setItem(PROJECTS, JSON.stringify(projects));
				return [project, null];
			} else {
				throw new Error('localStorage corrupted');
			}
		} catch (error) {
			return [null, error as Error];
		}
	}
	deleteProject(id: number): ValueResponse<boolean> {
		try {
			const projectStr = localStorage.getItem(PROJECTS);
			if (projectStr) {
				const projects = JSON.parse(projectStr) as Project[];
				const newProjects = projects.filter((pro) => pro.id !== id);
				localStorage.setItem(PROJECTS, JSON.stringify(newProjects));
				return [true, null];
			} else {
				throw new Error('There are no projects');
			}
		} catch (error) {
			return [null, error as Error];
		}
	}
	addNewRequest(projectId: number): ValueResponse<UserRequest> {
		try {
			const request: UserRequest = {
				id: generateRequestId(),
				name: 'GET',
				type: 'GET',
				url: 'http://localhost:3000/'
			};
			const projectStr = localStorage.getItem(PROJECTS);
			if (projectStr) {
				const projects = JSON.parse(projectStr) as Project[];
				const projectIndex = projects.findIndex((pro) => pro.id === projectId);
				if (projectIndex === -1) {
					throw new Error('Project not found');
				}
				projects[projectIndex].requests.push(request);
				localStorage.setItem(PROJECTS, JSON.stringify(projects));
				return [request, null];
			} else {
				throw new Error('localhost corrupted');
			}
		} catch (error) {
			return [null, error as Error];
		}
	}

	sync(projects: Project[]): void {
		localStorage.setItem(PROJECTS, JSON.stringify(projects));
	}
}
