<template>
	<div class="w-100">
		<top-item
		:view="view"
		@open-modal="openModal"
		:items="items">
		</top-item>
	</div>
</template>

<script>
	import topItem from '@/components/toplist/topItem.vue';
	export default{
		name: 'topAnime',
		props: {
			items: Array,
			data: Object,
			screen: Number,
			view: String
		},
		components: {
			'top-item': topItem
			// 'top-table': topTable,
			// 'top-list': topList
		},
		methods: {
			openModal(ref,id,title){
                this.$emit('open-modal',ref,id,title)
            }
		}
	};
</script>