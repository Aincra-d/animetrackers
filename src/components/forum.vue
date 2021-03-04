<template>
    <div style="height:100vh;">
        <boards v-if="$route.fullPath=='/forum'"></boards>

        <topics v-if="$route.query.board || $route.query.type"></topics>
        
        <topic v-if="$route.query.topic"></topic>
    </div>
</template>

<script>
import boards from '@/components/forum/boards.vue';
import topics from '@/components/forum/topics.vue';
import topic from '@/components/forum/topic.vue';
export default {
    name: 'forum',
    components: {
        boards,
        topics,
        topic
    }
}
</script>