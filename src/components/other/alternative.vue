<template>
    <tr>
        <td class="align-top w-100">
        <span class="font-12 font-weight-normal">
            Alternative version
        </span>
        <br>
            <ul>
                <li :key="alternative.mal_id" v-for="alternative in related" class="d-block my-1">
                    - <router-link :to="'/'+alternative.type+'/'+alternative.mal_id+'/'+(alternative.name.split(' ').join('-')).replace('/','-')">
                        {{alternative.name}}
                    </router-link>({{alternative.type}})
                </li>
            </ul>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'animeRelatedAlternative',
    props: {
        related: Array
    }
}
</script>