<template>
	<div class="w-100">
		<search-item
		:view="view"
		@open-modal="openModal"
		:items="items"
		:screen="screen">
		</search-item>
	</div>
</template>

<script>
	import searchItem from '@/components/search/searchItem.vue';
	export default{
		name: 'topAnime',
		props: {
			items: Array,
			data: Object,
			screen: Number,
			view: String
		},
		components: {
			'search-item': searchItem
		},
		methods: {
			openModal(ref,id,title){
                this.$emit('open-modal',ref,id,title)
            }
		}
	};
</script>