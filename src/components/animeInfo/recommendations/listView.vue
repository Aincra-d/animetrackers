<template>
    <div>
        <div :key="rec.id" v-for="rec in recommendations" class="w-xs-95 w-sm-95 w-md-100 w-lg-100 w-xl-100 text-left text-light d-block my-2 mx-auto mx-lg-0 rec-container rounded">
            <div class="cover d-inline-block">
                <router-link :to="'/anime/'+rec.id+'/'+(rec.title.split(' ').join('-')).replace('/','-')">
                    <img v-lazy="rec.image" class="cover">
                </router-link>
            </div>

            <div class="info d-inline-block ml-2 text-left align-top">
                <router-link :to="'/anime/'+rec.id+'/'+(rec.title.split(' ').join('-')).replace('/','-')">
                    <span class="font-xs-12 font-15 font-weight-bold text-light">
                        <span v-if="screen<576">
                            {{rec.title.length>53 ? rec.title.substring(0,50)+'...' : rec.title}}
                        </span>

                        <span v-else>
                            {{rec.title}}
                        </span>
                    </span>
                    <br>
                </router-link>
                <span class="font-xs-12 font-15 font-weight-normal text-light">
                    {{rec.count}} {{rec.count===1 ? 'user' : 'users'}}
                </span>
            </div>

            <button :animeid="rec.id" @click="openModal('animeInfoModal',rec.id,rec.title)" class="float-right border-0 rounded bg-transparent py-1"><i class="fas fa-info-circle text-light fa-lg"></i></button>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'animeRecListView',
        props: {
            recommendations: Array,
            screen: Number
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

    .anime-info{
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