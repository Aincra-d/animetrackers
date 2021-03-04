<template>
    <div>
        <table class="w-100 table text-left text-dark">
            <tbody>
                <tr>
                    <td class="font-weight-bold">
                        Volumes
                    </td>

                    <td>
                        {{info.volumes!==null ? info.volumes : '-'}}
                    </td>
                </tr>

                 <tr>
                    <td class="font-weight-bold">
                        Chapters
                    </td>

                    <td>
                        {{info.chapters!==null ? info.chapters : '-'}}
                    </td>
                </tr>

                <tr>
                    <td class="font-weight-bold">
                        Type
                    </td>

                    <td>
                        {{info.type}}
                    </td>
                </tr>

                <tr>
                    <td class="font-weight-bold">
                        Status
                    </td>

                    <td>
                        {{info.status}}
                    </td>
                </tr>

                <tr>
                    <td class="font-weight-bold">
                        Published
                    </td>

                    <td>
                        {{info.published}}
                    </td>
                </tr>

                <tr>
                    <td class="font-weight-bold">
                        Authors
                    </td>

                    <td>
                        <span :key="author.id" v-for="(author,index) in info.authors">
                            <span>{{author.name}}</span><span v-if="index+1 < info.authors.length">, </span>
                        </span>
                    </td>
                </tr>

                <tr>
                    <td class="font-weight-bold">
                        Genres
                    </td>

                    <td>
                        <span :key="genre.id" v-for="(genre,index) in info.genres">
                            <span>{{genre.name}}</span><span v-if="index+1 < info.genres.length">, </span>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default{
        name: 'mangaInfoModalTable',
        props: {
            info: Object
        }
    }
</script>