<template>
	<div>
        <h3 class="text-light">
          Forum
        </h3>
        <topics :screen="$root.screen" v-if="loaded" :topics="topics"></topics>

        <div v-else class="w-100 text-center font-weight-bold text-light">

          <span>
            <i class="fas fa-spinner fa-2x fa-spin"></i>
          </span>

        </div>

        <div v-if="loaded && topics.length==0" class="w-100 text-center text-light">
            <h6>No topics have been created yet.</h6>
        </div>

        <div v-if="topics.length==50" class="w-100 text-center">
            <router-link :to="'/forum?type='+$route.params.type+'&id='+$route.params.titleid+'&page=1'">
                <button type="button" class="btn btn-light btn-sm mb-5 z">See all</button>
            </router-link>
        </div>

        
	</div>
</template>

<script>
import axios           from     'axios';
import cheerio         from     'cheerio';
import topics          from     '@/components/titleInfo/forum/topic.vue';
export default {
    name: 'titleForum',
    components: {
        topics
    },
    head: {
        title() {
            return {
                inner: this.$route.params.title.split('-').join(' ')+' - Forum',
                separator: '-',
                complement: 'Anime'
            }
        },
        meta(){
            return  [
                {
                    name: 'description',
                    content: 'Check out the forum, topics and discussions related '+this.$route.params.title.split('-').join(' '),
                    id: this.$route.params.titleid
                }
            ]
        }
    },
    data(){
        return{
            topics: [],
            loaded: false,
            screen: window.innerWidth
        }
    },
    methods: {
        onResize(){
            this.screen=window.innerWidth
        },
        getTopics(){
            const url = 'https://cors-anywhere.herokuapp.com/https://myanimelist.net/forum/?'+this.$route.params.type+'id='+this.$route.params.titleid;
            let topics=[];
            let self=this;

            axios.get(url)
            .then(response => {
                self.loaded=false;

                const $=cheerio.load(response.data);
                let rows=$("#forumTopics tr").not(".forum-table-header");
                for(let i=0; i<rows.length; i++){
                    // console.log(rows[i]);

                    topics.push({
                        id: rows[i].children[3].children[1].attribs.href.match(/[0-9]+/),
                        title: rows[i].children[3].children[1].children[0].data,
                        posted: rows[i].children[3].children[7].children[0].data,
                        replies: rows[i].children[5].children[0].data,
                        last_post: {
                            author: rows[i].children[7].children[1].children[0].data,
                            posted: rows[i].children[7].children[5].data
                        }
                    });
                }
                self.topics=topics;
                self.loaded=true;
            }).catch(error =>{
                console.log(error);
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: '<h6>Failed to load topics. Please try again!</h6>'
                });
                self.loaded=true;
            });
            console.log('topics',topics);
        }
    },
    mounted(){
        window.addEventListener('resize',this.onResize);
    },
    created(){
        this.getTopics();
    }
}
</script>