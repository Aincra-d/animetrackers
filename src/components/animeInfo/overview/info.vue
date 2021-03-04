<template>
    <div>
        <ui-collapsible title="Details" class="text-dark bg-transparent border-0" open>
            <div class="w-100 text-left text-light">
                <table class="table w-100 align-top text-light table-striped font-weight-bold text-left">
                    <tbody>
                        <tr>
                            <td class="align-top w-100">
                                <div :key="name" v-for="(value,name) in info[0]">
                                    <div v-show="name!='background' && name!='related' && name!='studios'">
                                        <span class="font-12 font-weight-normal">
                                            <h6 class="p-0 m-0 d-inline-block mr-2">{{name}}:</h6>
                                            <span>
                                                {{value!==null ? value : '-'}}
                                            </span>
                                        </span>
                                        <br> 
                                    </div>

                                    <div v-show="name=='studios'">
                                        <span class="font-12 font-weight-normal">
                                            <h6 class="p-0 m-0 d-inline-block mr-2">Studios:</h6> 
                                            <span class="mr-2"  :key="studio.mal_id" v-for="studio in info[0].studios">
                                                {{studio.name}}
                                            </span>
                                        </span>
                                        <br> 
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ui-collapsible>
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
    div div span h6:first-letter{
        text-transform: uppercase;
    }
</style>