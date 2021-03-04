<template>
	<div>
		<div class="w-100 menu bg-transparent text-lg-center" :class="{'bg-dark text-light':$theme=='dark','bg-light text-dark':$theme=='light'}">
			<ul class="list-unstyled font-15">
				<li class="d-inline">
					<router-link class="font-weight-bold mx-3"
					:class="$route.name=='animeOverviewRoute' ? 'text-primary' : 'text-light'"
					:to="'/anime/'+this.$route.params.animeid+'/'+
					this.$route.params.title.split(' ').join('-')">
						Details
					</router-link>

					<router-link class="font-weight-bold mx-3"
					:class="$route.name=='animeCharactersRoute' ? 'text-primary' : 'text-light'"
					:to="'/anime/'+this.$route.params.animeid+'/'+
					this.$route.params.title.split(' ').join('-')+'/characters'">
						Characters
					</router-link>

					<router-link class="font-weight-bold mx-3"
					:class="$route.name=='animeStaffRoute' ? 'text-primary' : 'text-light'"
					:to="'/anime/'+this.$route.params.animeid+'/'+
					this.$route.params.title.split(' ').join('-')+'/staff'">
						Staff
					</router-link>

					<router-link class="font-weight-bold mx-3"
					:class="$route.name=='animeEpisodesRoute' ? 'text-primary' : 'text-light'"
					:to="'/anime/'+this.$route.params.animeid+'/'+
					this.$route.params.title.split(' ').join('-')+'/episodes/1'">
						Episodes
					</router-link>

					<router-link class="font-weight-bold mx-3"
					:class="$route.name=='animeReviewsRoute' ? 'text-primary' : 'text-light'"
					:to="'/anime/'+this.$route.params.animeid+'/'+
					this.$route.params.title.split(' ').join('-')+'/reviews/1'">
						Reviews
					</router-link>

					<router-link class="font-weight-bold mx-3"
					:class="$route.name=='animeRecommendationsRoute' ? 'text-primary' : 'text-light'"
					:to="'/anime/'+this.$route.params.animeid+'/'+
					this.$route.params.title.split(' ').join('-')+'/recommendations'">
						Recommendations
					</router-link>

					<router-link class="font-weight-bold mx-3"
					:class="$route.name=='animeNewsRoute' ? 'text-primary' : 'text-light'"
					:to="'/anime/'+this.$route.params.animeid+'/'+
					this.$route.params.title.split(' ').join('-')+'/news'">
						News
					</router-link>

					<router-link class="font-weight-bold mx-3"
					:class="$route.name=='animeStatisticsRoute' ? 'text-primary' : 'text-light'"
					:to="'/anime/'+this.$route.params.animeid+'/'+
					this.$route.params.title.split(' ').join('-')+'/stats'">
						Statistics
					</router-link>

					<router-link class="font-weight-bold mx-3"
					:class="$route.name=='animeForumRoute' ? 'text-primary' : 'text-light'"
					:to="'/anime/'+this.$route.params.animeid+'/'+
					this.$route.params.title.split(' ').join('-')+'/forum'">
						Forum
					</router-link>

					<router-link class="font-weight-bold mx-3"
					:class="$route.name=='animeRatingsRoute' ? 'text-primary' : 'text-light'"
					:to="'/anime/'+this.$route.params.animeid+'/'+
					this.$route.params.title.split(' ').join('-')+'/ratings/1'">
						Feed
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'animeMenu'
	}
</script>

<style scoped>
.menu{
	overflow-x: auto;
	white-space: nowrap;
}
</style>