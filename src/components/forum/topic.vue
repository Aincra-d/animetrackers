<template>
    <div>
        <pagination
        v-if="comments[0].pages>1 && loaded"
        :perPage="$root.screen>991 ? 50 : 30"
        :allPages="comments[0].pages">
        </pagination>
        
        <div
        class="w-95 mx-auto rounded position-relative"
        style="background-color: rgba(0,0,0,0.3);">
            <h3
            v-if="$root.screen>991"
            class="text-light m-2 p-2">
                {{title}}
            </h3>

            <h5
            v-else
            class="text-light m-2 p-2">
                {{title}}
            </h5>
        </div>

        <div
        class="w-95 mx-auto rounded position-relative p-2"
        style="background-color: rgba(0,0,0,0.3);">
            <router-link
            class="mr-2 my-4"
            to="/forum">
                <span class="h6 text-primary">
                    Forum
                </span>
            </router-link>

            <span class="mr-1 my-4">
                <i class="fas fa-angle-right fa-md text-light"></i>
            </span>

            <router-link
            class="ml-1 my-4"
            :to="'/forum?board='+board+'&page=1'">
                <span class="h6 text-primary">
                    {{board_name}}
                </span>
            </router-link>
        </div>

        <topic-comments
        :comments="comments"
        v-if="loaded">
        </topic-comments>
        
        <div v-else class="w-100 text-center text-light">
            <span>
                <i class="fas fa-spinner fa-2x fa-spin"></i>
            </span>
        </div>

        <pagination
        v-if="comments[0].pages>1 && loaded"
        :perPage="$root.screen>991 ? 50 : 30"
        :allPages="comments[0].pages">
        </pagination>
    </div>
</template>

<script>
import axios           from     'axios';
import pagination      from     '@/components/pagination.vue';
import topicComments   from     '@/components/forum/topicComment.vue';
import cheerio         from     'cheerio';
export default {
    name: 'forumTopic',
    components: {
        pagination,
        'topic-comments': topicComments
    },
    data(){
        return {
            title: '',
            comments: [],
            loaded: false,
            board: 0,
            board_name: ''
        }
    },
    methods: {
        getComments(){
            let perPage=this.$root.screen<991 ? 30 : 50;
            let url='https://cors-anywhere.herokuapp.com/https://myanimelist.net/forum?topicid='+this.$route.query.topic+'&show='+(parseInt(this.$route.query.page*perPage)-perPage);
            let comments=[];
            let self=this;

            if(this.$root.screen>991){
                axios.get(url)
                .then(response => {
                    const $=cheerio.load(response.data);
                    let title=$("#content > div.clearfix.mt4 > div.fl-l.mt8.cl-l > h1").text();
                    let board=$("#content > div.clearfix.mt4 > div:nth-child(1) > div > div:nth-child(3) > a").attr("href").match(/[-0-9]+/);
                    let board_name=$("#content > div.clearfix.mt4 > div:nth-child(1) > div > div:nth-child(3) > a span").text();

                    $(".forum_border_around").each(function(){

                        comments.push({
                            index: $(this).find("div.forum_category > div > div > a").text(),
                            date: $(this).find("div.forum_category > div > div.date").text(),
                            user: {
                                name: $(this).find("div.forum-topic-message-wrapper > table > tbody > tr > td.forum_boardrow2 > div > div > a strong").text(),
                                picture: $(this).find("div.forum-topic-message-wrapper > table > tbody > tr > td.forum_boardrow2 > div > a > img").attr("data-src"),
                                signature: $(this).find("div.forum-topic-message-wrapper > table > tbody > tr > td.forum_boardrow1 > div > div.sig").html()
                            },
                            comment: $(this).find("div.forum-topic-message-wrapper > table > tbody > tr > td.forum_boardrow1 > div > div.clearfix").html(),
                            toggled: true
                        });
                    });

                    if(this.$route.query.page!=1 || comments.length>=50)
                        this.$set(comments[0],'pages',parseInt($("#content > div.mt4.mb4.pl0.pb0.pt4.pb4 > div").text().match(/\(([^)]+)\)/)[1]));
                    else this.$set(comments[0],'pages',1);

                    self.title=title;
                    self.comments=comments;
                    self.board=board;
                    self.board_name=board_name;
                    self.loaded=true;

                    console.log('comments',comments)
                }).catch(error => console.log(error));
            }
            else{
                axios.get(url)
                .then(response => {
                    const $=cheerio.load(response.data);
                    let title=$("#content > div > div > div.forum > h1").text();
                    let board=$("#content > div > div > div.breadcrumb.f14.lh18 > div:nth-child(3) > a").attr("href").match(/[-0-9]+/);
                    let board_name=$("#content > div > div > div.breadcrumb.f14.lh18 > div:nth-child(3) > a span").text();

                    $(".forum-reply").each(function(){
                        comments.push({
                            index: $(this).find(".topic-anchor").text().replace('#',''),
                            date: $(this).find("div.di-box.mb0 > ul > li.update.fs12.mt4").text(),
                            user: {
                                name: $(this).find("div.di-box.mb0 > ul > li.name > a").text(),
                                picture: ($(this).find("div.di-box.mb0 > a").length ? $(this).find("div.di-box.mb0 > a").css("background-image").replace('url(','').replace(')','') : ''),
                                signature: $(this).find("div:nth-child(3) > aside").html()
                            },
                            comment: $(this).find(".comment-text div").html(),
                            toggled: true
                        });
                    });

                    if(comments.length>=30 || this.$route.query.page!=1)
                        this.$set(comments[0],'pages',parseInt($("#content > div > div > div:nth-child(3) > div > p > span.fn-blue3.fs14.fw-b.pr4").text()));
                    else this.$set(comments[0],'pages',1);

                    self.title=title;
                    self.comments=comments;
                    self.board=board;
                    self.board_name=board_name;
                    self.loaded=true;

                    console.log('comments',comments)
                }).catch(error => console.log(error));
            }
        }
    },
    created(){
        this.getComments();
    }
}
</script>