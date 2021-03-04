<template>
    <div>
        <ul class="list-unstyled font-weight-bold rounded text-center text-light p-3 mx-auto w-98 stats">
            <li class="d-inline mx-1">
                <i class="fas fa-star text-warning fa-md"></i> {{info.score ? info.score : '-'}}({{info.scored_by ? info.scored_by : '-'}})
            </li>

            <li class="d-inline mx-1">
                <i class="fas fa-users text-primary fa-md"></i> {{info.members ? info.members : '-'}}
            </li>

            <li class="d-inline mx-1">
                <i class="fas fa-heart text-danger fa-md"></i> {{info.favourites ? info.favourites : '-'}}
            </li>
        </ul>

        <p
        v-if="info.story"
        class="text-light p-3 mx-auto w-98 font-12 rounded story">{{info.story}}</p>
    </div>
</template>

<script>
    export default{
        name: 'animeInfoModalStats',
        props: {
            info: Object
        }
    }
</script>

<style scoped>
    .story{
        max-height: 250px;
        overflow-y: auto;
        white-space: pre-wrap;
        background-color: rgba(0,0,0,0.3);
        line-height: 25px;
    }

    .stats{
        background-color: rgba(0,0,0,0.3);
    }
</style>