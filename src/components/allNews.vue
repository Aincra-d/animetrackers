<template>
    <div>
        <news v-if="loaded" :allNews="news"></news>

        <div v-else class="w-100 text-light text-center">
            <i class="fas fa-spinner fa-2x fa-spin"></i>
        </div>

        <paginate v-if="loaded" :array="news" :perPage="20"></paginate>
    </div>
</template>

<script>
import axios from 'axios';
import cheerio from 'cheerio';
import news from '@/components/titleInfo/news/news.vue';
import paginate from '@/components/paginate.vue';
export default {
    name: 'allNews',
    components: {
        news,
        paginate
    },
    data(){
        return {
            news: [],
            loaded: false
        }
    },
    methods: {
        getNews(){
            let url='https://cors-anywhere.herokuapp.com/https://myanimelist.net/news?p=1';
            let news=[];
            let self=this;

            if(this.$root.screen>991){
                axios.get(url)
                .then(response => {
                    const $=cheerio.load(response.data);
                    let rows=$("#content > div.content-left > div > div.news-list.mt16.mr8 > div[class='news-unit clearfix rect']");

                    for(let i=0; i<rows.length; i++){
                        news.push({
                            id: rows[i].children[0].attribs.href.match(/[0-9]+/),
                            title: rows[i].children[1].children[1].children[1].children[0].data,
                            date: rows[i].children[1].children[5].children[1].children[0].data,
                            writer: rows[i].children[1].children[5].children[1].children[1].children[0].data,
                            image: rows[i].children[0].children[1].attribs.src.replace('r/100x156/',''),
                            intro: rows[i].children[1].children[3].children[0].data
                        });
                    }

                    self.news=news;
                    self.loaded=true;
                }).catch(error => console.log(error));
            }
            else{
                axios.get(url)
                .then(response => {
                    const $=cheerio.load(response.data);
                    let rows=$("#content > div > div > div.main-list.news-list > div[class='box-unit3']");

                    for(let i=0; i<rows.length; i++){
                        news.push({
                            id: rows[i].children[1].attribs.href.match(/[0-9]+/),
                            title: rows[i].children[1].children[1].children[1].children[0].data,
                            date: rows[i].children[1].children[1].children[3].children[0].children[0].data,
                            writer: rows[i].children[1].children[1].children[3].children[1].children[0].data.replace('by ',''),
                            image: rows[i].children[1].children[0].children[1].attribs["data-src"].replace('r/130x130/',''),
                            intro: ''
                        });
                    }

                    self.news=news;
                    self.loaded=true;
                }).catch(error => console.log(error));
            }
        }
    },
    created(){
        this.getNews();
    }
}
</script>

<style scoped>
</style>