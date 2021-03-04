<template>
    <div>
        <table class="w-100 table text-left text-dark">
            <tbody>
                <tr>
                    <td class="font-weight-bold">
                        Episodes
                    </td>

                    <td>
                        {{info.episodes}}
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
                        Aired
                    </td>

                    <td>
                        {{info.aired}}
                    </td>
                </tr>

                <tr>
                    <td class="font-weight-bold">
                        Premiered
                    </td>

                    <td>
                        {{info.premiered}}
                    </td>
                </tr>

                <tr>
                    <td class="font-weight-bold">
                        Source
                    </td>

                    <td>
                        {{info.source}}
                    </td>
                </tr>

                <tr>
                    <td class="font-weight-bold">
                        Duration
                    </td>

                    <td>
                        {{info.duration}}
                    </td>
                </tr>

                <tr>
                    <td class="font-weight-bold">
                        Studios
                    </td>

                    <td>
                        <span :key="studio.id" v-for="(studio,index) in info.studios">
                            <span>{{studio.name}}</span><span v-if="index+1 < info.studios.length">, </span>
                        </span>
                    </td>
                </tr>

                <tr>
                    <td class="font-weight-bold">
                        Rating
                    </td>

                    <td>
                        {{info.rating}}
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
        name: 'animeInfoModalTable',
        props: {
            info: Object
        }
    }
</script>