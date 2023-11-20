<script lang="ts">
	import { onMount } from 'svelte';
	import { navigating } from '$app/stores';
	import RequestBar from '$lib/components/RequestBar.svelte';
	import RequestOptions from '$lib/components/RequestOptions.svelte';

	let requestId: number;
	let projectId: number;

	onMount(() => {
		if (window) {
			const searchParams = new URLSearchParams(window.location.search);
			requestId = Number(searchParams.get('request'));
			projectId = Number(searchParams.get('project'));
		}
	});

	navigating.subscribe((nav) => {
		if (nav) {
			projectId = Number(nav.to?.url.searchParams.get('project'));
			requestId = Number(nav.to?.url.searchParams.get('request'));
		}
	});
</script>

<div>
	<RequestBar {projectId} {requestId} />
	<RequestOptions {projectId} {requestId} />
</div>
