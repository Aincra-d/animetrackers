<template>
	<div>
		<div class="w-100 text-justify">
			<div class="d-block">
				<span class="font-weight-bold mr-2">
					<i class="fas fa-trophy fa-md text-secondary"></i> {{stats.rank ? stats.rank : '-'}}
				</span>

				<span class="font-weight-bold mr-2">
					<i class="fas fa-star fa-md text-warning"></i> {{stats.score ? stats.score : '-'}}<!-- ({{stats.scored_by ? stats.scored_by : '-'}}) -->
				</span>

				<span class="font-weight-bold mr-2">
					<i class="fas fa-users fa-md text-info"></i> {{stats.members ? stats.members : '-'}}
				</span>

				<span class="font-weight-bold mr-2">
					<i class="fas fa-heart fa-md text-danger"></i> {{stats.favourites ? stats.favourites : '-'}}
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'stats',
		props: {
			stats: Object
		}
	}
</script>