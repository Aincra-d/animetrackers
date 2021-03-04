<template>
    <div>
        <div class="position-relative">
            <div>
                <router-link v-if="hasMALID"
                :to="'/'+relation.type.toLowerCase()
                +'/'+relation.idMal
                +'/'+(relation.title.english || relation.title.romaji)
                .split(' ').join('-')
                .replace('/','-')">

                    <img
                    :title="(relation.title.english || relation.title.romaji)"
                    :alt="(relation.title.english || relation.title.romaji)"
                    v-lazy="relation.coverImage.large"
                    class="table-sm-cover">
                </router-link>

                <img v-else
                    :title="(relation.title.english || relation.title.romaji)"
                    :alt="(relation.title.english || relation.title.romaji)"
                    v-lazy="relation.coverImage.large"
                    class="table-sm-cover">
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'relatedCover',
        props: {
            relation: Object,
            hasMALID: Boolean
        }
    }
</script>

<style scoped>
   @media(max-width: 991px){
        .table-sm-cover{
            width:60px;
            height:80px;
        }
    }

    @media(min-width: 991px){
        .table-sm-cover{
            width:80px;
            height:110px;
        }
    }

    .table-sm-cover{
        border-top-left-radius: 5%;
        border-bottom-left-radius: 5%;
        background-position: center;
        object-fit: cover;
    }
</style>