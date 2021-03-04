<template>
    <div>
        <h3 class="text-light">
          Stats
        </h3>

        <stats :screen="screen" :allRatings="allRatings" :charRatings="charRatings" :stats="stats" :sections="sections" :lineStats="lineStats" v-if="loaded"></stats>
        <div v-else class="w-100 text-center font-weight-bold text-light">
          <span>
            <i class="fas fa-spinner fa-2x fa-spin"></i>
          </span>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import stat from '@/components/animeInfo/stats/stat.vue';
    export default{
        name: 'animeStats',
        components: {
            'stats': stat
        },
        data(){
            let charRatings=[];
            let stats={};
            let sections=[];
            let lineStats=[];
            axios.get("https://api.jikan.moe/v3/anime/"+this.$route.params.animeid+"/stats")
            .then(response => {
                console.log(response.data);

                stats['watching'] = response.data.watching;
                stats['completed'] = response.data.completed;
                stats['on_hold'] = response.data.on_hold;
                stats['dropped'] = response.data.dropped;
                stats['plan_to_watch'] = response.data.plan_to_watch;
                stats['total'] = response.data.watching+response.data.completed+response.data.on_hold+response.data.dropped+response.data.plan_to_watch;

                for(let i=1; i<=10; i++){
                    charRatings.push([i+'/10', response.data.scores[i].votes]);
                    this.$data.allRatings+=response.data.scores[i].votes;
                }

                console.log(charRatings);
                this.$data.loaded=true;


                lineStats.push(
                    { label: 'Watching', value: stats['watching'], color: 'LimeGreen' },
                    { label: 'Completed', value: stats['completed'], color: 'Dodgerblue' },
                    { label: 'On-hold', value: stats['on_hold'], color: 'Yellow' },
                    { label: 'Dropped', value: stats['dropped'], color: 'Red' },
                    { label: 'Plan to watch', value: stats['plan_to_watch'], color: 'Gray' }
                );


                sections.push(
                    { label: 'Watching - '+stats.watching, value: stats['watching'], color: 'LimeGreen' },
                    { label: 'Completed - '+stats.completed, value: stats['completed'], color: 'Dodgerblue' },
                    { label: 'On-hold - '+stats.on_hold, value: stats['on_hold'], color: 'Yellow' },
                    { label: 'Dropped - '+stats.dropped, value: stats['dropped'], color: 'Red' },
                    { label: 'Plan to watch - '+stats.plan_to_watch, value: stats['plan_to_watch'], color: 'Gray' }
                );
            }).catch(error => { console.log(error) });

            return{
                charRatings: charRatings,
                allRatings: 0,
                stats: stats,
                loaded: false,
                sections: sections,
                screen: window.innerWidth,
                lineStats: lineStats
            }
        },
        methods: {
            onResize(){
                this.screen=window.innerWidth
            }
        },
        created(){
            window.addEventListener('resize',this.onResize)
        }
    }
</script>