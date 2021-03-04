<template>
	<div>
		<tbody class="w-100">
			<tr class="w-100">
				<td class="w-25 align-middle d-table-cell">
					<router-link :anime="anime" :to="{ name: 'animeInfo', params: { animeid: anime.id, title: anime.title.split(' ').join('-') }}">
						<img class="img-fluid w-xs-100 w-sm-100 w-md-90 w-lg-90 w-xl-80" :src="anime.cover">
					</router-link>
				</td>
				<td class="w-5 d-lg-none">
					
				</td>
				<td class="w-70 text-left align-top ml-3">
					<titleInfo :anime="anime"><slot></slot></titleInfo>
					<changeStatus :anime="anime"></changeStatus>
					<changeScore :anime="anime"></changeScore>
					<favourite :animeInfo="animeInfo" :anime="anime"></favourite>
				</td>
			</tr>
		</tbody>
	</div>
</template>

<script>
	import changeStatus from '../components/changeStatus.vue'
	import changeScore from '../components/changeScore.vue'
	import favourite from '../components/favourite.vue'
	import titleInfo from '../components/titleInfo.vue'
	export default{
		name: "animeItem",
		props: ["anime","animeInfo"],
		components:{
			changeStatus,
			changeScore,
			favourite,
			titleInfo
		}
	}
</script>