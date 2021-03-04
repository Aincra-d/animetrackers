<template>
	<div>
		<select class="form-control col-12 col-sm-4 d-none d-sm-block mt-2" v-model="status" @change="changeStatus">
			<option :key="status" v-for="status in statuses">{{status}}</option>
		</select>

		<select class="col-10 col-sm-4 d-sm-none p-0 mt-2" v-model="status" @change="changeStatus">
			<option :key="status" v-for="status in statuses">{{status}}</option>
		</select>
	</div>
</template>

<script>
export default {
	name: 'changeStatus',
	props: ["anime"],
	data(){
		return{
			statuses:['Select status','Watching','Completed','Paused','Dropped','Planning'],
			status: 'Select status'
		}
	},
	methods: {
		changeStatus(){
			this.anime.status=this.status;
			let animeInfo = JSON.parse(localStorage.animeInfo);
			for (var i = 0; i < animeInfo.length; i++) {
				if(this.anime.id === animeInfo[i].id){
					animeInfo[i].status=this.status;
					break;
				}
			}
			localStorage.setItem("animeInfo", JSON.stringify(animeInfo));
		}
	}
}
</script>