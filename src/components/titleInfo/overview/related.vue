<template>
    <div>
        <div class="w-100 text-center text-light">
            <ui-collapsible
            title="Related"
            class="text-dark bg-transparent border-0"
            open>
                <div class="w-100 text-center">
                    <div
                    v-for="(relate,index) in related.nodes"
                    :key="index"
                    class="w-xs-98 w-sm-48 w-md-48 w-lg-48 w-xl-48 text-left
                    text-light d-inline-block my-1 mx-auto mx-sm-1 related-container rounded">
                        <div>
                            <related-cover
                            :hasMALID="relate.idMal!=null ? true : false"
                            class="d-inline-block"
                            :relation="relate">
                            </related-cover>

                            <div class="d-inline-block w-60 ml-2 text-left align-top table-sm-info">
                                <related-title
                                :hasMALID="relate.idMal!=null ? true : false"
                                :relation="relate"
                                :type="related.edges[index].relationType"
                                :screen="screen">
                                </related-title>
                            </div>

                            <button
                            v-if="relate.idMal!=null"
                            @click="openModal(relate.type.toLowerCase()
                            +'InfoModal',relate.idMal,
                            (relate.title.english || relate.title.romaji))"
                            class="float-right border-0 rounded bg-transparent py-1">
                                <i class="fas fa-info-circle text-light fa-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </ui-collapsible>
        </div>
    </div>
</template>

<script>
import relatedCover from '@/components/titleInfo/overview/related/cover.vue';
import relatedTitle from '@/components/titleInfo/overview/related/title.vue';
export default {
    name: 'related',
    components: {
        'related-cover': relatedCover,
        'related-title': relatedTitle
    },
    data(){
        return {
            related: [],
            screen: window.innerWidth
        }
    },
    methods: {
        handleResponse(response) {
            return response.json();
        },

        handleData(data) {
            console.log(data.data.Media || data);
            this.related=data.data.Media.relations;
        },

        handleError(error) {
            alert('Error, check console');
            console.error(error);
        },
        onResize(){
            this.screen=window.innerWidth
        },
        openModal(ref,id,title) {
            this.$emit('open-modal',ref,id,title);
        }
    },
    mounted(){
        window.addEventListener('resize',this.onResize)
    },
    created(){
        let query = `
            query ($idMal: Int) { # Define which variables will be used in the query (idMal)
                Media (idMal: $idMal, type: `+this.$route.params.type.toUpperCase()+`) { # Insert our variables into the query arguments (idMal) (type: ANIME is hard-coded in the query)
                    relations {
                        nodes {
                            idMal
                            type
                            coverImage {
                                large
                            }
                            title {
                                romaji
                                english
                            }
                        }
                        edges {
                            relationType
                        }
                    }
                }
            }
            `;
            let variables = {
                idMal: this.$route.params.titleid
            };

            let url = 'https://graphql.anilist.co';

            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                    variables: variables
                })
            };

            fetch(url, options)
            .then(this.handleResponse)
            .then(this.handleData)
            .catch(this.handleError);
    }
}
</script>

<style scoped>
   @media(max-width: 991px){
        .table-sm-info{
            max-width: 65%;
        }
    }

    @media(min-width: 991px){
        .table-sm-info{
            max-width: 80%;
        }
    }


    .anime-info{
        border-radius: 50%;
    }

    .related-container{
        background-color: rgba(0,0,0,0.3);
        border-bottom-left-radius: 5%;
        border-top-left-radius: 5%;
    }

    .table-sm-info{
        white-space: pre-line;
    }
</style>