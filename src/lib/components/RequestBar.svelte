<script lang="ts">
	import { projects } from '$lib/stores/project.store';
	import type { Project } from '$lib/types/project.types';
	import type { UserRequest } from '$lib/types/userRequests.types';

	export let projectId: number;
	export let requestId: number;

	$: console.log($projects);
	$: data = $projects
		.find((pro) => pro.id === projectId)
		?.requests.find((req) => req.id === requestId);
</script>

{#if data}
	<div class="flex gap-1 p-4">
		<label class="label">
			<select class="select" bind:value={data.type}>
				<option value="GET">GET</option>
				<option value="POST">POST</option>
				<option value="PUT">PUT</option>
				<option value="DELETE">DELETE</option>
				<option value="PATCH">PATCH</option>
			</select>
		</label>
		<label class="label flex-grow">
			<input class="input p-2 rounded" type="text" bind:value={data.url} />
		</label>
		<button type="button" class="btn variant-filled rounded">
			<i class="ri-send-plane-fill" />
			<span>Send</span>
		</button>
	</div>
{/if}
