<template>
    <div>
        <table class="table w-100 text-light font-weight-bold text-left">
          <tbody>
            <tr :key="rating.username" v-for="rating in ratings">
              <td class="text-left w-xs-75 w-sm-85 w-md-85 w-lg-85 w-xl-85 align-middle m-0 px-0 pt-2 pb-1 font-weight-bold text-left">
                <router-link :to="'/user/'+rating.username.split(' ').join('-')">
                    <img class="d-inline-block mr-2" v-lazy="rating.image">
                </router-link>
                <router-link :to="'/user/'+rating.username.split(' ').join('-')">
                    <h6 class="d-inline-block text-light">
                        {{rating.username}} - {{rating.score}}
                    </h6>
                </router-link>
                <br>
                <span class="font-12 font-weight-normal">
                    <ul class="list-unstyled">
                        <li class="d-inline mx-1">
                            Status: {{rating.status}}
                        </li>

                        <li class="d-inline mx-1">
                            Episodes seen: {{rating.episodes_seen}}
                        </li>
                        {{rating.date}}
                    </ul>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'ratings',
    props: {
        ratings: Array
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
</style>