<template>
    <tr>
        <td class="align-top w-100">
        <span class="font-12 font-weight-normal">
            Summary
        </span>
        <br>
            <ul>
                <li :key="summary.mal_id" v-for="summary in related" class="d-block my-1">
                    - <router-link :to="'/'+summary.type+'/'+summary.mal_id+'/'+(summary.name.split(' ').join('-')).replace('/','-')">
                        {{summary.name}}
                    </router-link>({{summary.type}})
                </li>
            </ul>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'animeRelatedSummary',
    props: {
        related: Array
    }
}
</script>