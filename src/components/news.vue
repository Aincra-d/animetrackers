<template>
    <div class="text-light w-100 news-container">
        <div style="overflow-y: auto;" v-if="loaded">
            <h5 v-if="screen<991">
                {{title}}
            </h5>

            <h3 v-else>
                {{title}}
            </h3>

            <img v-if="cover" :alt="title" :title="title" :src="cover" class="img-fluid float-left cover mx-2 my-1">

            <p v-html="content" class="content font-xs-12 font-sm-14 ml-2">
                {{content}}
            </p>
        </div>

        <div v-else class="text-center">
            <i class="fas fa-spinner fa-2x fa-spin"></i>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import cheerio from 'cheerio';
    export default {
        name: 'news',
        componnets: {

        },
        data(){
            return {
                title: '',
                cover: '',
                content: '',
                screen: window.innerWidth,
                loaded: false
            }
        },
        methods: {
            onResize(){
                this.screen=window.innerWidth
            }
        },
        created(){
            let self=this;
            axios.get("https://cors-anywhere.herokuapp.com/https://myanimelist.net/news/"+this.$route.params.newsid)
            .then(response => {
                // console.log(response.data);
                const $ = cheerio.load(response.data);
                let title;
                let cover;
                let content;
                if(window.innerWidth>992){
                    title = $(".news-container h1.title a").text();
                    cover = $(".news-container .content img.userimg").attr("src");
                    $(".news-container .content").find("img").remove();
                    $(".news-container .content").find("iframe").attr({
                        width: '250',
                        height: '150'
                    });
                    content = $(".news-container .content").html();
                }
                else{
                    title = $("#content > div.content > div > h1").text();
                    cover = $(".news-content-body img.userimg").attr("src");
                    $(".news-content-body").find("img").remove();
                    $(".news-content-body").find("iframe").attr({
                        width: '250',
                        height: '150'
                    });
                    content = $(".news-content-body").html();
                }
                // console.log(title);
                // console.log(cover);
                // console.log(content);
                // this.$Progress.start();
                self.title=title;
                self.cover=cover;
                self.content=content;
                self.loaded=true;
                // this.$Progress.finish();
            }).catch(error =>{
                    console.log(error);
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: '<h6>Failed to load news. Please try again!</h6>'
                    });
                    self.loaded=true;
                });
        },
        mounted(){
            window.addEventListener('resize',this.onResize);
        }
    }
</script>

<style scoped>
    @media(max-width: 991px){
        .cover{
            width:125px;
        }
    }

    @media(min-width: 991px){
        .cover{
            width:200px;
        }
    }

    .content{
        white-space: unset;
    }

    .news-container{
        background-color: rgba(0,0,0,0.3);
    }
</style>