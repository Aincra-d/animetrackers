<template>
    <div>
        <about
        v-if="about!=null && $route.params.username"
        :about="about">
        </about>

        <stats :stats="stats">
        </stats>

        <favourites
        :favourites="favourites">
        </favourites>

        <history
        v-if="!$route.params.username && history.length > 0"
        :history="history">
        </history>
    </div>
</template>

<script>
    import axios          from  'axios';
    import about          from  './about.vue';
    import favourites     from  './favourites.vue';
    import history        from  './profile/history.vue';
    import stats          from  './stats.vue';
    import dayjs          from  'dayjs';
    import relativeTime   from  'dayjs/plugin/relativeTime';
    import utc            from  'dayjs/plugin/utc'; 
    export default{
        name: 'profile',
        components: {
            about,
            favourites,
            history,
            stats
        },
        head: {
            title() {
                return {
                    inner: this.$route.params.username.split('-').join(' ')+' - Profile',
                    separator: '-',
                    complement: 'Anime'
                }
            },
            meta(){
                return  [
                    {
                        name: 'description',
                        content: 'Check out the profile of '+this.$route.params.username.split('-').join(' ')+',including statistics, introduction and favourites.',
                        id: this.$route.params.titleid
                    }
                ]
            }
        },
        data(){
            return{
                stats: {},
                about: '',
                favourites: {},
                history: []
            }
        },
        methods: {

        },
        created(){
            let favourites={};
            let history=[];
            let stats={};
            let self=this;


            if(this.$route.params.username){
                console.log(this.$route)
                axios.get("https://api.jikan.moe/v3/user/"+this.$route.params.username)
                .then(response => {
                    console.log(response.data)
                    let user=response.data;
                    self.about=user.about;
                    stats={
                        anime: {
                            days_watched: user.anime_stats.days_watched,
                            mean_score: user.anime_stats.mean_score,
                            watching: user.anime_stats.watching,
                            completed: user.anime_stats.completed,
                            on_hold: user.anime_stats.on_hold,
                            dropped: user.anime_stats.dropped,
                            plan_to_watch: user.anime_stats.plan_to_watch,
                            total_entries: user.anime_stats.total_entries,
                            rewatched: user.anime_stats.rewatched,
                            episodes_watched: user.anime_stats.episodes_watched
                        },
                        manga: {
                            days_read: user.manga_stats.days_read,
                            mean_score: user.manga_stats.mean_score,
                            reading: user.manga_stats.reading,
                            completed: user.manga_stats.completed,
                            on_hold: user.manga_stats.on_hold,
                            dropped: user.manga_stats.dropped,
                            plan_to_read: user.manga_stats.plan_to_read,
                            total_entries: user.manga_stats.total_entries,
                            reread: user.manga_stats.reread,
                            chapters_read: user.manga_stats.chapters_read,
                            volumes_read: user.manga_stats.volumes_read
                        }
                    };
                    console.log(stats)
                    self.stats=stats;
    
                    favourites={
                        anime: user.favorites.anime,
                        manga: user.favorites.manga,
                        characters: user.favorites.characters,
                        people: user.favorites.people
                    };

                    favourites.characters.forEach(character => {
                        character.favourited = localStorage.favourites
                        ? JSON.parse(localStorage.favourites).characters.filter(item => item.id === character.mal_id).length > 0
                        : false
                    });

                    favourites.people.forEach(person => {
                        person.favourited = localStorage.favourites
                        ? JSON.parse(localStorage.favourites).people.filter(item => item.id === person.mal_id).length > 0
                        : false
                    });

                    self.favourites=favourites;
                }).catch(error => { console.log(error) });
            }
            else{
                let hasAnimeList=localStorage.animeList ? true : false;
                let hasMangaList=localStorage.mangaList ? true : false;
                console.log(hasAnimeList,hasMangaList)

                let anime_list=hasAnimeList && JSON.parse(localStorage.animeList);
                let manga_list=hasMangaList && JSON.parse(localStorage.mangaList);

                let anime_ratings=[];
                let manga_ratings=[];

                for(let i=0; i<=10; i++){
                    anime_ratings.push([
                        i == 0 ? '-' : i+'/10',
                        hasAnimeList
                        ? anime_list.map(anime => anime.score).filter(score => score == i).length
                        : 0
                    ]);
                    manga_ratings.push([
                        i == 0 ? '-' : i+'/10',
                        hasMangaList
                        ? manga_list.map(manga => manga.score).filter(score => score == i).length
                        : 0
                    ]);
                }

                console.log('Anime ratings: ',anime_ratings);
                console.log('Manga ratings: ',manga_ratings);


                let anime_scores=hasAnimeList ? anime_list.map(anime => parseInt(anime.score)) : [];
                let anime_progress=hasAnimeList ? anime_list.map(anime => parseInt(anime.progress)) : [];
                let anime_mean_score=anime_scores.reduce((a, b) => a + b, 0)/(anime_scores.filter(score => score!=0)).length || 0;

                let manga_scores=hasMangaList ? manga_list.map(manga => parseInt(manga.score)) : [];
                let manga_progress=hasMangaList ? manga_list.map(manga => parseInt(manga.progress)) : [];
                let manga_mean_score=manga_scores.reduce((a, b) => a + b, 0)/(manga_scores.filter(score => score!=0)).length || 0;

                console.log("asd")

                stats={
                    anime: {
                        days_watched: 0,
                        mean_score: Math.round(anime_mean_score*100)/100,
                        watching: hasAnimeList ? anime_list.filter(anime => anime.status == 'Watching').length : 0,
                        completed: hasAnimeList ? anime_list.filter(anime => anime.status == 'Completed').length : 0,
                        on_hold: hasAnimeList ? anime_list.filter(anime => anime.status == 'On-hold').length : 0,
                        dropped: hasAnimeList ? anime_list.filter(anime => anime.status == 'Dropped').length : 0,
                        plan_to_watch: hasAnimeList ? anime_list.filter(anime => anime.status == 'Plan to watch').length : 0,
                        total_entries: hasAnimeList ? anime_list.length : 0,
                        rewatched: 0,
                        episodes_watched: anime_progress.filter(progress => progress).reduce((a, b) => a + b, 0),
                        ratings: anime_ratings
                    },
                    manga: {
                        days_read: 0,
                        mean_score: Math.round(manga_mean_score*100)/100,
                        reading: hasMangaList ? manga_list.filter(manga => manga.status == 'Reading').length : 0,
                        completed: hasMangaList ? manga_list.filter(manga => manga.status == 'Completed').length : 0,
                        on_hold: hasMangaList ? manga_list.filter(manga => manga.status == 'On-hold').length : 0,
                        dropped: hasMangaList ? manga_list.filter(manga => manga.status == 'Dropped').length : 0,
                        plan_to_read: hasMangaList ? manga_list.filter(manga => manga.status == 'Plan to read').length : 0,
                        total_entries: hasMangaList ? manga_list.length : 0,
                        reread: 0,
                        chapters_read: manga_progress.reduce((a, b) => a + b, 0),
                        volumes_read: 0,
                        ratings: manga_ratings
                    }
                }

                self.stats=stats;
                console.log('stats',self.stats);

                let anime_favourites=JSON.parse(localStorage.favourites).anime || [];
                let manga_favourites=JSON.parse(localStorage.favourites).manga || [];
                let character_favourites=JSON.parse(localStorage.favourites).characters || [];
                let people_favourites=JSON.parse(localStorage.favourites).people || [];


                let favourite_anime=[];
                for(let i=0; i<anime_favourites.length; i++){
                    favourite_anime.push({
                        image_url: anime_favourites[i].image,
                        mal_id: anime_favourites[i].id,
                        name: anime_favourites[i].name
                    });
                }


                let favourite_manga=[];
                for(let i=0; i<manga_favourites.length; i++){
                    favourite_manga.push({
                        image_url: manga_favourites[i].image,
                        mal_id: manga_favourites[i].id,
                        name: manga_favourites[i].name
                    });
                }


                let favourite_characters=[];
                for(let i=0; i<character_favourites.length; i++){
                    favourite_characters.push({
                        image_url: character_favourites[i].image,
                        mal_id: character_favourites[i].id,
                        name: character_favourites[i].name
                    });
                }


                let favourite_people=[];
                for(let i=0; i<people_favourites.length; i++){
                    favourite_people.push({
                        image_url: people_favourites[i].image,
                        mal_id: people_favourites[i].id,
                        name: people_favourites[i].name
                    });
                }

                favourites={
                    anime: favourite_anime.length!=0 ? favourite_anime : {},
                    manga: favourite_manga.length!=0 ? favourite_manga : {},
                    characters: favourite_characters.length!=0 ? favourite_characters : {},
                    people: favourite_people.length!=0 ? favourite_people : {}
                };

                self.favourites=favourites;

                console.log('favourites',self.favourites);


                anime_list.forEach(item => item.type='anime');
                manga_list.forEach(item => item.type='manga');
                let list=anime_list.concat(manga_list);


                list.sort((a,b) => new Date(b.date) - new Date(a.date));

                history=list.slice(0,5);

                self.history=history;
                self.history.forEach(item => item.updated = dayjs(item.date).fromNow());

                console.log('history',self.history);
            }
        },
        mounted(){
            dayjs.extend(relativeTime);
            dayjs.extend(utc);
        }
    }
</script>