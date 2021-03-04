<template>
	<div class="w-100">
		<table class="anime-container">
			<anime-item v-for="(anime,index) in animeInfo" :key="anime.id" :animeInfo="animeInfo" :anime="anime">
				<span class="font-weight-bold text-light font-18">
					{{index+data.limitStart+1}}.
				</span>
			</anime-item>
		</table>
	</div>
</template>

<script>
	import animeItem from '../components/animeItem.vue';
	export default{
		name: 'anime',
		props: ["animeInfo","data"],
		components: {
			animeItem
		}
	};
</script>

<style scoped>
	@media(min-width: 576px){
		.anime-container{
			width:100%;
			margin-bottom:1rem;
			color:#212529;
		}
		.anime-container td,.anime-container th{
			padding:.75rem;
			vertical-align:top;
			border-top:1px solid #dee2e6;
		}
		.anime-container thead th{
			vertical-align:bottom;
			border-bottom:2px solid #dee2e6;
		}
		.anime-container tbody+tbody{
			border-top:2px solid #dee2e6;
		}
	}
</style>