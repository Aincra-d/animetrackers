<template>
    <div>
        <table class="table table-dark w-100 text-light font-weight-bold text-left reviews-container rounded">
          <tbody>
            <tr
            :key="rev.id"
            v-for="rev in reviews">
              <td class="text-left w-xs-75 w-sm-85 w-md-85 w-lg-85 w-xl-85 align-middle m-0 px-0 pt-2 pb-1">
                <button
                @click="rev.toggled=!rev.toggled"
                style="outline:0;"
                class="w-100 bg-transparent text-light font-weight-bold border-0 outline-0 text-left">
                    <router-link :to="'/user/'+rev.reviewer.username.split(' ').join('-')">
                        <img
                        :title="rev.reviewer.username"
                        :alt="rev.reviewer.username"
                        v-lazy="rev.reviewer.image"
                        class="d-inline-block mr-2 user-image">
                    </router-link>

                    <router-link :to="'/user/'+rev.reviewer.username.split(' ').join('-')">
                        <h6 class="d-inline-block text-light">
                            {{rev.reviewer.username}} - {{rev.scores.overall}}
                        </h6>
                    </router-link>

                     <span class="float-right mr-2">
                        <i class="fas fa-thumbs-up fa-sm text-light"></i>

                        {{rev.helpful_count}}
                    </span>

                    <br>

                    <ul class="list-unstyled font-12 font-weight-normal font-italic">
                        <li class="d-inline">
                            Story: {{rev.scores.story}}
                        </li>

                        <li
                        v-if="$route.params.type === 'anime'"
                        class="d-inline">
                            Animation: {{rev.scores.animation}}
                        </li>

                        <li
                        v-else
                        class="d-inline">
                            Art: {{rev.scores.art}}
                        </li>

                        <li
                        v-if="$route.params.type === 'anime'"
                        class="d-inline">
                            Sound: {{rev.scores.sound}}
                        </li>

                        <li class="d-inline">
                            Character: {{rev.scores.character}}
                        </li>

                        <li class="d-inline">
                            Enjoyment: {{rev.scores.enjoyment}}
                        </li>
                    </ul>

                    <slide-y-down-transition :duration="250">
                        <p style="line-height: 23px;" v-show="rev.toggled" class="font-13 font-weight-normal review w-100">
                            {{rev.review.replace(new RegExp("\\\\n", "g"), "")}}
                        </p>
                    </slide-y-down-transition>
                </button>
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
    }
}
</script>

<style scoped>
    @media(max-width: 576px){
        .user-image{
            height:30px;
            width:30px;
        }
    }

    @media(max-width: 991px){
        .user-image{
            height:40px;
            width:40px;
        }
    }

    @media(min-width: 991px){
        .user-image{
            height:50px;
            width:50px;
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