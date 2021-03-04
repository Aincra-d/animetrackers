<template>
    <div>
        <table class="table w-100 text-light font-weight-bold">
          <tbody>
            <tr :key="episode.id" v-for="episode in episodes">
              <td>
                <h4>
                  {{episode.id}}
                </h4>
              </td>

              <td>
                <h6>
                  {{episode.title}}
                  <br>
                  <span v-if="episode.romanji_title!==null">
                    ({{episode.romanji_title}})
                  </span>
                </h6>
                <span v-if="episode.aired!==null">
                  Aired: {{episode.aired.substring(0,10)}}
                </span>

                <span class="text-warning" v-show="episode.filler">
                  <br>
                  Filler
                </span>

                <span class="text-warning" v-show="episode.recap">
                  <br>
                  Recap
                </span>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'episodes',
    props: {
        episodes: Array
    }
}
</script>