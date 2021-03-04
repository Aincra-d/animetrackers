<template>
	<div>
		<button @click="addFavourite" type="button" class="btn outline-0 border-0 text-left px-0 text-light">
			<i class="fas fa-heart fa-lg"></i>
		</button>
	</div>
</template>

<script>
	export default{
		name: 'addFavourite',
		props: ["anime"],
		methods: {
			addFavourite(){
				this.anime.favourite=true;
				let animeInfo = JSON.parse(localStorage.animeInfo);
				for (var i = 0; i < animeInfo.length; i++) {
					if(this.anime.id === animeInfo[i].id){
						animeInfo[i].favourite=true;
						break;
					}
				}
				localStorage.setItem("animeInfo", JSON.stringify(animeInfo));
			}
		}
	}
</script>