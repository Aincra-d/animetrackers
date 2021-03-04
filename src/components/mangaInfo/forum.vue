<template>
	<div>
    <h3 class="text-light">
      Forum
    </h3>

    <topics :screen="screen" v-if="loaded" :topics="topics"></topics>
    <div v-else class="w-100 text-center font-weight-bold text-light">
      <span>
        <i class="fas fa-spinner fa-2x fa-spin"></i>
      </span>
    </div>


	</div>

</template>

<script>
  import axios from 'axios';
  import topics from '@/components/mangaInfo/forum/topic.vue';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import utc from 'dayjs/plugin/utc';
	export default{
		name: 'mangaForum',
    components: {
      topics
    },
    data(){
      let topics=[];

      axios.get("https://api.jikan.moe/v3/manga/"+this.$route.params.mangaid+"/forum")
      .then(response => {
        console.log(response.data);

        for(let i=0; i<response.data.topics.length; i++){
          topics.push({
            id: response.data.topics[i].topic_id,
            url: response.data.topics[i].url,
            title: response.data.topics[i].title,
            posted: dayjs.utc(
              response.data.topics[i].date_posted.substring(0,10)
              +' '+
              response.data.topics[i].date_posted.substring(11,19)).fromNow(),
            author: response.data.topics[i].author_name,
            replies: response.data.topics[i].replies,
            last_post: {
              author: response.data.topics[i].last_post.author_name,
              posted: dayjs.utc(
                response.data.topics[i].last_post.date_posted.substring(0,10)
                +' '+
                response.data.topics[i].last_post.date_posted.substring(11,19)).fromNow(),
            }
          });
        }
        this.$data.loaded=true;
      }).catch(error => { console.log(error) });

      return{
        topics: topics,
        loaded: false,
        screen: window.innerWidth
      }
    },
    methods: {
      onResize(){
        this.screen=window.innerWidth
      }
    },
    mounted(){
      window.addEventListener('resize',this.onResize);
      dayjs.extend(relativeTime);
      dayjs.extend(utc);
      dayjs.utc().format()
    }
	}
</script>