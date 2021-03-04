<template>
    <div class="font-xs-12 font-sm-14">
        <router-link v-if="hasMALID"
        :to="'/'+relation.type.toLowerCase()
        +'/'+relation.idMal
        +'/'+(relation.title.english || relation.title.romaji)
        .split(' ').join('-')
        .replace('/','-')"
        class="text-light font-weight-bold">
            <span>
                {{
                    (relation.title.english || relation.title.romaji).length>53 ? (relation.title.english || relation.title.romaji).substring(0,50)+'...' : (relation.title.english || relation.title.romaji)
                }}
            </span>
        </router-link>

        <span v-else>
            <span>
                {{
                    (relation.title.english || relation.title.romaji).length>53 ? (relation.title.english || relation.title.romaji).substring(0,50)+'...' : (relation.title.english || relation.title.romaji)
                }}
            </span>
        </span>

        <br>
        <span class="relation-type font-italic">{{type.toLowerCase().replace('_',' ')}}</span>
    </div>
</template>

<script>
    export default{
        name: 'relatedTitle',
        props: {
            relation: Object,
            screen: Number,
            type: String,
            hasMALID: Boolean
        }
    }
</script>

<style scoped>
    .relation-type{
        text-transform: capitalize;
    }
</style>