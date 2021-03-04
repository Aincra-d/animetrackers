<template>
    <div>
        <table class="table w-100 text-light font-weight-bold text-left">
          <tbody>
            <tr :key="rev.id" v-for="rev in reviews">

              <td class="text-left w-xs-75 w-sm-85 w-md-85 w-lg-85 w-xl-85 align-middle m-0 px-0 pt-2 pb-1">
                <button @click="rev.toggled=!rev.toggled" style="outline:0;"  class="w-100 bg-transparent text-light font-weight-bold border-0 outline-0 text-left">
                    <router-link :to="'/user/'+rev.reviewer.username.split(' ').join('-')">
                        <img class="d-inline-block mr-2" v-lazy="rev.reviewer.image">
                    </router-link>
                    <router-link :to="'/user/'+rev.reviewer.username.split(' ').join('-')">
                        <h6 class="d-inline-block text-light">
                            {{rev.reviewer.username}} - {{rev.scores.overall || 0}}
                        </h6>
                    </router-link>
                     <span class="float-right mr-2">
                        <i class="fas fa-thumbs-up fa-sm text-light"></i> {{rev.helpful_count || 0}}
                    </span>
                    <br>
                    <span class="font-12 font-weight-normal">
                        <ul class="list-unstyled">
                            <li class="d-inline">
                                Story: {{rev.scores.story || 0}}
                            </li>

                            <li class="d-inline">
                                Art: {{rev.scores.art || 0}}
                            </li>

                            <li class="d-inline">
                                Character: {{rev.scores.character || 0}}
                            </li>

                            <li class="d-inline">
                                Enjoyment: {{rev.scores.enjoyment || 0}}
                            </li>
                        </ul>
                    </span>
                    <p style="line-height: 23px;" v-show="rev.toggled" class="font-13 font-weight-normal review w-100">
                        {{rev.review.replace(new RegExp("\\\\n", "g"), "")}}
                    </p>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'mangaReview',
    props: {
        reviews: Array
    }
}
</script>

<style scoped>
    @media(max-width: 576px){
        img{
            height:30px;
            width:30px;
        }
    }

    @media(max-width: 991px){
        img{
            height:40px;
            width:40px;
        }
    }

    @media(min-width: 991px){
        img{
            height:50px;
            width:50px;
        }
    }

    img{
        border-radius: 100%;
    }
    .review{
        white-space: pre-wrap; 
    }
</style>