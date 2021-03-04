<template>
    <tr>
        <td class="align-top w-100">
        <span class="font-12 font-weight-normal">
            Parent story
        </span>
        <br>
            <ul>
                <li :key="parent.mal_id" v-for="parent in related" class="d-block my-1">
                    - <router-link :to="'/'+parent.type+'/'+parent.mal_id+'/'+(parent.name.split(' ').join('-')).replace('/','-')">
                        {{parent.name}}
                    </router-link>({{parent.type}})
                </li>
            </ul>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'animeRelatedParentStory',
    props: {
        related: Array
    }
}
</script>