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

	return {
		subscribe,
		set,
		update,
		addNewProject,
		updateProject,
		deleteProject,
		addNewRequest,
		updateRequest
	};
}

export const projects = createProjectStore();
