<template>
  <div>
    <b-modal id="add-to-list-modal" hide-footer :title="anime.title">
      <div class="d-block text-center">
      <img :src="anime.cover" class="img-fluid">
      <button @click="addAnime" v-if="!anime.onList" type="button" class="btn btn-primary col-8 m-2">Add to list</button>
      <button @click="removeAnime" v-else type="button" class="btn btn-danger col-8 m-2">Remove from list</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
	export default{
		name: 'addToListModal',
		props: ["anime"],
		methods: {
			removeAnime(){
				let myList = JSON.parse(localStorage.animeInfo);
				for (let i = 0; i < myList.length; i++) {
					if(this.anime.id === myList[i].id){
						myList.splice(i, 1);
						this.anime.onList=false;
						break;
					}
				}
				localStorage.setItem("animeInfo", JSON.stringify(myList));
			},
			addAnime(){
				this.anime.onList=true;
				const newAnime={
					id: this.anime.id,
					cover: this.anime.cover,
					title: this.anime.title,
					status: 'Select status',
					favourite: false,
					myScore: ''
				}
				let oldItems = JSON.parse(localStorage.getItem('animeInfo'));
				oldItems.push(newAnime);
				localStorage.setItem('animeInfo', JSON.stringify(oldItems));
				this.animeInfo.push(newAnime);
			}
		}
	}
</script>