<template>
    <div>
        <div
        v-if="$route.query.type"
        class="w-100 text-center text-light pt-2">
            <ul class="list-unstyled">
                <li class="d-inline font-weight-bold mx-2">
                    <router-link
                    class="text-light"
                    :to="'/forum?type='+$route.query.type+'&id='+$route.query.id+'&page=1'">
                        All topics
                    </router-link>
                </li>

                <li class="d-inline font-weight-bold mx-2">
                    <router-link
                    class="text-light"
                    :to="'/forum?type='+$route.query.type+'&id='+$route.query.id+'&subtype='+($route.query.type=='anime' ? 'episodes' : 'chapters')+'&page=1'">
                        {{$route.query.type=='anime' ? 'Episodes' : 'Chapters'}}
                    </router-link>
                </li>

                <li class="d-inline font-weight-bold mx-2">
                    <router-link
                    class="text-light"
                    :to="'/forum?type='+$route.query.type+'&id='+$route.query.id+'&subtype=other&page=1'">
                        Other
                    </router-link>
                </li>
            </ul>
        </div>

        <pagination
        v-if="topics[0].pages > 1"
        :perPage="$root.screen > 991 ? 50 : 30"
        :allPages="topics[0].pages">
        </pagination>

        <topics
        v-if="loaded"
        :screen="$root.screen"
        :topics="topics">
        </topics>

        <pagination
        v-if="topics[0].pages > 1"
        :perPage="$root.screen > 991 ? 50 : 30"
        :allPages="topics[0].pages">
        </pagination>

        <div
        v-if="!loaded"
        class="w-100 text-center font-weight-bold text-light">
          <span>
            <i class="fas fa-spinner fa-2x fa-spin"></i>
          </span>
        </div>
    </div>
</template>

<script>
import axios           from     'axios';
import pagination      from     '@/components/pagination.vue';
import cheerio         from     'cheerio';
import topics          from     '@/components/titleInfo/forum/topic.vue';
export default {
    name: 'forumTopics',
    components: {
        topics,
        pagination
    },
    // head: {
    //     title() {
    //         return {
    //             inner: this.$route.params.title.split('-').join(' ')+' - Forum',
    //             separator: '-',
    //             complement: 'Anime'
    //         }
    //     },
    //     meta(){
    //         return  [
    //             {
    //                 name: 'description',
    //                 content: 'Check out the forum, topics and discussions related '+this.$route.params.title.split('-').join(' '),
    //                 id: this.$route.params.titleid
    //             }
    //         ]
    //     }
    // },
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
            let baseURL='https://cors-anywhere.herokuapp.com/https://myanimelist.net/forum';
            let url;
            let perPage=this.$root.screen<991 ? 30 : 50;

            if(!this.$route.query.type) url = baseURL+'/?board='+parseInt(this.$route.query.board)+'&show='+(parseInt(this.$route.query.page*perPage)-perPage);
            else url = baseURL+'/?'+this.$route.query.type+'id='+parseInt(this.$route.query.id)+(this.$route.query.subtype ? '&topic='+(this.$route.query.subtype!='other' ? 'episode' : 'other') : '')+'&show='+(parseInt(this.$route.query.page*perPage)-perPage);
            
            let topics=[];
            let self=this;

            if(this.$root.screen>991 || this.$route.query.type){
                axios.get(url)
                .then(response => {
                    self.loaded=false;

                    const $=cheerio.load(response.data);
                    let rows=$("#forumTopics tr:not(:contains('Sticky'))").not(".forum-table-header");
                    for(let i=0; i<rows.length; i++){
                        // console.log(rows[i]);

                        topics.push({
                            id: rows[i].children[3].children[1].attribs.href.match(/[0-9]+/),
                            title: rows[i].children[3].children[1].children[0].data,
                            replies: rows[i].children[5].children[0].data,
                            last_post: {
                                author: rows[i].children[7].children[1].children[0].data,
                                posted: rows[i].children[7].children[5].data
                            },
                            pages: ((parseInt($("#content > div.borderClass.pl0.pr0.pt16.pb0.cl-b > div.fl-r.pb8 > span").text().match(/\(([^)]+)\)/)[1])))
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
            }
            if(this.$root.screen<991 && !this.$route.query.type){
                axios.get(url)
                .then(response => {
                    self.loaded=false;

                    const $=cheerio.load(response.data);
                    let start=this.$route.query.page==1 ? 3 : 0;
                    let rows=$(".forums .box-unit3");
                    for(let i=start; i<rows.length; i++){
                        // console.log(rows[i]);

                        topics.push({
                            id: rows[i].children[1].attribs.href.match(/[0-9]+/),
                            title: rows[i].children[1].children[1].children[1].children[0].data,
                            replies: JSON.parse(rows[i].children[1].children[1].children[2].children[0].data.match(/[0-9]+/)),
                            last_post: {
                                author: rows[i].children[1].children[1].children[4].children[0].data.split('by')[1].trim(),
                                posted: rows[i].children[1].children[1].children[4].children[0].data.substring(0,
                                    rows[i].children[1].children[1].children[4].children[0].data.indexOf('by'))
                            },
                            pages: parseInt($("#content > div > div > div:nth-child(3) > div > p > span.fn-blue3.fs14.fw-b.pr4").text())
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
            }
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