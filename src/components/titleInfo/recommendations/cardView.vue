<template>
    <div>
        <div
        :style="{whiteSpace: slider ? 'nowrap' : 'normal'}"
        class="position-relative recommendations-container">
            <div
            :key="item.id"
            v-for="item in recommendations"
            class="d-inline-block ml-2 my-1 recommendation rounded text-left">
                <div class="position-relative">
                    <router-link :to="'/'+$route.params.type+'/'+item.id+'/'+(item.title.split(' ').join('-')).replace('/','-')">
                        <img
                        :alt="item.title"
                        v-lazy="item.image"
                        class="rounded cover">
                    </router-link>
                    
                    <button 
                    @click="$emit('open-modal',$route.params.type+'InfoModal',item.id,item.title)"
                    class="position-absolute top-0 right-0 bg-transparent border-0 title-info py-1">
                        <i
                        style="text-shadow: 0px 0px 5px black"
                        class="fas fa-info-circle text-light rounded fa-lg"></i>
                    </button>

                    <span
                    style="background-color: rgba(0,0,0,0.65);"
                    class="position-absolute top-2 left-2 rounded px-1 font-weight-normal text-light"
                    :class="$root.screen<991 ? 'font-11' : 'font-13'">
                        {{item.count}} {{item.count === 1 ? 'user' : 'users'}}

                        <i
                        v-if="item.status"
                        class="fas fa-circle fa-sm"
                        :class="{'text-success': item.status === 'Watching' || item.status === 'Reading',
                        'text-primary': item.status === 'Completed',
                        'text-warning': item.status === 'On-hold',
                        'text-danger': item.status === 'Dropped',
                        'text-secondary': item.status === 'Plan to watch' || item.status === 'Plan to read'}">
                        </i>
                    </span>
                </div>

                <div
                class="w-100 bg-dark text-light position-relative left-0 text-left"
                :class="$root.screen>991 ? 'top-80' : 'top-70'"
                style="white-space: nowrap;">
                    <router-link :to="'/'+$route.params.type+'/'+item.id+'/'+(item.title.split(' ').join('-')).replace('/','-')">
                        <span
                        v-if="$root.screen<991"
                        class="font-12 font-weight-bold text-light">
                            {{item.title.length > 15
                                ? item.title.substring(0,12)+'...'
                                : item.title}}
                        </span>

                        <span
                        v-else
                        class="font-12 font-weight-bold text-light">
                            {{item.title.length > 21
                                ? item.title.substring(0,18)+'...'
                                : item.title}}
                        </span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'titleRecCardView',
        props: {
            recommendations: Array,
            slider: Boolean
        }
    }
</script>

<style scoped>
    @media(max-width: 991px){
        .recommendation div:first-child .cover{
            width:110px;
            height:155px;
        }
    }

    @media(min-width: 991px){
        .recommendation div:first-child .cover{
            width:150px;
            height:220px;
        }
    }

    .recommendation div:first-child .cover{
        vertical-align: top;
        object-fit: cover;
    }

    .title-info{
        border-radius: 50%;
    }

    .recommendations-container{
        overflow-x: auto;
    }
</style>