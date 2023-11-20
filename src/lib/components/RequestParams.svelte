<script lang="ts">
	import type { UserRequest } from '$lib/types/userRequests.types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let request: UserRequest;

	let newParam: string;
	let newValue: string;

	const addNewParam = () => {
		dispatch('newparam', {
			[newParam]: newValue
		});
		newParam = '';
		newValue = '';
	};

	const updateValue = (key: string, value: string) => {
		if (request.params) {
			request.params[key] = value;
		}
	};

	const updateKey = (key: string, newKey: string) => {
		if (request.params) {
			const value = request.params[key];
			request.params[newKey] = value;
			delete request.params[key];
		}
	};
</script>

<div class="flex flex-col p-2 gap-2">
	<p>Query Params</p>
	{#if request.params}
		{#each Object.entries(request.params) as [key, val]}
			<div class="query-pair">
				<label class="label">
					<input class="input p-2" type="text" value={key} />
				</label>
				<label class="label">
					<input class="input p-2" type="text" value={val} on:input={() => updateValue(key, val)} />
				</label>
				<button type="button" class="btn variant-filled rounded" on:click={addNewParam}>
					<i class="ri-delete-bin-line" />
				</button>
			</div>
		{/each}
	{/if}

	<div class="query-pair">
		<label class="label">
			<input class="input p-2" type="text" bind:value={newParam} />
		</label>
		<label class="label">
			<input class="input p-2" type="text" bind:value={newValue} />
		</label>
		<button type="button" class="btn variant-filled rounded" on:click={addNewParam}>
			<i class="ri-add-fill" />
			<span>Add</span>
		</button>
	</div>
</div>

<style>
	.query-pair {
		display: grid;
		grid-template-columns: 1fr 1fr 100px;
		gap: 4px;
	}
</style>
