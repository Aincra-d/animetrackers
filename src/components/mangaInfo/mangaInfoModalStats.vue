<template>
    <div>
        <ul class="list-unstyled font-weight-bold w-100 text-center">
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
        <br>
        <p class="text-dark p-2">{{info.story}}</p>
    </div>
</template>

<script>
    export default{
        name: 'mangaInfoModalStats',
        props: {
            info: Object
        }
    }
</script>

<style scoped>
    p{
        max-height: 250px;
        overflow-y: auto;
        white-space: pre-wrap;
    }
</style>