<template>
    <div>
        <table class="w-100 table text-left text-light w-98 p-2 mx-auto info-container">
            <tbody>
                <tr>
                    <td class="w-xs-35 w-sm-30 w-md-30 w-lg-30 w-xl-30 font-weight-bold">
                        <i class="fas fa-tags mr-1"></i>Genres
                    </td>

                    <td>
                        <span :key="genre.id" v-for="(genre,index) in info.genres">
                            <span>{{genre.name}}</span><span v-if="index+1 < info.genres.length">, </span>
                        </span>
                    </td>
                </tr>
                
                <tr>
                    <td class="w-xs-35 w-sm-30 w-md-30 w-lg-30 w-xl-30 font-weight-bold">
                        <i class="fas fa-tv mr-1 mr-1"></i>Episodes
                    </td>

                    <td>
                        {{info.episodes || '-'}}
                    </td>
                </tr>

                <tr>
                    <td class="w-xs-35 w-sm-30 w-md-30 w-lg-30 w-xl-30 font-weight-bold">
                        <i class="fas fa-list mr-1"></i>Type
                    </td>

                    <td>
                        {{info.type || '-'}}
                    </td>
                </tr>

                <tr>
                    <td class="w-xs-35 w-sm-30 w-md-30 w-lg-30 w-xl-30 font-weight-bold">
                        <i class="fas fa-spinner mr-1"></i>Status
                    </td>

                    <td>
                        {{info.status || '-'}}
                    </td>
                </tr>

                <tr>
                    <td class="w-xs-35 w-sm-30 w-md-30 w-lg-30 w-xl-30 font-weight-bold">
                        <i class="fas fa-calendar mr-1"></i>Aired
                    </td>

                    <td>
                        {{info.aired || '-'}}
                    </td>
                </tr>

                <tr>
                    <td class="w-xs-35 w-sm-30 w-md-30 w-lg-30 w-xl-30 font-weight-bold">
                        <i class="fas fa-calendar-day mr-1"></i>Premiered
                    </td>

                    <td>
                        {{info.premiered || '-'}}
                    </td>
                </tr>

                <tr>
                    <td class="w-xs-35 w-sm-30 w-md-30 w-lg-30 w-xl-30 font-weight-bold">
                        <i class="fas fa-book mr-1"></i>Source
                    </td>

                    <td>
                        {{info.source || '-'}}
                    </td>
                </tr>

                <tr>
                    <td class="w-xs-35 w-sm-30 w-md-30 w-lg-30 w-xl-30 font-weight-bold">
                        <i class="fas fa-clock mr-1"></i>Duration
                    </td>

                    <td>
                        {{info.duration || '-'}}
                    </td>
                </tr>

                <tr>
                    <td class="w-xs-35 w-sm-30 w-md-30 w-lg-30 w-xl-30 font-weight-bold">
                        <i class="fas fa-building mr-1"></i>Studios
                    </td>

                    <td>
                        <span :key="studio.id" v-for="(studio,index) in info.studios">
                            <span>{{studio.name}}</span><span v-if="index+1 < info.studios.length">, </span>
                        </span>
                    </td>
                </tr>

                <tr>
                    <td class="w-xs-35 w-sm-30 w-md-30 w-lg-30 w-xl-30 font-weight-bold">
                        <i class="fas fa-users mr-1"></i>Rating
                    </td>

                    <td>
                        {{info.rating || '-'}}
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

<style>
    .info-container{
        background-color: rgba(0,0,0,0.3);
    }
</style>