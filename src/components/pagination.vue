<template>
	<div class="w-100 text-center my-2">
		<prevButtons v-if="data.currentPage>1" class="d-inline-block" :data="data"></prevButtons>
		<pageSelect class="all-pages d-inline-block" :data="data">{{data.currentPage}}</pageSelect>
		<nextButtons v-if="data.allPages>data.currentPage" class="d-inline-block" :data="data"></nextButtons>
	</div>
</template>

<script>
	import nextButtons from '@/components/nextButtons.vue'
	import prevButtons from '@/components/prevButtons.vue'
	import pageSelect from '@/components/pageSelect.vue'
	export default{
		name: 'pagination',
		props: {
			allPages: Number,
			perPage: Number
		},
		components: {
			nextButtons,
			prevButtons,
			pageSelect
		},
		data() {
			let currentPage=this.$route.params.page || this.$route.query.page;
			let perPage=this.perPage;
			let pageDiff=this.allPages-currentPage;
			let pages={
				first: 1,
				prev2: parseInt(currentPage)-2,
				prev: parseInt(currentPage)-1,
				next: parseInt(currentPage)+1,
				next2: parseInt(currentPage)+2,
				last: this.allPages
			};
			return {
				data: {
					perPage: perPage,
					pageDiff: pageDiff,
					currentPage: parseInt(currentPage),
					allPages: this.allPages,
					pages: pages
				}
			}
		},
	}
</script>