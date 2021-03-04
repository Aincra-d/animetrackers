<template>
	<div>
		<span class="font-weight-bold" :class="statusColors">
			<slot></slot> <router-link :anime="anime" :to="{ name: 'animeInfo', params: { animeid: anime.id, title: anime.title.split(' ').join('-') }}">{{anime.title}}</router-link> <span v-if="anime.status!='Select status'"> - {{anime.status}}</span>
		</span>
	</div>
</template>

<script>
	export default{
		name: 'titleInfo',
		props: ["anime"],
		computed: {
			statusColors: function(){
				return{
					'text-success': this.anime.status=='Watching',
					'text-primary': this.anime.status=='Completed',
					'text-warning': this.anime.status=='Paused',
					'text-danger': this.anime.status=='Dropped',
					'text-secondary': this.anime.status=='Planning',
					'text-light': this.anime.status=='Select status'
				}
			}
		}
	}
</script>