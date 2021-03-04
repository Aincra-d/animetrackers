<template>
    <div>
        <ui-collapsible
        title="Statistics"
        class="text-dark bg-transparent"
        open>
            <div class="my-2 float-md-left">
                <h4 class="text-light">Anime</h4>
                <vc-donut
                class="font-xs-12 font-sm-16 text-light"
                background="white"
                foreground="grey"
                :size="$root.screen < 576 ? 160 : 200"
                unit="px"
                :thickness="45"
                has-legend
                :legend-placement="$root.screen < 576 ? 'right' : 'right'"
                :sections="[
                {
                    label: 'Watching - '+stats.anime.watching,
                    value: stats.anime['watching'],
                    color: 'LimeGreen'
                },
                {
                    label: 'Completed - '+stats.anime.completed,
                    value: stats.anime['completed'],
                    color: 'Dodgerblue'
                },
                {
                    label: 'On-hold - '+stats.anime.on_hold,
                    value: stats.anime['on_hold'],
                    color: 'Yellow'
                },
                {
                    label: 'Dropped - '+stats.anime.dropped,
                    value: stats.anime['dropped'],
                    color: 'Red'
                },
                {
                    label: 'Plan to watch - '+stats.anime.plan_to_watch,
                    value: stats.anime['plan_to_watch'],
                    color: 'Gray'
                }
                ]"
                :total="stats.anime.total_entries"
                :start-angle="0">
                    <h6 class="text-dark">
                        Total:
                        <h5>
                            {{ stats.anime.total_entries }}
                        </h5>
                    </h6>
                </vc-donut>

                <ul class="list-unstyled text-light mt-2 text-center">
                    <li class="d-inline mx-1 font-italic">
                        Score: {{ stats.anime.mean_score }}
                    </li>

                    <li
                    v-if="$route.params.username"
                    class="d-inline mx-1 font-italic">
                        Days: {{ stats.anime.days_watched }}
                    </li>

                    <li class="d-inline mx-1 font-italic">
                        Episodes: {{ stats.anime.episodes_watched }}
                    </li>
                </ul>
            </div>


            <div class="my-2 float-md-right">
                <h4 class="text-light">
                    Manga
                </h4>

                <vc-donut
                class="font-xs-12 font-sm-16 text-light"
                background="white"
                foreground="grey"
                :size="$root.screen < 576 ? 160 : 200"
                unit="px"
                :thickness="45"
                has-legend
                :legend-placement="$root.screen < 576 ? 'right' : 'right'"
                :sections="[
                {
                    label: 'Reading - '+stats.manga.reading,
                    value: stats.manga['reading'],
                    color: 'LimeGreen'
                },
                {
                    label: 'Completed - '+stats.manga.completed,
                    value: stats.manga['completed'],
                    color: 'Dodgerblue'
                },
                {
                    label: 'On-hold - '+stats.manga.on_hold,
                    value: stats.manga['on_hold'],
                    color: 'Yellow'
                },
                {
                    label: 'Dropped - '+stats.manga.dropped,
                    value: stats.manga['dropped'],
                    color: 'Red'
                },
                {
                    label: 'Plan to read - '+stats.manga.plan_to_read,
                    value: stats.manga['plan_to_read'],
                    color: 'Gray'
                }
                ]"
                :total="stats.manga.total_entries"
                :start-angle="0">
                <h6 class="text-dark">
                    Total:
                    <h5>
                        {{ stats.manga.total_entries }}
                    </h5>
                </h6>
                </vc-donut>

                <ul class="list-unstyled text-light mt-2 text-center">
                    <li class="d-inline mx-1 font-italic">
                        Score: {{ stats.manga.mean_score }}
                    </li>

                    <li
                    v-if="$route.params.username"
                    class="d-inline mx-1 font-italic">
                        Days: {{ stats.manga.days_read }}
                    </li>

                    <li class="d-inline mx-1 font-italic">
                        Chapters: {{ stats.manga.chapters_read }}
                    </li>
                </ul>
            </div>

            <div
            v-if="!$route.params.username"
            class="col-12 col-md-6 p-0 m-0 text-left float-md-left">
                <h4 class="text-light">
                    Anime ratings distribution
                </h4>

                <bar-chart
                :colors="['Dodgerblue']"
                :data="stats.anime.ratings.slice().reverse()">
                </bar-chart>
            </div>

            <div
            v-if="!$route.params.username"
            class="col-12 col-md-6 p-0 m-0 text-left float-md-right">
                <h4 class="text-light">
                    Manga ratings distribution
                </h4>

                <bar-chart
                :colors="['Dodgerblue']"
                :data="stats.manga.ratings.slice().reverse()">
                </bar-chart>
            </div>
        </ui-collapsible>
    </div>
</template>

<script>
    export default{
        name: 'stats',
        props: {
            stats: Object
        },
        data(){
            return {
                anime_stats: [
                {
                    label: 'Watching - '+this.stats.anime.watching,
                    value: this.stats.anime['watching'],
                    color: 'LimeGreen'
                },
                {
                    label: 'Completed - '+this.stats.anime.completed,
                    value: this.stats.anime['completed'],
                    color: 'Dodgerblue'
                },
                {
                    label: 'On-hold - '+this.stats.anime.on_hold,
                    value: this.stats.anime['on_hold'],
                    color: 'Yellow'
                },
                {
                    label: 'Dropped - '+this.stats.anime.dropped,
                    value: this.stats.anime['dropped'],
                    color: 'Red'
                },
                {
                    label: 'Plan to watch - '+this.stats.anime.plan_to_watch,
                    value: this.stats.anime['plan_to_watch'],
                    color: 'Gray'
                }
                ],
                manga_stats: [
                {
                    label: 'Reading - '+this.stats.manga.reading,
                    value: this.stats.manga['reading'],
                    color: 'LimeGreen'
                },
                {
                    label: 'Completed - '+this.stats.manga.completed,
                    value: this.stats.manga['completed'],
                    color: 'Dodgerblue'
                },
                {
                    label: 'On-hold - '+this.stats.manga.on_hold,
                    value: this.stats.manga['on_hold'],
                    color: 'Yellow'
                },
                {
                    label: 'Dropped - '+this.stats.manga.dropped,
                    value: this.stats.manga['dropped'],
                    color: 'Red'
                },
                {
                    label: 'Plan to read - '+this.stats.manga.plan_to_read,
                    value: this.stats.manga['plan_to_read'],
                    color: 'Gray'
                }
                ]
            }
        }
    }
</script>