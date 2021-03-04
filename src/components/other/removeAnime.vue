<template>
	<div>
		<b-button variant="danger" class="btn-sm rounded-0" :id="'remove-anime-'+anime.id" href="#" tabindex="0">
			Remove from list
		</b-button>

<b-popover :target="'remove-anime-'+anime.id" variant="danger" triggers="focus">
	<template v-slot:title>Remove {{anime.title}} from list?</template>
	<button @click="removeAnime" type="button" class="btn btn-danger col-12 mx-auto btn-sm">Remove</button>
</b-popover>
	</div>
</template>

<script>
	export default{
		name: "removeAnime",
		props: ["anime","animeInfo"],
		methods: {
			removeAnime(){
				let allAnime = this.animeInfo;
				for (let i = 0; i < allAnime.length; i++) {
					if(this.anime.id === allAnime[i].id){
						allAnime.splice(i, 1);
						break;
					}
				}
				let animeInfo = JSON.parse(localStorage.animeInfo);
				for (let i = 0; i < animeInfo.length; i++) {
					if(this.anime.id === animeInfo[i].id){
						animeInfo.splice(i, 1);
						break;
					}
				}
				localStorage.setItem("animeInfo", JSON.stringify(animeInfo));
			}
		}
	}
</script>