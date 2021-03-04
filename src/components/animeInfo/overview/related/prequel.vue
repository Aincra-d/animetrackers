<template>
    <tr>
        <td class="align-top w-100">
        <span class="font-12 font-weight-normal">
            Prequel
        </span>
        <br>
            <ul>
                <li :key="prequel.mal_id" v-for="prequel in related" class="d-block my-1">
                    - <router-link :to="'/'+prequel.type+'/'+prequel.mal_id+'/'+(prequel.name.split(' ').join('-')).replace('/','-')">
                        {{prequel.name}}
                    </router-link>({{prequel.type}})
                </li>
            </ul>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'animeRelatedPrequel',
    props: {
        related: Array
    }
}
</script>