<template>
	<div>
		<form method="post" @submit.prevent="addAnime" class="p-2 m-2 form-group">
			<input required v-model.trim="title" type="text" placeholder="Enter anime title" class="form-control col-12 col-sm-6 col-md-4 col-lg-2 my-2">
			<input required v-model.trim="cover" type="text" placeholder="Enter anime cover" class="form-control col-12 col-sm-6 col-md-4 col-lg-2 my-2">
			<button type="submit" @submit.prevent="addAnime" class="btn btn-primary col-12 col-sm-6 col-md-4 col-lg-2 my-2">Add anime to list</button>
		</form>
	</div>
</template>

<script>
	import uuid from 'uuid'
	export default{
		name: 'addAnime',
		props: ["animeInfo"],
		data(){
			return{
				cover: '',
				title: ''
			}
		},
		methods: {
			addAnime(){
				const newAnime={
					id: uuid.v4(),
					cover: this.cover,
					title: this.title,
					status: 'Select status',
					favourite: false,
					myScore: ''
				}
				// this.$emit('add-anime',newAnime);
				let oldItems = JSON.parse(localStorage.getItem('animeInfo'));
				oldItems.push(newAnime);
				localStorage.setItem('animeInfo', JSON.stringify(oldItems));
				this.animeInfo.push(newAnime);
				// console.log(JSON.parse(localStorage.animeInfo));
				this.cover='';
				this.title='';
				this.status='';
			}
		}
	}
</script>