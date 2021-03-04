<template>
	<div>
		<b-dropdown id="dropdown-1" text="History" class="p-0 m-0 bg-transparent border-0 text-light font-weight-bold">
            <b-dropdown-item>
                <router-link class="text-dark" :to="{name: $route.name, params: {page: 1}}">
                    All
                </router-link>
            </b-dropdown-item>

            <b-dropdown-item>
                <router-link class="text-dark" :to="{name: $route.name, params: {type: 'anime', page: 1} }">
                    Anime
                </router-link>
            </b-dropdown-item>

            <b-dropdown-item>
                <router-link class="text-dark" :to="{name: $route.name, params: {type: 'manga', page: 1} }">
                    Manga
                </router-link>
            </b-dropdown-item>
        </b-dropdown>
	</div>
</template>

<script>
	export default{
		name: 'selectType'
    }
</script>