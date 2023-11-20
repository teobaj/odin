<script lang="ts">
	import { projects } from '$lib/stores/project.store';
	import type { Project } from '$lib/types/project.types';
	import type { UserRequest } from '$lib/types/userRequests.types';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	export let project: Project;

	function editProjectName(project: Project, e: Event) {
		const content = (e?.target as HTMLElement).innerText;
		project.name = content;
		projects.updateProject(project.id, project);
	}

	function editRequestName(projectId: number, request: UserRequest, e: Event) {
		const content = (e?.target as HTMLElement).innerText;
		request.name = content;
		projects.updateRequest(projectId, request.id, request);
	}
</script>

<Accordion>
	<AccordionItem class="bg-primary-500">
		<div slot="summary" class="w-full flex justify-between">
			<span contenteditable="true" on:input={(e) => editProjectName(project, e)}
				>{project.name}</span
			>
			<div>
				<button
					type="button"
					class="btn btn-sm variant-filled"
					on:click|stopPropagation={() => projects.addNewRequest(project.id)}>+</button
				>
				<button
					type="button"
					class="btn btn-sm variant-filled"
					on:click|stopPropagation={() => projects.deleteProject(project.id)}>X</button
				>
			</div>
		</div>
		<div class="flex flex-col" slot="content">
			{#each project.requests as req}
				<div class="flex justify-between">
					<a href={`/?project=${project.id}&request=${req.id}`}>
						<span contenteditable="true" on:input={(e) => editRequestName(project.id, req, e)}
							>{req.name}</span
						>
					</a>
					<button
						type="button"
						class="btn btn-sm variant-filled"
						on:click|stopPropagation={() => projects.deleteRequest(project.id, req.id)}>X</button
					>
				</div>
			{/each}
		</div>
	</AccordionItem>
</Accordion>
