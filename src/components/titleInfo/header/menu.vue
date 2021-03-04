<template>
	<div>
		<div class="w-100 mx-auto menu text-lg-center p-1 my-2">
			<ul class="list-unstyled font-xs-14 font-15 mt-2">
				<li class="d-inline">
					<router-link
					class="font-weight-bold mx-3"
					:class="$route.name=='titleOverviewRoute' ? 'text-primary' : 'text-light'"
					:to="'/'+$route.params.type+'/'+this.$route.params.titleid+'/'+
					this.$route.params.title.split(' ').join('-')">
						Overview
					</router-link>

					<router-link
					class="font-weight-bold mx-3"
					:class="$route.name=='titleCharactersRoute' ? 'text-primary' : 'text-light'"
					:to="'/'+$route.params.type+'/'+this.$route.params.titleid+'/'+
					this.$route.params.title.split(' ').join('-')+'/characters'">
						Characters
					</router-link>

					<router-link
					v-if="$route.params.type=='anime'"
					class="font-weight-bold mx-3"
					:class="$route.name=='titleStaffRoute' ? 'text-primary' : 'text-light'"
					:to="'/'+$route.params.type+'/'+this.$route.params.titleid+'/'+
					this.$route.params.title.split(' ').join('-')+'/staff'">
						Staff
					</router-link>

					<router-link
					v-if="$route.params.type=='anime'"
					class="font-weight-bold mx-3"
					:class="$route.name=='titleEpisodesRoute' ? 'text-primary' : 'text-light'"
					:to="'/'+$route.params.type+'/'+this.$route.params.titleid+'/'+
					this.$route.params.title.split(' ').join('-')+'/episodes/1'">
						Episodes
					</router-link>

					<router-link
					class="font-weight-bold mx-3"
					:class="$route.name=='titleReviewsRoute' ? 'text-primary' : 'text-light'"
					:to="'/'+$route.params.type+'/'+this.$route.params.titleid+'/'+
					this.$route.params.title.split(' ').join('-')+'/reviews/1'">
						Reviews
					</router-link>

					<router-link
					class="font-weight-bold mx-3"
					:class="$route.name=='titleRecommendationsRoute' ? 'text-primary' : 'text-light'"
					:to="'/'+$route.params.type+'/'+this.$route.params.titleid+'/'+
					this.$route.params.title.split(' ').join('-')+'/recommendations'">
						Recommendations
					</router-link>

					<router-link
					class="font-weight-bold mx-3"
					:class="$route.name=='titleNewsRoute' ? 'text-primary' : 'text-light'"
					:to="'/'+$route.params.type+'/'+this.$route.params.titleid+'/'+
					this.$route.params.title.split(' ').join('-')+'/news'">
						News
					</router-link>

					<router-link
					class="font-weight-bold mx-3"
					:class="$route.name=='titleStatisticsRoute' ? 'text-primary' : 'text-light'"
					:to="'/'+$route.params.type+'/'+this.$route.params.titleid+'/'+
					this.$route.params.title.split(' ').join('-')+'/stats'">
						Stats
					</router-link>

					<router-link
					class="font-weight-bold mx-3"
					:class="$route.name=='titleForumRoute' ? 'text-primary' : 'text-light'"
					:to="'/'+$route.params.type+'/'+this.$route.params.titleid+'/'+
					this.$route.params.title.split(' ').join('-')+'/forum'">
						Forum
					</router-link>

					<router-link
					class="font-weight-bold mx-3"
					:class="$route.name=='titleRatingsRoute' ? 'text-primary' : 'text-light'"
					:to="'/'+$route.params.type+'/'+this.$route.params.titleid+'/'+
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
		name: 'titleMenu'
	}
</script>

<style scoped>
	.menu{
		overflow-x: auto;
		white-space: nowrap;
		background-color: rgba(0,0,0,0.3);
	}
</style>