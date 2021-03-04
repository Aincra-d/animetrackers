<template>
    <div>
        <div
        :key="item.id"
        v-for="item in items"
        class="w-xs-95 w-sm-95 w-md-100 w-lg-100 w-xl-100 text-left text-light d-block my-2 mx-auto mx-lg-0 item-container rounded">
            <scale-transition :duration="200">
                <div
                v-if="view!='list'"
                class="cover d-inline-block align-bottom">
                    <router-link :to="!editingCollection
                    ? '/'+$route.params.type+'/'+item.id+'/'+(item.title.split(' ').join('-')).replace('/','-')
                    : ''">
                        <img
                        :alt="item.title"
                        v-lazy="item.image"
                        :class="view=='table-sm' ? 'table-sm-cover' : 'table-lg-cover'">
                    </router-link>
                </div>
            </scale-transition>

            <div
            class="d-inline-block ml-2 text-left align-top"
            :class="{'table-sm-info': view=='table-sm',
                    'table-lg-info': view=='table-lg',
                    'list-info': view=='list'}">
                <router-link :to="!editingCollection
                ? '/'+$route.params.type+'/'+item.id+'/'+(item.title.split(' ').join('-')).replace('/','-')
                : ''">
                    <span
                    v-if="view!='list'"
                    class="font-xs-12 font-15 font-weight-bold text-light">
                        <span v-if="$root.screen<991">
                            {{
                                view=='table-sm'
                                ? item.title.length > 53 ? item.title.substring(0,50)+'...' : item.title
                                : item.title.length > 73 ? item.title.substring(0,70)+'...' : item.title
                            }}
                        </span>

                        <span v-else>
                            {{item.title}}
                        </span>
                    </span>

                    <span v-else>
                        <span class="font-weight-bold text-light font-xs-12 font-15">
                            {{item.title}}
                        </span>
                    </span>
                </router-link>

                <br>
                
                <span
                class="font-weight-bold text-light d-inline-block mr-2"
                :class="$root.screen < 991 ? 'font-12' : 'font-15'">
                    <i
                    class="fas fa-star text-warning"
                    :class="$root.screen < 991 ? 'fa-sm' : 'fa-md'"></i>
                    {{item.score}}
                </span>

                <span
                class="font-weight-bold text-light d-inline-block mr-2"
                :class="$root.screen < 991 ? 'font-12' : 'font-15'">
                    <i
                    class="fas text-light"
                    :class="{'fa-sm': $root.screen < 991, 'fa-md': $root.screen > 991, 'fa-eye': $route.params.type=='anime', 'fa-book': $route.params.type=='manga'}"></i>
                    {{item.progress ? item.progress : '0'}}
                </span>

                <i
                class="fas fa-circle"
                :class="{'fa-xs': $root.screen < 576,
                'fa-sm': $root.screen > 576,
                'text-success': item.status === 1 || item.status === 'Watching' || item.status === 'Reading',
                'text-primary': item.status === 2 || item.status === 'Completed',
                'text-warning': item.status === 3 || item.status === 'On-hold',
                'text-danger': item.status === 4 || item.status === 'Dropped',
                'text-secondary': item.status === 6 || item.status === 'Plan to watch' || item.status === 'Plan to read'}">
                </i>
            </div>

            <button
            v-if="!editingCollection"
            @click="$emit('open-modal',$route.params.type+'InfoModal',item.id,item.title)"
            class="float-right border-0 rounded bg-transparent py-1">
                <i class="fas fa-info-circle text-light fa-lg"></i>
            </button>

            <button
            v-else
            @click="items.splice(i,1)"
            class="float-right bg-transparent border-0 item-info py-1">
                <i class="fas fa-times text-danger rounded fa-lg"></i>
            </button>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'itemList',
        props: {
            items: Array,
            view: String,
            editingCollection: Boolean
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

    .item-info{
        border-radius: 50%;
    }

    .item-container{
        background-color: rgba(0,0,0,0.3);
        border-bottom-left-radius: 5%;
        border-top-left-radius: 5%;
    }

    .table-sm-info, .table-lg-info{
        white-space: pre-line;
    }
</style>