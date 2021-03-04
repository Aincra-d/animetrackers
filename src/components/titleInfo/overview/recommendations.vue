<template>
    <div>
        <div class="w-100 text-left text-light">
            <ui-collapsible
            v-if="recommendations.length!=0"
            title="Recommendations"
            class="text-dark bg-transparent border-0"
            open>
                <div v-if="loaded">
                    <recommendations
                    @open-modal="openModal"
                    class="text-light"
                    :slider="true"
                    :recommendations="recommendations">
                    </recommendations>
                </div>

                <div
                v-else
                class="w-100 text-center text-light">
                    <i class="fas fa-spinner fa-2x fa-spin"></i>
                </div>
            </ui-collapsible>
        </div>
    </div>
</template>

<script>
import axios               from  'axios';
import recommendations     from  '@/components/titleInfo/recommendations/cardView.vue';
export default {
    name: 'overviewRecommendations',
    components: {
        'recommendations': recommendations
    },
    data(){
        return {
            recommendations: [],
            loaded: false
        }
    },
    methods: {
        getRecommendations(){
            let self=this;
            let recommendations=[];

            axios.get("https://api.jikan.moe/v3/"+this.$route.params.type+"/"+this.$route.params.titleid+"/recommendations")
            .then(response =>{
                console.log(response.data)

                response.data.recommendations.slice(0,10).forEach(item => {
                    recommendations.push({
                        id: item.mal_id,
                        image: item.image_url,
                        title: item.title,
                        count: item.recommendation_count
                    });
                });

                let my_list=localStorage[this.$route.params.type+'List'];

                if(my_list){
                    recommendations.forEach(item => {
                        item.status = JSON.parse(my_list).filter(list_item => list_item.id === item.id)[0]
                        ? JSON.parse(my_list).filter(list_item => list_item.id === item.id)[0].status
                        : null
                    });
                }


                console.log('recommendations',recommendations);

                self.recommendations = recommendations;
                self.loaded = true;
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
        openModal(ref,id,title){
            this.$emit('open-modal',ref,id,title);
        }
    },
    mounted(){
        window.addEventListener("resize",this.onResize);
    },
    created(){
        let self=this;
        setTimeout(function() {
            self.getRecommendations();
        }, 3000);
    }
}
</script>