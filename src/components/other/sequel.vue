<template>
    <tr>
        <td class="align-top w-100">
        <span class="font-12 font-weight-normal">
            Sequel
        </span>
        <br>
            <ul>
                <li :key="sequel.mal_id" v-for="sequel in related" class="d-block my-1">
                    - <router-link :to="'/'+sequel.type+'/'+sequel.mal_id+'/'+(sequel.name.split(' ').join('-')).replace('/','-')">
                        {{sequel.name}}
                    </router-link>({{sequel.type}})
                </li>
            </ul>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'animeSequel',
    props: {
        related: Array
    }
}
</script>