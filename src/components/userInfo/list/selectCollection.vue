<template>
	<div>
        <anime v-if="$route.params.type=='anime'">
        </anime>

		<manga v-else>
		</manga>
	</div>
</template>

<script>
import anime from '@/components/userInfo/list/selectCollection/anime.vue';
import manga from '@/components/userInfo/list/selectCollection/manga.vue';
export default{
	name: 'selectCollection',
    components: {
        anime,
        manga
    }
}
</script>