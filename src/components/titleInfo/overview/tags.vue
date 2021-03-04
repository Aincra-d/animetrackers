<template>
    <div>
        <div class="w-100 text-left text-light">
            <ui-collapsible v-if="tags.length!=0" title="Tags" class="text-dark bg-transparent border-0" :open="$root.screen>991">
               <div class="w-100 text-center">
                   
                   <div
                   @click="tag.toggled=!tag.toggled"
                   :key="tag.name"
                   v-for="tag in tags"
                   title="Click to see tag description."
                   class="d-block d-sm-inline-block w-xs-100 w-sm-48 w-md-23 w-lg-20 w-xl-20
                   rounded tag-container text-light text-left p-2 my-2 my-sm-1 mx-sm-1 pointer">
                       <span class="font-weight-bold font-14">
                           {{tag.name}} ({{tag.relevant}}%)
                       </span>

                       <p v-show="tag.toggled" class="font-13">
                           {{tag.description}}
                       </p>
                   </div>

               </div>
            </ui-collapsible>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tags',
    data(){
        return{
            screen: window.innerWidth,
            tags: []
        }
    },
    methods: {
        onResize(){
            this.screen=window.innerWidth
        },
        getTags(){
                let query = `
                query ($idMal: Int) { # Define which variables will be used in the query (idMal)
                    Media (idMal: $idMal, type: `+this.$route.params.type.toUpperCase()+`) { # Insert our variables into the query arguments (idMal) (type: ANIME is hard-coded in the query)
                        # idMal,
                        # bannerImage
                        tags {
                            name
                            category
                            relevant: rank
                            description
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
            },
            handleResponse(response) {
                return response.json();
            },

            handleData(data) {
                console.log(data.data.Media || data);
                for(let i=0; i<data.data.Media.tags.length; i++){
                    data.data.Media.tags[i].toggled=false;
                }
                this.tags=data.data.Media.tags;
            },

            handleError(error) {
                alert('Error, check console');
                console.error(error);
            }
    },
    mounted(){
        window.addEventListener("resize",this.onResize)
    },
    created(){
        this.getTags();
    }
}
</script>

<style scoped>
    .tag-container{
        background-color: rgba(0,0,0,0.3);
    }
</style>