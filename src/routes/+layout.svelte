<script>
	import Header from '$lib/components/Header.svelte';
	import ProjectList from '$lib/components/ProjectList.svelte';
	import SideMenu from '$lib/components/SideMenu.svelte';
	import '../app.postcss';
</script>

<div class="wrapper">
	<div class="header-wrapper">
		<Header />
	</div>
	<div class="side-menu-wrapper">
		<SideMenu />
	</div>
	<div class="list-wrapper bg-surface-200-900-token">
		<ProjectList />
	</div>
	<div class="content-wrapper bg-amber-600">
		<slot />
	</div>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-rows: auto 1fr;
		grid-template-columns: auto 1fr 3fr;
		height: 100vh;
		width: 100%;
	}
	.header-wrapper {
		grid-column: 1/4;
	}
</style>
