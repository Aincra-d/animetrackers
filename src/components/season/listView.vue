<template>
    <div>
        <div
        :key="animes[i-1].id"
        v-for="i in show"
        class="w-xs-95 w-sm-95 w-md-100 w-lg-100 w-xl-100 text-left text-light
        d-block my-2 mx-auto mx-lg-0 anime-container rounded position-relative">
        <scale-transition :duration="200">
                <div
                v-if="view!='list'"
                class="cover d-inline-block align-bottom">
                    <router-link :to="'/anime/'+animes[i-1].id+'/'+(animes[i-1].title.split(' ').join('-')).replace('/','-')">
                        <img
                        :title="animes[i-1].title"
                        :alt="animes[i-1].title"
                        v-lazy="animes[i-1].image"
                        :class="{'table-sm-cover': view === 'list-sm',
                                'table-lg-cover': view != 'list-sm',
                                'r18': animes[i-1].r18 }">
                    </router-link>
                </div>
            </scale-transition>

            <div
            class="d-inline-block ml-2 text-left align-top"
            :class="{'table-sm-info': view=='list-sm',
                    'table-lg-info': view=='list-lg',
                    'list-info': view=='list'}">
                <router-link :to="'/anime/'+animes[i-1].id+'/'+(animes[i-1].title.split(' ').join('-')).replace('/','-')">
                    <span
                    v-if="view!='list'"
                    class="font-xs-12 font-15 font-weight-bold text-light">
                        <span v-if="$root.screen<991">
                            {{
                                view=='list-sm'
                                ? animes[i-1].title.length>28 ? animes[i-1].title.substring(0,25)+'...' : animes[i-1].title
                                : animes[i-1].title.length>43 ? animes[i-1].title.substring(0,40)+'...' : animes[i-1].title
                            }}
                        </span>

                        <span v-else>
                            {{animes[i-1].title}}
                        </span>
                    </span>

                    <span v-else>
                        <span class="font-weight-bold text-light font-xs-12 font-15">
                            {{animes[i-1].title}}
                        </span>
                    </span>
                </router-link>

                <br>
                
                <span
                class="font-weight-normal text-light d-inline-block mr-2"
                :class="$root.screen<576 ? 'font-12' : 'font-15'">
                    <i
                    class="fas fa-star text-warning"
                    :class="$root.screen<576 ? 'fa-sm' : 'fa-md'">
                    </i>

                    {{animes[i-1].score ? animes[i-1].score : '-'}}
                </span>

                <span
                class="font-weight-normal text-light d-inline-block mr-2"
                :class="$root.screen<576 ? 'font-12' : 'font-15'">
                    <i class="fas fa-users text-light"
                    :class="$root.screen<576 ? 'fa-sm' : 'fa-md'">
                    </i>

                    {{animes[i-1].members ? animes[i-1].members : '-'}}
                </span>
               
                <span
                class="font-weight-normal text-light d-inline-block mr-2"
                :class="$root.screen<576 ? 'font-12' : 'font-15'">
                    <i
                    class="fas fa-calendar text-light"
                    :class="$root.screen<576 ? 'fa-sm' : 'fa-md'">
                    </i>

                    {{(animes[i-1].start_date && animes[i-1].start_date!='Invalid Date') ? animes[i-1].start_date.substring(0,10) : '-'}}
                </span>

                <i
                v-if="animes[i-1].status"
                class="fas fa-circle"
                :class="{'fa-xs': $root.screen < 576,
                'fa-sm': $root.screen > 576,
                'text-success': animes[i-1].status === 'Watching' || animes[i-1].status === 'Reading',
                'text-primary': animes[i-1].status === 'Completed',
                'text-warning': animes[i-1].status === 'On-hold',
                'text-danger': animes[i-1].status === 'Dropped',
                'text-secondary': animes[i-1].status === 'Plan to watch' || animes[i-1].status === 'Plan to read'}">
                </i>

                <i
                v-if="animes[i-1].r18"
                :class="{'fa-xs': $root.screen < 576,
                'fa-sm': $root.screen > 576,
                'ml-1': animes[i-1].status}"
                class="fas fa-exclamation-triangle text-danger">
                </i>

                <i
                v-if="animes[i-1].kids"
                class="fas fa-circle fa-xs text-success">
                </i>

                <div
                class="genres-container mt-lg-2"
                :class="view=='list' ? 'mb-2' : ''">
                    <!-- <router-link
                    :to="'/top/anime/genre/'+genre.mal_id+'/'+genre.name.split(' ').join('-')"
                    :key="genre.mal_id"
                    v-for="genre in animes[i-1].genres"> -->
                        <button
                        :key="genre.mal_id"
                        v-for="genre in animes[i-1].genres"
                        type="button"
                        class="btn btn-dark py-0 px-2 mr-1 btn-sm d-inline-block genre
                        font-weight-normal font-xs-11 font-sm-12 font-md-12 font-lg-13 font-xl-15">{{genre.name}}</button>
                    <!-- </router-link> -->
                </div>
            </div>

            <button
            @click="openModal('animeInfoModal',animes[i-1].id,animes[i-1].title)"
            class="float-right border-0 rounded bg-transparent py-1">
                <i class="fas fa-info-circle text-light fa-lg"></i>
            </button>

            <button
            @click="animes[i-1].storyToggled=!animes[i-1].storyToggled"
            class="position-absolute bottom-0 right-0 mr-1 border-0 rounded bg-transparent py-1">
                <i
                :class="animes[i-1].storyToggled ? 'fas fa-angle-up' : 'fas fa-angle-down'"
                class="text-light fa-lg"></i>
            </button>

            <slide-y-up-transition :duration="250">
                <p
                class="font-xs-12 font-sm-13 font-md-13 font-lg-14 font-xl-15 pointer m-1 p-1"
                @click="animes[i-1].storyToggled=!animes[i-1].storyToggled"
                v-if="animes[i-1].storyToggled">
                    {{animes[i-1].story}}
                </p>
            </slide-y-up-transition>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'seasonListView',
        props: {
            animes: Array,
            screen: Number,
            view: String,
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
        .table-sm-cover{
            width:60px;
            height:80px;
        }

        .table-sm-info{
            max-width: 65%;
        }

        .table-lg-cover{
            width:90px;
            height:120px;
        }

        .table-lg-info{
            max-width: 55%;
        }

        .list-info{
            max-width: 80%;
        }
    }

    @media(min-width: 991px){
        .table-sm-cover{
            width:80px;
            height:110px;
        }

        .table-sm-info{
            max-width: 80%;
        }

        .table-lg-cover{
            width:120px;
            height:180px;
        }

        .table-lg-info{
            max-width: 80%;
        }

        .list-info{
            max-width: 80%;
        }
    }

    .table-sm-cover, .table-lg-cover{
        border-top-left-radius: 5%;
        border-bottom-left-radius: 5%;
        object-fit: cover;
    }

    .anime-info{
        border-radius: 50%;
    }

    .anime-container{
        background-color: rgba(0,0,0,0.3);
        border-bottom-left-radius: 5%;
        border-top-left-radius: 5%;
    }

    .table-sm-info, .table-lg-info{
        white-space: pre-line;
    }

    .r18{
        -webkit-filter: blur(3px);
        filter: blur(3px);
    }

    .r18:hover{
        -webkit-filter: blur(0px);
        filter: blur(0px);
    }

    .genres-container{
        overflow-x: auto;
        white-space: nowrap;
    }

    .genres-container .genre{
        outline:none!important;
        border-radius: 1rem;
    }
</style>