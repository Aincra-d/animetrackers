<template>
    <div>
        <div :key="topic.id" v-for="topic in topics" class="w-95 mx-auto text-light text-left topic-container my-2 py-1 rounded">
          <a :href="topic.url" target="_blank" class="text-light">
            <h6 v-if="screen<776" class="ml-2 my-0">
              {{topic.title}}
            </h6>
            <h5 v-else class="ml-2 my-0">
              {{topic.title}}
            </h5>
          </a>
          <div class="my-1">
            <span class="font-weight-normal font-15 ml-2">
              <i class="fas fa-comments fa-md"></i> {{topic.replies}}
            </span>

            <span class="font-weight-normal font-15 ml-2">
              <i class="fas fa-comment fa-md"></i> by 
              <router-link :to="'/user/'+topic.last_post.author" class="text-primary">
                {{topic.last_post.author}}
              </router-link>
              {{topic.last_post.posted}}
            </span>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'mangaTopic',
    props: {
        topics: Array,
        screen: Number
    }
}
</script>

<style scoped>
  .topic-container{
    background-color: rgba(0,0,0,0.3);
  }
</style>