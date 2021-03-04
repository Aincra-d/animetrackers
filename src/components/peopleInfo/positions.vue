<template>
	<div>
		<ui-collapsible
        title="Anime staff positions"
        class="text-dark bg-transparent anime-roles"
        open>
            <div class="text-center">
                <div
                :key="position.id"
                v-for="position in positions"
                class="d-inline-block ml-2 my-1 positions-container rounded text-left position-relative">
                    <div class="position-relative">
                        <router-link :to="'/anime/'+position.anime.mal_id+'/'+(position.anime.name.split(' ').join('-')).replace('/','-')">
                            <img
                            :alt="position.anime.name"
                            v-lazy="position.anime.image_url"
                            class="rounded anime-cover">

                            <span
                            class="w-100 position-absolute bottom-0 left-0 px-1 font-weight-normal text-light position"
                            :class="$root.screen < 991 ? 'font-10' : 'font-11'">

                                {{ position.position }}
                            </span>
                        </router-link>
                    </div>

                    <div class="w-100 bg-dark text-light">
                        <router-link :to="'/anime/'+position.anime.mal_id+'/'+(position.anime.name.split(' ').join('-')).replace('/','-')">
                            <span
                            v-if="$root.screen<991"
                            class="font-12 font-weight-bold text-light">
                                {{
                                    position.anime.name.length > 13
                                    ? position.anime.name.substring(0,10)+'...'
                                    : position.anime.name
                                }}
                            </span>

                            <span
                            v-else
                            class="font-12 font-weight-bold text-light">
                                {{
                                    position.anime.name.length > 20
                                    ? position.anime.name.substring(0,17)+'...'
                                    : position.anime.name
                                }}
                            </span>
                        </router-link>
                    </div>

                    <button 
                    @click="$emit('open-modal','animeInfoModal',position.anime.mal_id,position.anime.name)"
                    class="position-absolute top-0 right-0 bg-transparent border-0 anime-info py-1">
                        <i
                        style="text-shadow: 0px 0px 5px black;"
                        class="fas fa-info-circle text-light rounded fa-lg">
                        </i>
                    </button>

                    <i
                    style="text-shadow: 0px 0px 5px black;"
                    v-if="position.status"
                    class="fas fa-circle fa-md position-absolute top-2 left-2"
                    :class="{'text-success': position.status === 'Watching',
                    'text-primary': position.status === 'Completed',
                    'text-warning': position.status === 'On-hold',
                    'text-danger': position.status === 'Dropped',
                    'text-secondary': position.status === 'Plan to watch'}">
                    </i>
                </div>
            </div>
        </ui-collapsible>
	</div>
</template>

<script>
	export default{
		name: 'positions',
		props: {
			positions: Object
		}
	}
</script>

<style scoped>
    @media(max-width: 991px){
        .positions-container div:first-child .anime-cover{
            width:110px;
            height:155px;
        }
    }

    @media(min-width: 991px){
        .positions-container div:first-child .anime-cover{
            width:150px;
            height:220px;
        }
    }

    .positions-container div:first-child .anime-cover{
        vertical-align: bottom;
        object-fit: cover;
    }

    .position{
        border-bottom-left-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
        background-color: rgba(0,0,0,0.65);
    }
</style>