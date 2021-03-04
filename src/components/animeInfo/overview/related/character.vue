<template>
    <tr>
        <td class="align-top w-100">
        <span class="font-12 font-weight-normal">
            Character
        </span>
        <br>
            <ul>
                <li :key="character.mal_id" v-for="character in related" class="d-block my-1">
                    - <router-link :to="'/'+character.type+'/'+character.mal_id+'/'+(character.name.split(' ').join('-')).replace('/','-')">
                        {{character.name}}
                    </router-link>({{character.type}})
                </li>
            </ul>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'animeRelatedCharacter',
    props: {
        related: Array
    }
}
</script>