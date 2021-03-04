<template>
    <div>
        <wishes
        v-if="$route.params.type == 'wish'"
        ></wishes>

        <artifacts
        v-if="$route.params.type == 'artifact'"
        ></artifacts>
    </div>
</template>

<script>
import wishes from '@/components/genshin/wishes.vue'
import artifacts from '@/components/genshin/artifacts.vue'
export default {
    name: 'genshin',
    components: {
        wishes,
        artifacts,
    },
}
</script>