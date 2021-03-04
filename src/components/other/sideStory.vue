<template>
    <tr>
        <td class="align-top w-100">
        <span class="font-12 font-weight-normal">
            Side story
        </span>
        <br>
            <ul>
                <li :key="side_story.mal_id" v-for="side_story in related" class="d-block my-1">
                    - <router-link :to="'/'+side_story.type+'/'+side_story.mal_id+'/'+(side_story.name.split(' ').join('-')).replace('/','-')">
                        {{side_story.name}}
                    </router-link>({{side_story.type}})
                </li>
            </ul>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'animeRelatedSideStory',
    props: {
        related: Array
    }
}
</script>