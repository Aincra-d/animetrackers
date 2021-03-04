<template>
    <div>
        <div class="w-100 text-left text-light">
            <ui-collapsible title="Songs" class="text-dark bg-transparent border-0" open>
                <table class="table w-100 align-top text-light table-striped font-weight-bold text-left">
                    <tbody>
                        <tr>
                            <td class="align-top w-100">
                            <span class="font-12 font-weight-normal">
                                Opening themes
                            </span>
                            <br>
                                <ul>
                                    <li :key="song" v-for="song in songs[0].openings" class="d-block my-1">
                                       - {{song}}
                                    </li>
                                </ul>
                            </td>
                        </tr>

                        <tr>
                            <td class="align-top w-100">
                            <span class="font-12 font-weight-normal">
                                Ending themes
                            </span>
                            <br>
                                <ul>
                                    <li :key="song" v-for="song in songs[0].endings" class="d-block my-1">
                                       - {{song}}
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

  name: 'songs',
  props: {
    songs: Array
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