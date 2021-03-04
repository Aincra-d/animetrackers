<template>
    <div>

    <div class="w-100 text-center text-light font-weight-bold">
        <ul class="list-unstyled">
            <li :key="genre.mal_id" v-for="genre in genres" class="d-inline-block d-lg-inline my-1 mr-1">
                <button type="button" class="btn btn-light rounded-0 btn-sm px-1 genres">{{genre.name}}</button>
            </li>
        </ul>
    </div>
    <!-- <characters v-if="charactersLoaded" :characters="characters"></characters>
    <span v-if="!charactersLoaded" class="font-weight-bold text-light">
        Loading characters <i class="fas fa-spinner fa-spin"></i>
    </span> -->
    <info :info="info"></info>
    <story :story="story"></story>
    <related v-if="relatedLoaded" :info="info"></related>
    </div>
</template>

<script>
    import axios from 'axios';
    // import characters from '@/components/mangaInfo/characters.vue';
    import related from '@/components/mangaInfo/overview/related.vue';
    import info from '@/components/mangaInfo/overview/info.vue';
    import story from '@/components/mangaInfo/overview/story.vue';
    export default{
        name: 'overview',
        components: {
            // characters,
            // info,
            related,
            story,
            info
        },
        data(){
            let info=[];
            let genres=[];
            let authors=[];
            axios.get("https://api.jikan.moe/v3/manga/"+this.$route.params.mangaid)
            .then(response => {
                console.log(response.data);

                let manga=response.data;
                for(let i=0; i<manga.genres.length; i++){
                    genres.push({
                        id: manga.genres[i].mal_id,
                        name: manga.genres[i].name
                    });
                }

                for(let i=0; i<manga.authors.length; i++){
                    authors.push({
                        id: manga.authors[i].mal_id,
                        name: manga.authors[i].name
                    });
                }
                info.push({
                    status: manga.status,
                    type: manga.type,
                    volumes: manga.volumes,
                    chapters: manga.chapters,
                    published: manga.published.string,
                    rating: manga.rating,
                    authors: manga.authors,
                    related: manga.related,
                });
                this.$data.story=manga.synopsis;
                this.$data.relatedLoaded=true;
            }).catch(error => { console.log(error) });

            // let characters=[];
            // axios.get("https://api.jikan.moe/v3/manga/"+this.$route.params.mangaid+"/characters_staff")
            // .then(response =>{
            //  for(let i=0; i<response.data.characters.length && i<=10; i++){
            //      characters.push({
            //          id: response.data.characters[i].mal_id,
            //          image: response.data.characters[i].image_url,
            //          name: response.data.characters[i].name,
            //          role: response.data.characters[i].role
            //      });
            //     this.$data.charactersLoaded=true;
            //  }
            // }).catch(error =>{ console.log(error) });
            return{
                info: info,
                genres: genres,
                story: "",
                // characters: characters,
                charactersLoaded: false,
                relatedLoaded: false
            }
        }
    };
</script>

<style scoped>
    .genres{
        border-radius: 10% !important;
    }
</style>