<template>
    <div>
        <div :key="rec.id" v-for="rec in recommendations" class="d-inline-block ml-2 my-1 recommendations-container rounded text-left">
            <div class="position-relative">
                <router-link :to="'/manga/'+rec.id+'/'+(rec.title.split(' ').join('-')).replace('/','-')">
                    <img v-lazy="rec.image" class="rounded">
                </router-link>
                
                <button :mangaid="rec.id" @click="openModal('mangaInfoModal',rec.id,rec.title)" class="position-absolute top-0 right-0 bg-transparent border-0 manga-info py-1"><i class="fas fa-info-circle text-light rounded fa-lg"></i></button>
            </div>
            <div class="w-100 bg-dark text-light position-relative left-0 text-left" :class="screen>991 ? 'top-80' : 'top-70'" style="white-space: nowrap;">
                <router-link :to="'/manga/'+rec.id+'/'+(rec.title.split(' ').join('-')).replace('/','-')">
                    <span v-if="screen<991" class="font-12 font-weight-bold text-light">
                        {{rec.title.length > 15 ? rec.title.substring(0,12)+'...' : rec.title}}
                    </span>

                    <span v-else class="font-12 font-weight-bold text-light">
                        {{rec.title.length > 21 ? rec.title.substring(0,18)+'...' : rec.title}}
                    </span>
                    <br>

                    <span class="font-12 font-weight-bold text-light">
                        {{rec.count}} {{rec.count===1 ? 'user' : 'users'}}
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'mangaRecCardView',
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
        .recommendations-container div:first-child img{
            width:110px;
            height:155px;
        }
    }

    @media(min-width: 991px){
        .recommendations-container div:first-child img{
            width:150px;
            height:220px;
        }
    }

    .recommendations-container div:first-child img{
        vertical-align: top;
        object-fit: cover;
    }

    .manga-info{
        border-radius: 50%;
    }
</style>