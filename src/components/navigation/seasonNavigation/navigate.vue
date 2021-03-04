<template>
    <div>
        <ui-select
        class="mx-1 my-0"
        placeholder="Select year"
        :options="years"
        v-model="year"
        :value="year"
        @change="changeYear"
        ></ui-select>

        <ui-select
        class="mx-1 my-0"
        placeholder="Select season"
        :options="seasons"
        v-model="season"
        :value="season"
        @change="changeSeason"
        ></ui-select>

        <router-link
        class="d-inline-block"
        :to="'/season/'+prev_year+'/'+prev_season">
            <button class="btn btn-link btn-sm">
                <i
                :class="$root.screen>330 && 'fa-lg'"
                class="fas fa-angle-left text-light p-0 m-0 font-weight-bold ml-1">
                </i>
            </button>
        </router-link>

        <router-link
        class="d-inline-block"
        :to="'/season/'+next_year+'/'+next_season">
            <button class="btn btn-link btn-sm">
                <i
                :class="$root.screen>330 && 'fa-lg'"
                class="fas fa-angle-right text-light p-0 m-0 font-weight-bold ml-1">
                </i>
            </button>
        </router-link>
    </div>
</template>

<script>
    export default{
        name: 'navigate',
        data(){
            let years=[];
            let seasons=['winter','spring','summer','fall'];
            for(let i=1950; i<2021; i++) years.push(JSON.stringify(i));
            return{
                years: (years),
                year: this.$route.params.year,
                seasons: seasons,
                season: this.$route.params.season.toLowerCase(),

                next_year: this.$route.params.season=='fall'
                ? parseInt(this.$route.params.year)+1
                : this.$route.params.year,

                next_season: this.$route.params.season!='fall'
                ? seasons[seasons.indexOf(this.$route.params.season)+1]
                : 'winter',

                prev_year: this.$route.params.season=='winter'
                ? parseInt(this.$route.params.year)-1
                : this.$route.params.year,

                prev_season: this.$route.params.season!='winter'
                ? seasons[seasons.indexOf(this.$route.params.season)-1]
                : 'fall'
            }
        },
        methods: {
            changeYear(){
                this.year=this.years.find(x => x == this.year)
            },
            changeSeason(){
                this.$router.push({
                    // path: '/season/'+this.year+'/'+this.season
                    name: 'seasonalAnime',
                    params: {
                        year: this.year,
                        season: this.season
                    }
                });

                this.next_season=this.$route.params.season!='fall'
                ? this.seasons[this.seasons.indexOf(this.$route.params.season)+1]
                : 'winter';

                this.prev_season=this.$route.params.season!='winter'
                ? this.seasons[this.seasons.indexOf(this.$route.params.season)-1]
                : 'fall'
            }
        },
        watch: {
            '$route.params': function (params) {
                this.year=params.year;
                this.season=params.season;

                this.next_year=params.season!='fall'
                ? params.year
                : parseInt(params.year)+1;

                this.next_season=params.season!='fall'
                ? this.seasons[this.seasons.indexOf(params.season)+1]
                : 'winter';

                this.prev_year=params.season!='winter'
                ? params.year
                : parseInt(params.year)-1;

                this.prev_season=params.season!='winter'
                ? this.seasons[this.seasons.indexOf(params.season)-1]
                : 'fall';
            }
        }
    }
</script>

<style>
    .ui-select__content *{
        color:white !important;
        max-width: 150px;
    }

    .ui-select{
        display: inline-block!important;
    }
</style>