<template>
	<div>
		<b-button class="bg-transparent text-light outline-0 border-0 text-left px-0" :id="'remove-favourite-'+anime.id" href="#" tabindex="0">
			<i class="fas fa-heart fa-lg text-danger"></i>
		</b-button>

		<b-popover :target="'remove-favourite-'+anime.id" variant="danger" triggers="focus">
			<template v-slot:title>Remove {{anime.title}} from favourites?</template>
			<button @click="removeFavourite" type="button" class="btn btn-danger col-12 mx-auto btn-sm">Remove</button>
		</b-popover>
	</div>
</template>

<script>
	export default{
		name: "removeFavourite",
		props: ["anime"],
		methods: {
			removeFavourite(){
				this.anime.favourite=false;
				let animeInfo = JSON.parse(localStorage.animeInfo);
				for (var i = 0; i < animeInfo.length; i++) {
					if(this.anime.id === animeInfo[i].id){
						animeInfo[i].favourite=false;
						break;
					}
				}
				localStorage.setItem("animeInfo", JSON.stringify(animeInfo));
			}
		}
	}
</script>