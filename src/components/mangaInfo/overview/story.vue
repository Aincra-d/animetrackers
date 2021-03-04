<template>
	<div class="w-100 text-light text-left">
		<ui-collapsible title="Story" class="text-dark bg-transparent border-0" open>
			<p class="text-light p-2 p-sm-3">
				{{story}}
			</p>
		</ui-collapsible>
	</div>
</template>

<script>
	export default{
		name: 'story',
		props: {
			story: String
		}
	}
</script>

<style lang="css" scoped>
	p{
		white-space: pre-wrap;
	}
</style>