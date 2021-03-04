<template>
	<div>
		<tbody>
			<tr>
				<td>
					<img class="img-fluid" :src="anime.cover">
				</td>
				<td>
					<span class="font-weight-bold" :class="[anime.airing:'text-success',anime.completed:'text-primary']">
						{{anime.title}}
					</span>
				</td>
			</tr>
		</tbody>
	</div>
</template>

<script>
	export default{
		name: "animeItem",
		props: ["anime"]
	}
</script>

<style scoped>
	
</style>