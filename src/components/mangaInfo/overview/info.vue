<template>
    <div>
        <div class="w-100 text-left text-light">
            <ui-collapsible title="Details" class="text-dark bg-transparent" open>
                    <table class="table w-100 align-top text-light table-striped font-weight-bold text-left">
                        <tbody>
                            <tr>
                                <td class="align-top w-100">
                                    <span class="font-12 font-weight-normal">
                                        <h6 class="p-0 m-0 d-inline-block mr-2">Volumes:</h6> {{info[0].volumes ? info[0].volumes : '-'}}
                                    </span>
                                    <br>   

                                     <span class="font-12 font-weight-normal">
                                        <h6 class="p-0 m-0 d-inline-block mr-2">Chapters:</h6> {{info[0].chapters ? info[0].chapters : '-'}}
                                    </span>
                                    <br>     

                                    <span class="font-12 font-weight-normal">
                                        <h6 class="p-0 m-0 d-inline-block mr-2">Type:</h6> {{info[0].type}}
                                    </span>
                                    <br>      

                                    <span class="font-12 font-weight-normal">
                                        <h6 class="p-0 m-0 d-inline-block mr-2">Status:</h6> {{info[0].status}}
                                    </span>
                                    <br>     

                                    <span class="font-12 font-weight-normal">
                                        <h6 class="p-0 m-0 d-inline-block mr-2">Published:</h6> {{info[0].published}}
                                    </span>
                                    <br>

                                    <span class="font-12 font-weight-normal">
                                        <h6 class="p-0 m-0 d-inline-block mr-2">Authors:</h6> 
                                        <span class="mr-2"  :key="author.mal_id" v-for="author in info[0].authors">
                                            {{author.name}}
                                        </span>
                                    </span>
                                    <br>       
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

  name: 'info',
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

<style scoped>
    h6{
        width:80px;
    }
</style>