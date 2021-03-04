<template>
    <div>
        <table class="w-100 table text-left text-light info-container">
            <tbody>
                <tr>
                    <td class="w-xs-35 w-sm-30 w-md-30 w-lg-30 w-xl-30 font-weight-bold">
                        <i class="fas fa-tags mr-1"></i>Genres
                    </td>

                    <td>
                        <span
                        :key="genre.id"
                        v-for="(genre,index) in info.genres">
                            <span>{{genre.name}}</span>
                            <span v-if="index+1 < info.genres.length">, </span>
                        </span>
                    </td>
                </tr>

                <tr>
                    <td class="w-xs-35 w-sm-30 w-md-30 w-lg-30 w-xl-30 font-weight-bold">
                        <i class="fas fa-calendar mr-1"></i>Published
                    </td>

                    <td>
                        {{info.published}}
                    </td>
                </tr>

                <tr>
                    <td class="w-xs-35 w-sm-30 w-md-30 w-lg-30 w-xl-30 font-weight-bold">
                        <i class="fas fa-book mr-1"></i>Volumes
                    </td>

                    <td>
                        {{info.volumes || '-'}}
                    </td>
                </tr>

                 <tr>
                    <td class="w-xs-35 w-sm-30 w-md-30 w-lg-30 w-xl-30 font-weight-bold">
                        <i class="fas fa-book mr-1"></i>Chapters
                    </td>

                    <td>
                        {{info.chapters || '-'}}
                    </td>
                </tr>

                <tr>
                    <td class="w-xs-35 w-sm-30 w-md-30 w-lg-30 w-xl-30 font-weight-bold">
                        <i class="fas fa-list mr-1"></i>Type
                    </td>

                    <td>
                        {{info.type}}
                    </td>
                </tr>

                <tr>
                    <td class="w-xs-35 w-sm-30 w-md-30 w-lg-30 w-xl-30 font-weight-bold">
                    <i class="fas fa-spinner mr-1"></i>Status
                    </td>

                    <td>
                        {{info.status}}
                    </td>
                </tr>

                <tr>
                    <td class="w-xs-35 w-sm-30 w-md-30 w-lg-30 w-xl-30 font-weight-bold">
                        <i class="fas fa-user mr-1"></i>Authors
                    </td>

                    <td>
                        <span
                        :key="author.id"
                        v-for="(author,index) in info.authors">
                            <span>{{author.name}}</span>
                            <span v-if="index+1 < info.authors.length">,</span>
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

<style>
    .info-container{
        background-color: rgba(0,0,0,0.3);
    }
</style>