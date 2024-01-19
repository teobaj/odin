<script lang="ts">
	import { projects } from '$lib/stores/project.store';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import RequestParams from './RequestParams.svelte';
	import RequestBody from './RequestBody.svelte';

	let tabSet = 0;
	export let requestId: number;
	export let projectId: number;

	const handleAddNewParam = (e: CustomEvent) => {
		const newParam = e.detail;
		projects.addNewRequestParam(projectId, requestId, newParam);
	};

	const handleDeletepPram = (e: CustomEvent) => {
		const key = e.detail.key
		projects.deleteParamKey(projectId, requestId, key)
	}

	$: data = $projects
		.find((pro) => pro.id === projectId)
		?.requests.find((req) => req.id === requestId);
</script>

<TabGroup>
	<Tab bind:group={tabSet} name="tab1" value={0}>Parameters</Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}>Headers</Tab>
	<Tab bind:group={tabSet} name="tab3" value={2}>Body</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			{#if data}
				<RequestParams request={data} on:newparam={handleAddNewParam} on:deleteparam={handleDeletepPram}/>
			{/if}
		{:else if tabSet === 1}
		(tab panel 3 contents)

		{:else if tabSet === 2}
			<RequestBody />

		{/if}
	</svelte:fragment>
</TabGroup>
