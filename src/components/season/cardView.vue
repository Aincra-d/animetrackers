<template>
    <div>
        <div
        :key="animes[i-1].id"
        v-for="i in show"
        class="d-inline-block ml-2 my-1 anime-container rounded text-left">
            <div class="position-relative">
                <router-link :to="'/anime/'+animes[i-1].id+'/'+(animes[i-1].title.split(' ').join('-')).replace('/','-')">
                    <img
                    :alt="animes[i-1].title"
                    :title="animes[i-1].title"
                    v-lazy="animes[i-1].image"
                    class="rounded anime-cover"
                    :class="animes[i-1].r18 ? 'r18' : ''">
                </router-link>

                <button 
                @click="openModal('animeInfoModal',animes[i-1].id,animes[i-1].title)"
                class="position-absolute top-0 right-0 bg-transparent border-0 anime-info py-1">
                    <i
                    style="text-shadow: 0px 0px 5px black"
                    class="fas fa-info-circle text-light rounded fa-lg">
                    </i>
                </button>  

                <span
                class="position-absolute top-2 left-2 rounded px-1 mb-1 anime-stat font-weight-normal text-light"
                :class="$root.screen<991 ? 'font-11' : 'font-13'">
                    <i
                    class="fas fa-star text-warning"
                    :class="$root.screen<991 ? 'fa-sm' : 'fa-md'">
                    </i>
                    {{animes[i-1].score || '-'}}

                    <i
                    v-if="animes[i-1].status"
                    class="fas fa-circle fa-sm"
                    :class="{'text-success': animes[i-1].status === 'Watching' || animes[i-1].status === 'Reading',
                    'text-primary': animes[i-1].status === 'Completed',
                    'text-warning': animes[i-1].status === 'On-hold',
                    'text-danger': animes[i-1].status === 'Dropped',
                    'text-secondary': animes[i-1].status === 'Plan to watch' || animes[i-1].status === 'Plan to read'}">
                    </i>

                    <i
                    v-if="animes[i-1].kids"
                    class="fas fa-circle fa-xs text-success">
                    </i>

                    <i
                    v-if="animes[i-1].r18"
                    :class="{'fa-xs': $root.screen < 576,
                    'fa-sm': $root.screen > 576,
                    'ml-1': animes[i-1].status}"
                    class="fas fa-exclamation-triangle text-danger">
                    </i>
                </span>

                <span
                class="position-absolute bottom-2 left-2 rounded px-1 anime-stat font-weight-normal text-light"
                :class="$root.screen<991 ? 'font-11' : 'font-13'">
                    <i
                    class="fas fa-users text-light"
                    :class="$root.screen<991 ? 'fa-sm' : 'fa-md'">
                    </i>
                    {{animes[i-1].members || '-'}}
                </span>
            </div>

            <div class="w-100 bg-dark text-light position-relative left-0 text-left" :class="$root.screen>991 ? 'top-80' : 'top-70'" style="white-space: nowrap;">
                <router-link :to="'/anime/'+animes[i-1].id+'/'+(animes[i-1].title.split(' ').join('-')).replace('/','-')">
                    
                    <span
                    v-if="$root.screen<991"
                    class="font-12 font-weight-bold text-light">
                        {{animes[i-1].title.length > 15 ? animes[i-1].title.substring(0,12)+'...' : animes[i-1].title}}
                    </span>

                    <span
                    v-else
                    class="font-12 font-weight-bold text-light">
                        {{animes[i-1].title.length > 21 ? animes[i-1].title.substring(0,18)+'...' : animes[i-1].title}}
                    </span>
                    <br>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'seasonCardView',
        props: {
            animes: Array,
            screen: Number,
            show: Number
        },
        methods: {
            openModal(ref,id,title){
                this.$emit('open-modal',ref,id,title)
            }
        }
    }
</script>

<style scoped>
    @media(max-width: 991px){
        .anime-container div:first-child .anime-cover{
            width:110px;
            height:155px;
        }
    }

    @media(min-width: 991px){
        .anime-container div:first-child .anime-cover{
            width:150px;
            height:220px;
        }
    }

    .anime-container .anime-cover.r18{
        filter: blur(5px);
    }

    .anime-container .anime-cover.r18:hover{
        filter: blur(0px);
    }

    .anime-container .anime-cover{
        vertical-align: top;
        object-fit: cover;
    }

    .anime-info{
        border-radius: 50%;
    }

    .anime-stat{
        background-color: rgba(0,0,0,0.65);
    }
</style>