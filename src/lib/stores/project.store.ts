import { LocalStorageService } from '$lib/services/project.services';
import { generateProjectId, generateRequestId } from '$lib/services/uid.services';
import type { Project } from '$lib/types/project.types';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { UserRequest } from '$lib/types/userRequests.types';

function createProjectStore() {
	const { subscribe, set, update } = writable<Project[]>([]);
	if (browser) {
		const projectService = LocalStorageService.getInstance();
		const [initialProjects] = projectService.getProjects();
		set(initialProjects ?? []);
		subscribe((projects) => {
			projectService.sync(projects);
		});
	}

	function addNewProject() {
		const project: Project = {
			name: 'New Project',
			id: generateProjectId(),
			requests: []
		};
		update((state) => [...state, project]);
	}

	function updateProject(id: number, project: Project) {
		update((state) => {
			const index = state.findIndex((pro) => pro.id === id);
			state[index] = project;
			return state;
		});
	}

	function deleteProject(id: number) {
		update((state) => {
			const newState = state.filter((pro) => pro.id !== id);
			return newState;
		});
	}

	function addNewRequest(projectId: number) {
		const request: UserRequest = {
			id: generateRequestId(),
			name: 'GET',
			type: 'GET',
			url: 'http://localhost:3000/'
		};

		update((state) => {
			const index = state.findIndex((pro) => pro.id === projectId);
			state[index].requests.push(request);
			return state;
		});
	}

	function updateRequest(projectId: number, requestId: number, request: UserRequest) {
		update((state) => {
			const projectIndex = state.findIndex((pro) => pro.id === projectId);
			const requestIndex = state[projectIndex].requests.findIndex((req) => req.id === requestId);
			state[projectIndex].requests[requestIndex] = request;
			return state;
		});
	}

	function deleteRequest(projectId: number, requestId: number) {
		update((state) => {
			const projectIndex = state.findIndex((project) => project.id === projectId);
			state[projectIndex].requests = state[projectIndex].requests.filter(
				(req) => req.id !== requestId
			);
			return state;
		});
	}

	function addNewRequestParam(
		projectId: number,
		requestId: number,
		paramPair: Record<string, string>
	) {
		update((state) => {
			const projectIndex = state.findIndex((project) => project.id === projectId);
			if (projectIndex !== -1) {
				const requestIndex = state[projectIndex].requests.findIndex((req) => req.id === requestId);
				const currentParams = state[projectIndex].requests[requestIndex].params;
				if (currentParams) {
					state[projectIndex].requests[requestIndex].params = { ...currentParams, ...paramPair };
				} else {
					state[projectIndex].requests[requestIndex].params = { ...paramPair };
				}
			}
			return state;
		});
	}

	function updateParamKey(projectId: number, requestId: number, oldKey: string, newKey: string) {
		update((state) => {
			const projectIndex = state.findIndex((project) => project.id === projectId);
			if (projectIndex !== -1) {
				const requestIndex = state[projectIndex].requests.findIndex((req) => req.id === requestId);
				const value = state[projectIndex]?.requests[requestIndex]?.params![oldKey];
				const newPair = { [newKey]: value };
				delete state[projectIndex].requests[requestIndex].params![oldKey];
				state[projectIndex].requests[requestIndex].params = {
					...state[projectIndex]?.requests[requestIndex]?.params,
					...newPair
				};
			}
			return state;
		});
	}

	function deleteParamKey(projectId: number, requestId:number, key: string){
		update((state) => {
			const projectIndex = state.findIndex((project) => project.id === projectId);
			if (projectIndex !== -1) {
				const requestIndex = state[projectIndex].requests.findIndex((req) => req.id === requestId);
				if(state[projectIndex].requests[requestIndex].params){
					delete state[projectIndex].requests[requestIndex].params![key]
				}
			}
			return state;
		})

	}

	return {
		subscribe,
		set,
		update,
		addNewProject,
		updateProject,
		deleteProject,
		addNewRequest,
		updateRequest,
		deleteRequest,
		addNewRequestParam,
		updateParamKey,
		deleteParamKey
	};
}

export const projects = createProjectStore();
