<template>
    <div>
        <table class="table table-dark w-100 text-light font-weight-normal text-left reviews-container rounded">
          <tbody>
            <tr
            :key="review.id"
            v-for="review in reviews">
              <td class="text-left w-xs-75 w-sm-85 w-md-85 w-lg-85 w-xl-85 align-middle m-0 px-0 pt-2 pb-1 position-relative">
                <button 
                    @click="openModal($route.params.type+'InfoModal',review.id,review.title)"
                    class="position-absolute top-0 left-0 bg-transparent border-0 anime-info py-1 mt-2">
                    <i
                    style="text-shadow: 0px 0px 5px black;"
                    class="fas fa-info-circle text-light rounded fa-lg">
                    </i>
                </button>  

                <button
                @click="review.toggled=!review.toggled"
                style="outline:0;"
                class="w-100 bg-transparent text-light border-0 outline-0 text-left">
                    <!-- <router-link :to="'/user/'+review.reviewer.username.split(' ').join('-')">
                        <img
                        :title="review.reviewer.username"
                        :alt="review.reviewer.username"
                        class="d-inline-block mr-2 user-image"
                        v-lazy="review.reviewer.image">
                    </router-link> -->

                    <span class="float-right top-0 right-0 mr-2">
                        <i class="fas fa-thumbs-up fa-sm text-light"></i>
                        {{ review.votes }}
                    </span>

                    <router-link :to="'/'+$route.params.type+'/'+review.id+'/'+review.title.split(' ').join('-').replace('/','-')">
                        <img
                        class="review-cover float-left mr-2"
                        v-lazy="review.cover"
                        :alt="review.title"
                        :title="review.title">
                    </router-link>
                    <span class="text-light">
                        <h6 class="text-light font-xs-13 font-normal m-0 mb-1">
                            {{ review.title }} - {{ review.scores.overall }}

                            <i
                            v-if="review.status"
                            class="fas fa-circle fa-sm"
                            :class="{'text-success': review.status === 'Watching' || review.status === 'Reading',
                            'text-primary': review.status === 'Completed',
                            'text-warning': review.status === 'On-hold',
                            'text-danger': review.status === 'Dropped',
                            'text-secondary': review.status === 'Plan to watch' || review.status === 'Plan to read'}">
                            </i>
                        </h6>
                        
                    </span>

                    <!-- <router-link :to="'/'+$route.params.type+'/'+review.id+'/'+review.title.split(' ').join('-').replace('/','-')">
                        <img
                        class="review-cover float-right"
                        v-lazy="review.cover"
                        :alt="review.title"
                        :title="review.title">
                    </router-link> -->

                    

                    <ul class="list-unstyled font-12">
                        <li class="d-inline font-italic">
                            Story: {{ review.scores.story }}
                        </li>

                        <li
                        v-if="$route.params.type=='anime'"
                        class="d-inline font-italic">
                            Animation: {{ review.scores.animation }}
                        </li>

                        <li
                        v-else
                        class="d-inline font-italic">
                            Art: {{ review.scores.art }}
                        </li>

                        <li
                        v-if="$route.params.type=='anime'"
                        class="d-inline font-italic">
                            Sound: {{ review.scores.sound }}
                        </li>

                        <li class="d-inline font-italic">
                            Character: {{ review.scores.character }}
                        </li>

                        <li class="d-inline font-italic">
                            Enjoyment: {{ review.scores.enjoyment }}
                        </li>

                        <br>

                        <li>
                            <ul class="list-unstyled font-12 mt-1">
                                <li class="d-inline font-italic">
                                    <i class="fas fa-user"></i>
                                    {{ review.reviewer.username }}
                                </li>

                                <li class="d-inline font-italic ml-1">
                                    <i
                                    class="fas"
                                    :class="$route.params.type === 'anime' ? 'fa-eye' : 'fa-book'">
                                    </i>

                                    {{ review.reviewer.progress }}
                                </li>

                                <li class="d-inline font-italic ml-1">
                                    <i class="fas fa-calendar"></i>
                                    {{ review.date }}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </button>
                <slide-y-down-transition :duration="250">
                    <p
                    style="line-height: 23px;"
                    v-if="review.toggled"
                    class="font-13 font-weight-normal review w-100">
                        {{ review.review.replace(new RegExp("\\\\n", "g"), "") }}
                    </p>
                </slide-y-down-transition>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'review',
    props: {
        reviews: Array
    },
    methods: {
        openModal(ref,id,title){
            this.$emit('open-modal',ref,id,title)
        }
    }
}
</script>

<style scoped>
    @media(max-width: 576px){
        .user-image{
            height:40px;
            width:40px;
        }

        .review-cover{
            height:90px;
            width:60px;
        }
    }

    @media(min-width: 576px) and (max-width: 991px){
        .user-image{
            height:40px;
            width:40px;
        }

        .review-cover{
            height:110px;
            width:70px;
        }
    }

    @media(min-width: 991px){
        .user-image{
            height:50px;
            width:50px;
        }

        .review-cover{
            height:130px;
            width:90px;
        }
    }

    .user-image{
        border-radius: 100%;
    }

    .review{
        white-space: pre-wrap; 
    }

    .reviews-container{
        background-color: rgba(0,0,0,0.3)
    }
</style>