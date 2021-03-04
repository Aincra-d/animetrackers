<template>
    <div>
        <h3 class="text-light">
          Stats
        </h3>

        <stats
        v-if="loaded"
        :screen="screen"
        :allRatings="allRatings"
        :charRatings="charRatings"
        :stats="stats"
        :sections="sections"
        :lineStats="lineStats"
        ></stats>

        <div
        v-else
        class="w-100 text-center font-weight-bold text-light">
          <span>
            <i class="fas fa-spinner fa-2x fa-spin"></i>
          </span>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import stat from '@/components/titleInfo/stats/stat.vue';
    export default{
        name: 'titleStats',
        components: {
            'stats': stat
        },
        head: {
            title() {
                return {
                    inner: this.$route.params.title.split('-').join(' ')+' - Stats',
                    separator: '-',
                    complement: 'Anime'
                }
            },
            meta(){
                return  [
                    {
                        name: 'description',
                        content: 'See different statistics, such as rating and status distribution of '+this.$route.params.title.split('-').join(' '),
                        id: this.$route.params.titleid
                    }
                ]
            }
        },
        data(){
            return{
                charRatings: [],
                allRatings: 0,
                stats: {},
                loaded: false,
                sections: [],
                screen: window.innerWidth,
                lineStats: []
            }
        },
        methods: {
            onResize(){
                this.screen=window.innerWidth
            }
        },
        mounted(){
            window.addEventListener('resize',this.onResize)
        },
        created(){
            let charRatings=[];
            let stats={};
            let sections=[];
            let lineStats=[];
            let self=this;

            axios.get("https://api.jikan.moe/v3/"+this.$route.params.type+"/"+this.$route.params.titleid+"/stats")
            .then(response => {
                console.log(response.data);

                stats['ongoing'] = response.data.watching || response.data.reading;
                stats['completed'] = response.data.completed;
                stats['on_hold'] = response.data.on_hold;
                stats['dropped'] = response.data.dropped;
                stats['planning'] = response.data.plan_to_watch || response.data.plan_to_read;
                stats['total'] = (response.data.watching || response.data.reading)+response.data.completed+response.data.on_hold+response.data.dropped+(response.data.plan_to_watch || response.data.plan_to_read);

                for(let i=1; i<=10; i++){
                    charRatings.push([i+'/10', response.data.scores[i].votes]);
                    this.$data.allRatings+=response.data.scores[i].votes;
                }


                lineStats.push(
                    { label: (this.$route.params.type=='anime' ? 'Watching' : 'Reading'), value: stats['ongoing'], color: 'LimeGreen' },
                    { label: 'Completed', value: stats['completed'], color: 'Dodgerblue' },
                    { label: 'On-hold', value: stats['on_hold'], color: 'Yellow' },
                    { label: 'Dropped', value: stats['dropped'], color: 'Red' },
                    { label: (this.$route.params.type=='anime' ? 'Plan to watch' : 'Plan to read'), value: stats['planning'], color: 'Gray' }
                );


                sections.push(
                    { label: (this.$route.params.type=='anime' ? 'Watching' : 'Reading')+' - '+stats.ongoing, value: stats['ongoing'], color: 'LimeGreen' },
                    { label: 'Completed - '+stats.completed, value: stats['completed'], color: 'Dodgerblue' },
                    { label: 'On-hold - '+stats.on_hold, value: stats['on_hold'], color: 'Yellow' },
                    { label: 'Dropped - '+stats.dropped, value: stats['dropped'], color: 'Red' },
                    { label: (this.$route.params.type=='anime' ? 'Plan to watch' : 'Plan to read')+' - '+stats.planning, value: stats['planning'], color: 'Gray' }
                );

                self.loaded=true;
                self.charRatings=charRatings;
                self.stats=stats;
                self.sections=sections;
                self.lineStats=lineStats;
                
            }).catch(error =>{
                console.log(error);
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: '<h6>Failed to load stats. Please try again!</h6>'
                });
                self.loaded=true;
            });
        }
    }
</script>