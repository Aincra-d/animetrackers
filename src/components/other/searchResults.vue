<template>
    <div>
        <div v-show="title!=''" class="bg-danger text-light position-relative top-0 w-100 search-results">
            <!-- <results></results> -->
        </div>
    </div>
</template>

<script>
    // import results from '@/components/searchResults/results.vue';
    export default{
        name: 'searchResults',
        props: {
            title: String
        }
        // components: {
        //     results
        // }
    }
</script>

<style>
    @media(max-width: 991px){
        .search-results{
            max-height: 300px;
        }
    }

    @media(min-width: 991px){
        .search-results{
            max-height: 400px;
        }
    }

    .search-results{
        overflow-y: auto;
    }
</style>