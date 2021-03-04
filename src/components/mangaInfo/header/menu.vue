<template>
	<div>
		<div class="w-100 menu bg-transparent text-lg-center" :class="{'bg-dark text-light':$theme=='dark','bg-light text-dark':$theme=='light'}">
			<ul class="list-unstyled">
				<li class="d-inline">
					<router-link class="text-light font-weight-bold mx-3"
					:class="$route.name=='mangaOverviewRoute' ? 'text-primary' : 'text-light'"
					:to="'/manga/'+$route.params.mangaid+'/'+
					$route.params.title.split(' ').join('-')">
						Details
					</router-link>

					<router-link class="text-light font-weight-bold mx-3"
					:class="$route.name=='mangaCharactersRoute' ? 'text-primary' : 'text-light'"
					:to="'/manga/'+$route.params.mangaid+'/'+
					$route.params.title.split(' ').join('-')+'/characters'">
						Characters
					</router-link>

					<router-link class="text-light font-weight-bold mx-3"
					:class="$route.name=='mangaReviewsRoute' ? 'text-primary' : 'text-light'"
					:to="'/manga/'+$route.params.mangaid+'/'+
					$route.params.title.split(' ').join('-')+'/reviews/1'">
						Reviews
					</router-link>

					<router-link class="text-light font-weight-bold mx-3"
					:class="$route.name=='mangaRecommendationsRoute' ? 'text-primary' : 'text-light'"
					:to="'/manga/'+$route.params.mangaid+'/'+
					$route.params.title.split(' ').join('-')+'/recommendations'">
						Recommendations
					</router-link>

					<router-link class="text-light font-weight-bold mx-3"
					:class="$route.name=='mangaNewsRoute' ? 'text-primary' : 'text-light'"
					:to="'/manga/'+$route.params.mangaid+'/'+
					$route.params.title.split(' ').join('-')+'/news'">
						News
					</router-link>

					<router-link class="text-light font-weight-bold mx-3"
					:class="$route.name=='mangaStatsRoute' ? 'text-primary' : 'text-light'"
					:to="'/manga/'+$route.params.mangaid+'/'+
					$route.params.title.split(' ').join('-')+'/stats'">
						Statistics
					</router-link>

					<router-link class="font-weight-bold mx-3"
					:class="$route.name=='mangaForumRoute' ? 'text-primary' : 'text-light'"
					:to="'/manga/'+this.$route.params.mangaid+'/'+
					this.$route.params.title.split(' ').join('-')+'/forum'">
						Forum
					</router-link>

					<router-link class="text-light font-weight-bold mx-3"
					:class="$route.name=='mangaRatingsRoute' ? 'text-primary' : 'text-light'"
					:to="'/manga/'+$route.params.mangaid+'/'+
					$route.params.title.split(' ').join('-')+'/ratings/1'">
						Feed
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'mangaMenu'
	}
</script>

<style scoped>
.menu{
	overflow-x: auto;
	white-space: nowrap;
}
</style>