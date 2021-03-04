<template>
    <tr>
        <td class="align-top w-100">
        <span class="font-12 font-weight-normal">
            Spin-off
        </span>
        <br>
            <ul>
                <li :key="spin_off.mal_id" v-for="spin_off in related" class="d-block my-1">
                    - <router-link :to="'/'+parent.type+'/'+spin_off.mal_id+'/'+(spin_off.name.split(' ').join('-')).replace('/','-')">
                        {{spin_off.name}}
                    </router-link>({{spin_off.type}})
                </li>
            </ul>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'animeRelatedSpinOff',
    props: {
        related: Array
    }
}
</script>