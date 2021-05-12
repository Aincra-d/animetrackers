<template>
    <div class="d-block align-items-start text-center" style="height:100vh;">
        <anime-info-modal
        v-if="$route.params.type=='anime'"
        ref="animeInfoModal">
        </anime-info-modal>

        <manga-info-modal
        v-else
        ref="mangaInfoModal">
        </manga-info-modal>

        <div v-if="loaded">
            <title-recommendations
            @open-modal="openModal"
            :recommendations="recommendations">
            </title-recommendations>

            <paginate
            v-if="recommendations.length == per_page"
            :array="recommendations"
            :perPage="per_page">
            </paginate>
        </div>

        <span v-else>
            <i class="fas fa-spinner fa-2x fa-spin text-light"></i>
        </span>

</div>

</template>

<script>
  import axios                  from 'axios';
  import dayjs                  from 'dayjs';
  import relativeTime           from 'dayjs/plugin/relativeTime';
  import utc                    from 'dayjs/plugin/utc';
  // import cheerio                from 'cheerio';
  import animeInfoModal         from '@/components/animeInfoModal.vue';
  import mangaInfoModal         from '@/components/mangaInfoModal.vue';
  import paginate               from '@/components/paginate.vue';
  import titleRecommendations   from '@/components/recommendations/recommendation.vue';
    export default{
        name: 'allRecommendations',
        components: {
            'anime-info-modal': animeInfoModal,
            'manga-info-modal': mangaInfoModal,
            'title-recommendations': titleRecommendations,
            paginate
        },
        head: {
            title() {
                return {
                    inner: 'Recommendations - '+this.$route.params.type,
                    separator: '|',
                    complement: 'Anime'
                }
            },
            meta(){
                return  [
                    {
                        name: 'description',
                        content: 'Check out the latest '+this.$route.params.type+' recommendations.'
                    }
                ]
            }
        },
        data(){
            return {
                recommendations: [],
                loaded: false,
                per_page: 100 //this.$root.screen < 991 ? 30 : 100 
            }
        },
        methods: {
            getRecommendations(){
                let self=this;
                let recommendations=[];
                axios.get("https://api.jikan.moe/v4/recommendations/"+self.$route.params.type+"?page="+(parseInt(self.$route.params.page)))
                .then(response =>{
                    console.log(response.data);
                    let rec=response.data.data;

                    for(let i=0; i<rec.length; i++){
                        recommendations.push({
                            title_id: rec[i].entry[0].mal_id,
                            title_name: rec[i].entry[0].title,
                            title_cover: rec[i].entry[0].images.jpg.image_url,
                            rec_id: rec[i].entry[1].mal_id,
                            rec_name: rec[i].entry[1].title,
                            rec_cover: rec[i].entry[1].images.jpg.image_url,
                            user: rec[i].user.username,
                            text: rec[i].content,
                            date: dayjs.utc(
                                rec[i].date.substring(0,10)
                                +' '+
                                rec[i].date.substring(11,19)
                            ).fromNow(),
                            toggled: false
                        });
                    }

                    console.log('recommendations',recommendations);
                    self.recommendations=recommendations
                    self.loaded=true;
                }).catch(error =>{
                    console.log(error);
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: '<h6>Failed to load recommendations. Please try again!</h6>'
                    });
                    self.loaded=true;
                });
            },
            // getRecommendations(){
            //     let self=this;
            //     let perPage=this.$root.screen<991 ? 30 : 100;

            //     if(this.$root.screen>991){
            //         axios.get("https://cors-anywhere.herokuapp.com/https://myanimelist.net/recommendations.php?s=recentrecs&t="+this.$route.params.type+'&show='+(parseInt(this.$route.params.page*perPage)-perPage))
            //         .then(response => {
            //             let recommendations=[];
            //             const $=cheerio.load(response.data);
            //             let rows=$("#content > div:nth-child(3) > .spaceit.borderClass");

            //             for(let i=0; i<rows.length; i++){

            //                 recommendations.push({
            //                     title_id: rows[i].children[1].children[1].children[0].children[1].children[1].children[0].attribs.href.match(/[0-9]+/),

            //                     title_name: rows[i].children[1].children[1].children[0].children[1].children[5].children[0].children[0].data,

            //                     title_cover: rows[i].children[1].children[1].children[0].children[1].children[1].children[0].children[0].attribs["data-src"].replace('t.jpg','.jpg'),

            //                     rec_id: rows[i].children[1].children[1].children[0].children[3].children[5].attribs.href.match(/[0-9]+/),

            //                     rec_name: rows[i].children[1].children[1].children[0].children[3].children[5].children[0].children[0].data,

            //                     rec_cover: rows[i].children[1].children[1].children[0].children[3].children[1].children[0].children[0].attribs["data-src"].replace('t.jpg','l.jpg'),

            //                     user: rows[i].children[4].children[2].children[0].data,

            //                     text: rows[i].children[3].children[0].data,

            //                     date: rows[i].children[4].children[3].data.replace(' - ',''),

            //                     toggled: false
            //                 });
            //             }
            //             console.log('recommendations',recommendations)

            //             self.recommendations=recommendations;
            //             self.loaded=true;
            //         }).catch(error => {
            //             console.log(error);
            //             this.$notify({
            //                 group: 'foo',
            //                 type: 'error',
            //                 title: '<h6>Failed to load recommendations. Please try again!</h6>'
            //             });
            //             self.loaded=true;
            //         });
            //     }
            //     else{
            //         axios.get("https://cors-anywhere.herokuapp.com/https://myanimelist.net/recommendations.php?s=recentrecs&t="+this.$route.params.type+'&show='+(parseInt(this.$route.params.page*perPage)-perPage))
            //         .then(response => {
            //             let recommendations=[];
            //             const $=cheerio.load(response.data);
            //             let rows=$("#content > div > div > div > .box-unit4.ml0.mr0");

            //             for(let i=0; i<rows.length; i++){

            //                 recommendations.push({
            //                     title_id: rows[i].children[1].children[1].children[1].attribs.href.match(/[0-9]+/),

            //                     title_name: rows[i].children[1].children[1].children[3].children[0].children[0].data,

            //                     title_cover: rows[i].children[1].children[1].children[1].children[1].children[1].attribs["data-src"],

            //                     rec_id: rows[i].children[1].children[5].children[1].attribs.href.match(/[0-9]+/),

            //                     rec_name: rows[i].children[1].children[5].children[3].children[0].children[0].data,

            //                     rec_cover: rows[i].children[1].children[5].children[1].children[1].children[1].attribs["data-src"],

            //                     user: rows[i].children[5].children[1].children[0].data.replace('Anime rec by ','').replace('Manga rec by ',''),

            //                     text: rows[i].children[3].children[1].children[1].children[1].children[0].data,

            //                     date: '',

            //                     toggled: false
            //                 });
            //             }
            //             console.log('recommendations',recommendations)

            //             self.recommendations=recommendations;
            //             self.loaded=true;
            //         }).catch(error => {
            //             console.log(error);
            //             this.$notify({
            //                 group: 'foo',
            //                 type: 'error',
            //                 title: '<h6>Failed to load recommendations. Please try again!</h6>'
            //             });
            //             self.loaded=true;
            //         });
            //     }
            // },
            openModal(ref,id,title) {
                ref=="animeInfoModal"
                ? this.$refs.animeInfoModal.openModal(ref,id,title)
                : this.$refs.mangaInfoModal.openModal(ref,id,title)
            }
        },
        mounted(){
            dayjs.extend(relativeTime);
            dayjs.extend(utc);
            dayjs.utc().format()
        },
        created(){
            this.getRecommendations();
        }
    }
</script>