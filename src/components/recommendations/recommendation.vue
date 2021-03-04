<template>
    <div>
        <div
        style="white-space: normal;"
        class="w-100 text-center recommendation-container position-relative text-light">
            <div
            :key="index"
            v-for="(rec,index) in recommendations"
            class="w-xs-98 mx-auto w-sm-48 w-md-48 w-lg-48 w-xl-48
            d-inline-block my-1 align-middle mx-sm-1 position-relative"
            :class="{'pointer': rec.toggled}"
            :title="rec.toggled ? 'Click to hide' : ''">
                <!-- <zoom-center-transition :duration="200"> -->
                    <div
                    @click="rec.toggled=!rec.toggled"
                    v-if="rec.toggled"
                    class="w-100 text-container position-absolute top-0 left-0">                    
                        <p class="font-xs-11 font-12 text-light p-2">
                            {{rec.text}}
                        </p>

                        <span class="font-12">
                            <span>By</span>

                            <router-link
                            :to="'/user/'+rec.user">
                                {{rec.user}}
                            </router-link>

                           <!--  <span v-else>
                                {{rec.user}}
                            </span> -->
                            
                            <span>
                                {{rec.date}}
                            </span>
                        </span>
                    </div>
                <!-- </zoom-center-transition> -->

                <button
                @click="rec.toggled=!rec.toggled"
                class="pt-0 pb-1 px-1 rounded mb-1 btn-dark shadow-none btn-sm
                position-absolute bottom-0 font-12 left-37">
                    <i>Read similarity</i>
                </button>

                <div class="w-50 d-inline-block text-left float-left recommendation-cover">
                    <router-link
                    class="text-left"
                    :to="'/'+$route.params.type
                    +'/'+rec.title_id
                    +'/'+rec.title_name.split(' ').join('-').replace('/','')">
                        <img
                        :alt="rec.title_name"
                        :title="rec.title_name"
                        v-lazy="rec.title_cover"
                        class="cover recommendation-cover">
                    </router-link>

                    <span class="float-right w-50 font-xs-11 font-sm-11 font-md-11
                    font-lg-12 font-xl-13 mr-3 mr-sm-2 mr-md-4 mr-lg-0 title">
                        {{rec.title_name}}
                    </span>

                    <button 
                    @click="openModal($route.params.type+'InfoModal',rec.title_id,rec.title_name)"
                    class="position-absolute top-0 left-0 bg-transparent border-0 anime-info py-1">
                        <i
                        style="text-shadow: 0px 0px 5px black"
                        class="fas fa-info-circle text-light rounded fa-lg">
                        </i>
                    </button>  
                </div>

                <div class="w-50 d-inline-block text-right float-right recommendation-cover2">
                    <span class="float-left w-50 font-xs-11 font-sm-11 font-md-11
                    font-lg-12 font-xl-13 ml-3 ml-sm-2 ml-md-4 ml-lg-0 title">
                        {{rec.rec_name}}
                    </span>

                    <router-link
                    class="text-right"
                    :to="'/'+$route.params.type
                    +'/'+rec.rec_id
                    +'/'+rec.rec_name.split(' ').join('-').replace('/','')">
                        <img
                        :alt="rec.rec_name"
                        :title="rec.rec_name"
                        v-lazy="rec.rec_cover"
                        class="cover recommendation-cover2">
                    </router-link>

                    <button 
                    @click="openModal($route.params.type+'InfoModal',rec.rec_id,rec.rec_name)"
                    class="position-absolute top-0 right-0 bg-transparent border-0 anime-info py-1">
                        <i
                        style="text-shadow: 0px 0px 5px black"
                        class="fas fa-info-circle text-light rounded fa-lg">
                        </i>
                    </button>  
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'titleRecommendations',
    props: {
        recommendations: Array
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
      .cover{
        width:65px;
        height:110px;
      }
      .recommendation-container div:not(.text-container){
        height:110px;
      }
    }

    @media(min-width: 992px) and (max-width: 1200px){
      .cover{
        width:90px;
        height:140px;
      }
      .recommendation-container div:not(.text-container){
        height:140px;
      }
    }

    @media(min-width: 1201px){
      .cover{
        width:90px;
        height:140px;
      }
      .recommendation-container div:not(.text-container){
        height:140px;
      }
    }
    
    .cover{
      object-fit: cover;
    }

    .title{
        overflow:hidden;
        height:80%;
    }

    .recommendation-cover2{
      border-top-right-radius: 5%;
      border-bottom-right-radius: 5%;
    }

    .recommendation-cover{
      border-top-left-radius: 5%;
      border-bottom-left-radius: 5%;
    }

    .recommendation-container div:not(.text-container){
      background-color: rgba(0,0,0,0.3);
    }

    .text-container{
        background-color: rgba(0,0,0,0.8);
        overflow-y: auto;
        z-index: 10;
        height:100%;
    }
</style>