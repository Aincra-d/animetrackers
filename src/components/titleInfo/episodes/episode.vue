<template>
    <div>
        <table class="table w-100 text-light font-weight-bold">
            <tbody>
                <tr :key="episode.id" v-for="episode in episodes">
                    <td style="width:50px;">
                        <h4>
                            {{episode.id}}
                        </h4>
                    </td>

                    <td class="w-100 text-left">
                        <h6>
                            {{episode.title}}
                            <span v-if="episode.romanji_title!==null">
                                ({{episode.romanji_title}})
                            </span>
                        </h6>
                        <span v-if="episode.aired!==null">
                            Aired: {{episode.aired.substring(0,10)}}
                        </span>

                        <span class="text-warning" v-if="episode.filler">
                            Filler
                        </span>

                        <span class="text-warning" v-if="episode.recap">
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