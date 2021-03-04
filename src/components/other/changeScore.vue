<template>
	<div>
			<select class="form-control col-12 col-sm-4 d-none d-sm-block mt-2" :disabled="anime.status=='Planning' || anime.status=='Select status'" v-model="myScore" @change="changeScore">
				<option selected value="">
					Select rating
				</option>
				<option :key="rating" v-for="rating in ratings">
					{{rating}}
				</option>
			</select>

			<select class="col-10 col-sm-4 d-sm-none p-0 mt-2" :disabled="anime.status=='Planning' || anime.status=='Select status'" v-model="myScore" @change="changeScore">
				<option selected value="">
					Select rating
				</option>
				<option :key="rating" v-for="rating in ratings">
					{{rating}}
				</option>
			</select>
	</div>
</template>

<script>
export default {
	name: 'changeScore',
	props: ["anime"],
	data() {
		let ratings=[1,2,3,4,5,6,7,8,9,10].slice().reverse();
		return {
			myScore: '',
			ratings: ratings
		}
	},
	methods: {
		changeScore(){
			this.anime.myScore=this.myScore;
			let animeInfo = JSON.parse(localStorage.animeInfo);
			for (var i = 0; i < animeInfo.length; i++) {
				if(this.anime.id === animeInfo[i].id){
					animeInfo[i].myScore=this.myScore;
					break;
				}
			}
			localStorage.setItem("animeInfo", JSON.stringify(animeInfo));
		}
	}
}
</script>