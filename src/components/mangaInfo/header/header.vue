<template>
    <div>
        <div :style="{backgroundImage: 'url('+info.image+')'}" class="w-100 manga-info-container d-flex align-items-end">
            <img :src="info.image" class="img-fluid ml-3 position-relative bottom-0 left-5">
        </div>
        <div class="w-100 manga-info my-1 bg-dark text-light">
            <div class="w-80 d-inline-block">
                <h6>
                    {{info.title}}
                </h6>
            </div>

            <div class="w-20 d-inline-block text-right">
                <h6 class="text-primary mr-1">
                    <button style="outline:0;" class="bg-transparent border-0 text-primary font-weight-bold">Edit</button>
                </h6>
            </div>

            <stats :stats="stats"></stats>
        </div>
    </div>
</template>

<script>
    import stats from '@/components/mangaInfo/header/stats.vue';
    export default{
        name: 'header',
        props: {
            info: Object,
            stats: Object
        },
        components: {
            stats
        }
    }
</script>

<style scoped>
    .manga-info-container{
        width: 100vw;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: top;
        background-attachment: inherit;
    }
    .manga-info{
        opacity: 0.9;
        border-bottom: 2px solid white;
    }

    @media(max-width: 991px){
        .manga-info-container{
            height: 200px;
            max-height: 200px;   
        }
        img{
            height: 150px;
            width: 100px;
        }
    }

    @media(min-width: 991px){
        .manga-info-container{
            height: 350px;
            max-height: 350px;   
        }
        img{
            height: 200px;
            width: 140px;
        }
    }
    img{
        object-fit: cover;
    }
</style>