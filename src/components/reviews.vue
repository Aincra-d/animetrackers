<template>
    <div
    class="d-block align-items-start text-center"
    style="height:100vh;">
        <anime-info-modal
        v-if="$route.params.type=='anime'"
        ref="animeInfoModal">
        </anime-info-modal>

        <manga-info-modal
        v-else
        ref="mangaInfoModal">
        </manga-info-modal>

        <div v-if="loaded">
            <title-reviews
            @open-modal="openModal"
            :reviews="reviews">
            </title-reviews>

            <paginate
            v-if="reviews.length <= 50"
            :array="reviews"
            :perPage="50">
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
  import animeInfoModal         from '@/components/animeInfoModal.vue';
  import mangaInfoModal         from '@/components/mangaInfoModal.vue';
  import paginate               from '@/components/paginate.vue';
  import titleReviews           from '@/components/reviews/review.vue';
    export default{
        name: 'allreviews',
        components: {
            'anime-info-modal': animeInfoModal,
            'manga-info-modal': mangaInfoModal,
            'title-reviews': titleReviews,
            paginate
        },
        head: {
            title() {
                return {
                    inner: 'Reviews - '+this.$route.params.type,
                    separator: '|',
                    complement: 'Anime'
                }
            },
            meta(){
                return  [
                    {
                        name: 'description',
                        content: 'Check out the latest '+this.$route.params.type+' reviews.'
                    }
                ]
            }
        },
        data(){
            return {
                reviews: [],
                loaded: false
            }
        },
        methods: {
            getReviews(){
                let self=this;
                let reviews=[];

                axios.get("https://api.jikan.moe/v4/reviews/"+self.$route.params.type+"?page="+self.$route.params.page)
                .then(response =>{
                    console.log(response.data);

                    for(let i=0; i<response.data.data.length; i++){
                        reviews.push({
                            id: response.data.data[i].entry.mal_id,

                            title: response.data.data[i].entry.title,

                            cover: response.data.data[i].entry.images.jpg.image_url,

                            votes: response.data.data[i].votes,
                            
                            date: dayjs.utc(
                                response.data.data[i].date.substring(0,10)
                                +' '+
                                response.data.data[i].date.substring(11,19)
                            ).fromNow(),

                            reviewer: {
                                image: response.data.data[i].user.images.jpg.image_url,

                                username: response.data.data[i].user.username,

                                progress: response.data.data[i].episodes_watched
                                || response.data.data[i].chapters_read,
                            },

                            scores: {
                                overall: response.data.data[i].scores.overall,
                                story: response.data.data[i].scores.story,
                                animation: response.data.data[i].scores.animation,

                                art: response.data.data[i].scores.art,

                                sound: response.data.data[i].scores.sound,

                                character: response.data.data[i].scores.character,

                                enjoyment: response.data.data[i].scores.enjoyment
                            },

                            review: response.data.data[i].review,
                            toggled: false
                        });
                    }

                    let my_list=localStorage[this.$route.params.type+'List']
                    ? JSON.parse(localStorage[this.$route.params.type+'List'])
                    : null;


                    if(my_list){
                        reviews.forEach(review => {
                            review.status = my_list.filter(list_item => list_item.id === review.id)[0]
                            ? my_list.filter(list_item => list_item.id === review.id)[0].status
                            : null
                        });
                    }



                    console.log('reviews',reviews);
                    self.reviews=reviews
                    self.loaded=true;
                }).catch(error =>{
                    console.log(error);
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: '<h6>Failed to load reviews. Please try again!</h6>'
                    });
                    self.loaded=true;
                });
            },
            openModal(ref,id,title) {
                ref=="animeInfoModal"
                ? this.$refs.animeInfoModal.openModal(ref,id,title)
                : this.$refs.mangaInfoModal.openModal(ref,id,title)
            }
        },
        mounted(){
            dayjs.extend(relativeTime);
            dayjs.extend(utc);
            dayjs.utc().format();
        },
        created(){
            this.getReviews();
        }
    }
</script>