<template>
    <div>
        <div
        :key="item.id"
        v-for="item in history"
        class="w-xs-95 w-sm-95 w-md-100 w-lg-100 w-xl-100 text-left text-light d-block my-2 mx-auto mx-lg-0 item-container rounded">
            <div
            v-if="!$route.params.username"
            class="cover d-inline-block align-bottom">
                <router-link :to="'/'+item.type+'/'+item.id+'/'+(item.title.split(' ').join('-')).replace('/','-')">
                    <img
                    :alt="item.title"
                    v-lazy="item.image"
                    class="table-sm-cover">
                </router-link>
            </div>

            <div
            class="d-inline-block ml-2 text-left align-top table-sm-info">
                <router-link :to="'/'+item.type+'/'+item.id+'/'+(item.title.split(' ').join('-')).replace('/','-')">
                    <span
                    v-if="!$route.params.username"
                    class="font-xs-12 font-15 font-weight-bold text-light">
                        <span v-if="$root.screen<991">
                            {{ item.title.length>53 ? item.title.substring(0,50)+'...' : item.title }}
                        </span>

                        <span v-else>
                            {{ item.title }}
                        </span>
                    </span>

                    <span v-else>
                        <span class="font-weight-bold text-light font-xs-12 font-15">
                            {{ item.title }}
                        </span>
                    </span>
                </router-link>

                <br>
                
                <span
                v-if="!$route.params.username"
                class="font-weight-bold text-light d-inline-block mr-2"
                :class="$root.screen<576 ? 'font-12' : 'font-15'">
                    <i
                    class="fas fa-star text-warning"
                    :class="$root.screen<576 ? 'fa-sm' : 'fa-md'">
                    </i>

                    {{item.score}}
                </span>

                <span
                class="font-weight-bold text-light d-inline-block mr-1"
                :class="$root.screen<576 ? 'font-12' : 'font-15'">
                    <i
                    class="fas mr-1"
                    :class="{'fa-sm': $root.screen < 576,
                    'fa-md': $root.screen > 576,
                    'fa-eye': item.type == 'anime',
                    'fa-book': item.type == 'manga'}"><!--CLASS-->
                    </i>

                    <span>{{ item.increment || item.progress || '-' }}</span>
                </span>

                <i
                class="fas fa-calendar text-light ml-1"
                :class="$root.screen<576 ? 'fa-xs' : 'fa-md'">
                </i>

                <span
                :class="$root.screen<576 ? 'font-12' : 'font-15'">
                    {{ item.updated }}
                </span>

                <i
                v-if="!$route.params.username"
                class="fas fa-circle ml-1"
                :class="{
                    'fa-xs': $root.screen<576,
                    'fa-sm': $root.screen>576,
                    'text-success': item.status=='Watching' || item.status=='Reading',
                    'text-primary': item.status=='Completed',
                    'text-warning': item.status=='On-hold',
                    'text-danger': item.status=='Dropped',
                    'text-secondary': item.status=='Plan to watch' || item.status=='Plan to read'
                }">
                </i>
            </div>

            <button 
            @click="$emit('open-modal',item.type+'InfoModal',item.id,item.title)"
            class="float-right border-0 rounded bg-transparent py-1">
                <i class="fas fa-info-circle text-light fa-lg"></i>
            </button>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'historyList',
        props: {
            history: Array
        }
    }
</script>

<style scoped>
   @media(max-width: 991px){
        .list-info{
            max-width: 80%;
        }
    }

    @media(min-width: 991px){
        .list-info{
            max-width: 80%;
        }
    }

    .history-container{
        background-color: rgba(0,0,0,0.3);
        border-bottom-left-radius: 5%;
        border-top-left-radius: 5%;
    }

     @media(max-width: 991px){
        .history-container .item-cover{
            width:110px;
            height:155px;
        }
    }

    @media(min-width: 991px){
        .history-container .item-cover{
            width:150px;
            height:220px;
        }
    }

    .history-container .item-cover{
        vertical-align: top;
        object-fit: cover;
    }

    .item-info{
        border-radius: 50%;
    }
</style>

<style scoped>
   @media(max-width: 991px){
        .table-sm-cover{
            width:60px;
            height:80px;
        }

        .table-sm-info{
            max-width: 65%;
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
    }

    .table-sm-cover{
        border-top-left-radius: 5%;
        border-bottom-left-radius: 5%;
        object-fit: cover;
    }

    .item-info{
        border-radius: 50%;
    }

    .item-container{
        background-color: rgba(0,0,0,0.3);
        border-bottom-left-radius: 5%;
        border-top-left-radius: 5%;
    }

    .table-sm-info{
        white-space: pre-line;
    }
</style>