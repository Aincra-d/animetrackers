<template>
    <div>
        <div :style="{backgroundImage: 'url('+(/*cover ||*/ info.image)+')'}" class="w-100 title-info-container d-flex align-items-end position-relative">
            <div class="cover-layer"></div>

            <img :alt="info.title" :title="info.title" :src="info.image" class="img-fluid ml-3 cover-picture">

            <router-link :to="from">
                <button type="button" class="btn border-0 bg-light text-danger btn-sm position-absolute top-0 right-0 mr-1 mt-1">
                    <i class="fas fa-times fa-lg"></i>
                </button>
            </router-link>
        </div>

        <div class="w-100 title-info my-1 bg-dark text-light position-relative">
            <div class="w-80 d-inline-block">
                <h6>
                    {{info.title}}
                </h6>
            </div>

           <!--  <div class="w-20 d-inline-block text-right">
                <h6 class="text-primary mr-1">
                    <button
                    style="outline:0;"
                    class="bg-transparent border-0 text-primary font-weight-bold">
                        Edit
                    </button>
                </h6>
            </div> -->

             <div class="w-20 d-inline-block text-right position-absolute top-0 right-0">
                <h6 class="text-primary mr-1">
                    <a
                    target="_blank"
                    :href="'https://myanimelist.net/'+$route.params.type+'/'+$route.params.titleid">
                        <button
                        style="outline:0;"
                        class="border-0 text-light bg-primary rounded font-weight-bold outline-none">
                            <i class="fas fa-external-link-alt"></i>
                            MAL
                        </button>
                    </a>
                </h6>
            </div>

            <stats :stats="stats"></stats>
        </div>
    </div>
</template>

<script>
    import stats from '@/components/titleInfo/header/stats.vue';
    export default{
        name: 'header',
        props: {
            info: Object,
            stats: Object,
            from: String
            // cover: String
        },
        components: {
            stats
        }
    }
</script>

<style scoped>
    .title-info-container{
        width: 100vw;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: top;
        background-attachment: inherit;
    }

    .cover-layer{
        background-color: rgba(0,0,0,0.5);
        width: 100%;
        height: 100%;
    }

    .title-info{
        opacity: 0.9;
        border-bottom: 2px solid white;
    }

    @media(max-width: 991px){
        .title-info-container{
            height: 200px;
            max-height: 200px;   
        }
        .cover-picture{
            height: 150px;
            width: 100px;
        }
    }

    @media(min-width: 991px){
        .title-info-container{
            height: 350px;
            max-height: 350px;   
        }
        .cover-picture{
            height: 200px;
            width: 140px;
        }
    }
    .cover-picture{
        object-fit: cover;
        position: absolute;
        left:5%;
        bottom:0%;
    }
</style>