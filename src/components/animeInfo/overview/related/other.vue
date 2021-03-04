<template>
    <tr>
        <td class="align-top w-100">
        <span class="font-12 font-weight-normal">
            Other
        </span>
        <br>
            <ul>
                <li :key="other.mal_id" v-for="other in related" class="d-block my-1">
                    - <router-link :to="'/'+other.type+'/'+other.mal_id+'/'+(other.name.split(' ').join('-')).replace('/','-')">
                        {{other.name}}
                    </router-link>({{other.type}})
                </li>
            </ul>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'animeRelatedOther',
    props: {
        related: Array
    }
}
</script>