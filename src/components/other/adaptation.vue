<template>
    <tr>
        <td class="align-top w-100">
        <span class="font-12 font-weight-normal">
            Adaptation
        </span>
        <br>
            <ul>
                <li :key="adaptation.mal_id" v-for="adaptation in related" class="d-block my-1">
                    - <router-link :to="'/'+adaptation.type+'/'+adaptation.mal_id+'/'+(adaptation.name.split(' ').join('-')).replace('/','-')">
                        {{adaptation.name}}
                    </router-link>({{adaptation.type}})
                </li>
            </ul>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'animeRelatedAdaptation',
    props: {
        related: Array
    }
}
</script>