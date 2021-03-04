<template>
    <div>
        <div class="w-100 text-left text-light">
            <ui-collapsible title="Related" class="text-dark bg-transparent border-0" open>
                <table class="table w-100 align-top text-light table-striped font-weight-bold text-left">
                    <tbody>
                        <tr v-show="info[0].related['Adaptation']">
                            <td class="align-top w-100">
                            <span class="font-12 font-weight-normal">
                                Adaptation
                            </span>
                            <br>
                                <ul>
                                    <li :key="adapt.mal_id" v-for="adapt in info[0].related['Adaptation']" class="d-block my-1">
                                        - <router-link :to="'/anime/'+adapt.mal_id+'/'+(adapt.name.split(' ').join('-')).replace('/','-')">
                                            {{adapt.name}}
                                        </router-link>({{adapt.type}})
                                    </li>
                                </ul>
                            </td>
                        </tr>

                        <tr v-show="info[0].related['Prequel']">
                            <td class="align-top w-100">
                            <span class="font-12 font-weight-normal">
                                Prequel
                            </span>
                            <br>
                                <ul>
                                    <li :key="adapt.mal_id" v-for="adapt in info[0].related['Prequel']" class="d-block my-1">
                                        - <router-link :to="'/manga/'+adapt.mal_id+'/'+(adapt.name.split(' ').join('-')).replace('/','-')">
                                            {{adapt.name}}
                                        </router-link>({{adapt.type}})
                                    </li>
                                </ul>
                            </td>
                        </tr>

                        <tr v-show="info[0].related['Sequel']">
                            <td class="align-top w-100">
                            <span class="font-12 font-weight-normal">
                                Sequel
                            </span>
                            <br>
                                <ul>
                                    <li :key="adapt.mal_id" v-for="adapt in info[0].related['Sequel']" class="d-block my-1">
                                        - <router-link :to="'/manga/'+adapt.mal_id+'/'+(adapt.name.split(' ').join('-')).replace('/','-')">
                                            {{adapt.name}}
                                        </router-link>
                                    </li>
                                </ul>
                            </td>
                        </tr>

                        <tr v-show="info[0].related['Side story']">
                            <td class="align-top w-100">
                            <span class="font-12 font-weight-normal">
                                Side story
                            </span>
                            <br>
                                <ul>
                                    <li :key="adapt.mal_id" v-for="adapt in info[0].related['Side story']" class="d-block my-1">
                                        - <router-link :to="'/manga/'+adapt.mal_id+'/'+(adapt.name.split(' ').join('-')).replace('/','-')">
                                            {{adapt.name}}
                                        </router-link>
                                    </li>
                                </ul>
                            </td>
                        </tr>

                        <tr v-show="info[0].related['Summary']">
                            <td class="align-top w-100">
                            <span class="font-12 font-weight-normal">
                                Summary
                            </span>
                            <br>
                                <ul>
                                    <li :key="adapt.mal_id" v-for="adapt in info[0].related['Summary']" class="d-block my-1">
                                        - <router-link :to="'/manga/'+adapt.mal_id+'/'+(adapt.name.split(' ').join('-')).replace('/','-')">
                                            {{adapt.name}}
                                        </router-link>
                                    </li>
                                </ul>
                            </td>
                        </tr>

                        <tr v-show="info[0].related['Parent story']">
                            <td class="align-top w-100">
                            <span class="font-12 font-weight-normal">
                                Parent story
                            </span>
                            <br>
                                <ul>
                                    <li :key="adapt.mal_id" v-for="adapt in info[0].related['Parent story']" class="d-block my-1">
                                        - <router-link :to="'/manga/'+adapt.mal_id+'/'+(adapt.name.split(' ').join('-')).replace('/','-')">
                                            {{adapt.name}}
                                        </router-link>
                                    </li>
                                </ul>
                            </td>
                        </tr>

                         <tr v-show="info[0].related['Spin-off']">
                            <td class="align-top w-100">
                            <span class="font-12 font-weight-normal">
                                Spin-off
                            </span>
                            <br>
                                <ul>
                                    <li :key="adapt.mal_id" v-for="adapt in info[0].related['Spin-off']" class="d-block my-1">
                                        - <router-link :to="'/manga/'+adapt.mal_id+'/'+(adapt.name.split(' ').join('-')).replace('/','-')">
                                            {{adapt.name}}
                                        </router-link>
                                    </li>
                                </ul>
                            </td>
                        </tr>

                        <tr v-show="info[0].related['Alternative version']">
                            <td class="align-top w-100">
                            <span class="font-12 font-weight-normal">
                                Alternative version
                            </span>
                            <br>
                                <ul>
                                    <li :key="adapt.mal_id" v-for="adapt in info[0].related['Alternative version']" class="d-block my-1">
                                        - <router-link :to="'/manga/'+adapt.mal_id+'/'+(adapt.name.split(' ').join('-')).replace('/','-')">
                                            {{adapt.name}}
                                        </router-link>
                                    </li>
                                </ul>
                            </td>
                        </tr>

                        <tr v-show="info[0].related['Character']">
                            <td class="align-top w-100">
                            <span class="font-12 font-weight-normal">
                                Character
                            </span>
                            <br>
                                <ul>
                                    <li :key="adapt.mal_id" v-for="adapt in info[0].related['Character']" class="d-block my-1">
                                        - <router-link :to="'/manga/'+adapt.mal_id+'/'+(adapt.name.split(' ').join('-')).replace('/','-')">
                                            {{adapt.name}}
                                        </router-link>
                                    </li>
                                </ul>
                            </td>
                        </tr>

                         <tr v-show="info[0].related['Other']">
                            <td class="align-top w-100">
                            <span class="font-12 font-weight-normal">
                                Other
                            </span>
                            <br>
                                <ul>
                                    <li :key="adapt.mal_id" v-for="adapt in info[0].related['Other']" class="d-block my-1">
                                        - <router-link :to="'/manga/'+adapt.mal_id+'/'+(adapt.name.split(' ').join('-')).replace('/','-')">
                                            {{adapt.name}}
                                        </router-link>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </ui-collapsible>
        </div>
    </div>
</template>

<script>
export default {

  name: 'related',
  props: {
    info: Array
  },
  data(){
    return{
    screen: window.innerWidth
    }
  },
   methods: {
      onResize(){
        this.screen=window.innerWidth
      }
    },
    mounted(){
      window.addEventListener("resize",this.onResize)
    }
}
</script>