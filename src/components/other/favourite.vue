<template>
	<div>
		<ul class="list-unstyled">
			<li class="d-inline-block">
				<addFavourite :anime="anime" v-if="!anime.favourite" :disabled="anime.status=='Planning' ||anime.status=='Select status'"></addFavourite>
				<removeFavourite :anime="anime" v-else></removeFavourite>
			</li>
			<myScore class="d-inline-block" :anime="anime"></myScore>
			<removeAnime :animeInfo="animeInfo" :anime="anime" class="d-inline-block ml-2 mt-2"></removeAnime>
		</ul>
	</div>
</template>

<script>
	import removeFavourite from './removeFavourite.vue'
	import addFavourite from './addFavourite.vue'
	import myScore from './myScore.vue'
	import removeAnime from './removeAnime.vue'
	export default{
		name: "favourite",
		props: ["anime","animeInfo"],
		components: {
			removeFavourite,
			addFavourite,
			myScore,
			removeAnime
		}
	}
</script>