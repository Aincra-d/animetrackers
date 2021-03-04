<template>
    <div>
        <scale-transition :duration="200">
            <div class="position-relative" v-if="view!='list'">
                <router-link :to="'/'
                +($route.params.type == 'characters'
                ? 'character'
                : $route.params.type)
                +'/'
                +item.id
                +'/'
                +($route.params.type != 'characters' && $route.params.type != 'people'
                ? (item.title.split(' ').join('-')).replace('/','-')
                : item.title.split(',').join('').split(' ').join('-'))">
                    <div>
                        <img
                        :title="item.title"
                        :alt="item.title"
                        v-lazy="item.cover"
                        :class="{
                        'list-sm-cover': view == 'list-sm',
                        'list-lg-cover': view == 'list-lg',
                        'r18': item.r18
                    }">

                        <span
                        class="font-weight-bold text-light position-absolute top-0 left-0"
                        style="text-shadow: 0px 0px 20px black;">
                            {{ index+($route.params.page*perPage-perPage)+1 }}
                        </span>
                    </div>
                </router-link>
            </div>
        </scale-transition>
    </div>
</template>

<script>
    export default{
        name: 'cover',
        props: {
            item: Object,
            index: Number,
            view: String
        },
        data(){
            return{
                perPage: this.$route.params.genreid || this.$route.params.studioid ? 100 : 50
            }
        }
    }
</script>

<style scoped>
   @media(max-width: 991px){
        .list-sm-cover{
            width:60px;
            height:80px;
        }

        .list-lg-cover{
            width:90px;
            height:120px;
        }
    }

    @media(min-width: 991px){
        .list-sm-cover{
            width:80px;
            height:110px;
        }

        .list-lg-cover{
            width:120px;
            height:180px;
        }
    }

    .r18{
        -webkit-filter: blur(3px);
        filter: blur(3px);
    }

    .r18:hover{
        -webkit-filter: blur(0px);
        filter: blur(0px);
    }

    .list-sm-cover, .list-lg-cover{
        border-top-left-radius: 5%;
        border-bottom-left-radius: 5%;
        background-position: center;
        object-fit: cover;
    }
</style>