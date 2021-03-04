<template>
    <div>
        <div
        :key="item.id"
        v-for="item in recommendations"
        class="w-xs-95 w-sm-95 w-md-100 w-lg-100 w-xl-100 text-left text-light d-block my-2 mx-auto mx-lg-0 rec-container rounded">
            <div class="cover d-inline-block">
                <router-link :to="'/'+$route.params.type+'/'+item.id+'/'+(item.title.split(' ').join('-')).replace('/','-')">
                    <img
                    :alt="item.title"
                    v-lazy="item.image"
                    class="cover">
                </router-link>
            </div>

            <div class="info d-inline-block ml-2 text-left align-top">
                <router-link :to="'/'+$route.params.type+'/'+item.id+'/'+(item.title.split(' ').join('-')).replace('/','-')">
                    <span class="font-xs-12 font-15 font-weight-bold text-light">
                        <span
                        v-if="$root.screen<576">
                            {{item.title.length>53 ? item.title.substring(0,50)+'...' : item.title}}
                        </span>

                        <span v-else>
                            {{item.title}}
                        </span>
                    </span>
                    <br>
                </router-link>
                <span class="font-xs-12 font-15 font-weight-normal text-light">
                    {{item.count}} {{item.count === 1 ? 'user' : 'users'}}

                    <i
                    v-if="item.status"
                    class="fas fa-circle"
                    :class="{'fa-xs': $root.screen < 576,
                    'fa-sm': $root.screen > 576,
                    'text-success': item.status === 'Watching' || item.status === 'Reading',
                    'text-primary': item.status === 'Completed',
                    'text-warning': item.status === 'On-hold',
                    'text-danger': item.status === 'Dropped',
                    'text-secondary': item.status === 'Plan to watch' || item.status === 'Plan to read'}">
                    </i>
                </span>
            </div>

            <button
            @click="$emit('open-modal',$route.params.type+'InfoModal',item.id,item.title)"
            class="float-right border-0 rounded bg-transparent py-1">
                <i class="fas fa-info-circle text-light fa-lg"></i>
            </button>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'titleRecListView',
        props: {
            recommendations: Array,
        }
    }
</script>

<style scoped>
   @media(max-width: 991px){
        img{
            width:60px;
            height:80px;
        }

        .info{
            max-width: 65%;
        }
    }

    @media(min-width: 991px){
        img{
            width:80px;
            height:110px;
        }

        .info{
            max-width: 80%;
        }
    }

    img{
        border-top-left-radius: 5%;
        border-bottom-left-radius: 5%;
        background-position: center;
        background-size: cover;
    }

    .title-info{
        border-radius: 50%;
    }

    .rec-container{
        background-color: rgba(0,0,0,0.3);
        border-bottom-left-radius: 5%;
        border-top-left-radius: 5%;
    }

    .info{
        white-space: pre-line;
    }
</style>