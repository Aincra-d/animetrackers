<template>
	<div>
		<li class="text-light font-weight-bold" v-if="anime.myScore!='' && anime.myScore<=10 && anime.myScore>0">
			<i class="fas fa-star fa-lg text-warning mr-2 ml-2"></i>{{anime.myScore}}
		</li>
	</div>
</template>

<script>
	export default{
		name: 'myScore',
		props: ['anime']
	}
</script>