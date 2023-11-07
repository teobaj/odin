<script lang="ts">
	import ProjectItem from './ProjectItem.svelte';
	import { projects } from '$lib/stores/project.store';
</script>

<div class="flex flex-col gap-2 p-2">
	<label class="label">
		<input class="input p-2" type="search" placeholder="Search..." />
	</label>
	<div class="flex justify-end">
		<button type="button" class="btn btn-sm variant-filled" on:click={projects.addNewProject}
			>+</button
		>
	</div>
	<ul class="list">
		{#each $projects as project}
			<ProjectItem {project} />
		{/each}
	</ul>
</div>
