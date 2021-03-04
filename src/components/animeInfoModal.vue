<template>
    <div>
        <ui-modal
        @close="restoreScroll"
        style="height:100vh;"
        alignTop
        :alignTopMargin="0"
        :max-height="100"
        :title="loaded ? info.title : ''"
        ref="animeInfoModal"
        class="text-dark text-center anime-info-modal">
            <div v-if="loaded">
                <div
                :style="{backgroundImage: 'url('+ info.image + ')'}"
                class="w-100 anime-cover-container position-relative">
                    <div class="cover-layer"></div>
                    <img
                    :src="info.image"
                    class="position-absolute bottom-0 left-5 ml-3">

                    <h6 class="text-primary mr-1 position-absolute top-0 right-0 m-0 p-0">
                        <a
                        target="_blank"
                        :href="'https://myanimelist.net/anime/'+info.id">
                            <button
                            style="outline:0;"
                            class="border-0 text-light bg-primary rounded font-weight-bold outline-none">
                                <i class="fas fa-external-link-alt"></i>
                                MAL
                            </button>
                        </a>
                    </h6>

                    <b-dropdown
                    dropleft
                    class="m-0 bg-dark position-absolute bottom-0 right-0"
                    size="md"
                    variant="link">
                        <template v-slot:button-content>
                            <i class="fas fa-external-link"></i>Go to
                        </template>

                        <b-dropdown-item
                        :key="index"
                        v-for="(page,index) in pages">
                            <i
                            style="width:20px"
                            :class="page.icon"
                            class="fas text-dark mr-2">
                            </i>
                        
                            <router-link
                            class="text-dark"
                            :to="'/anime/'+info.id+'/'+info.title.split(' ').join('-').replace('/','-')+'/'+page.name.toLowerCase()+(page.hasPage ? '/1' : '')">
                                <span>
                                    {{ page.name }}
                                </span>
                            </router-link>
                        </b-dropdown-item>
                    </b-dropdown>
                </div>

                <br>

                <div class="text-center">
                    <button
                    @click="list_toggled=!list_toggled"
                    type="button"
                    class="btn btn-link d-inline-block text-light font-weight-bold">
                        {{isOnList ? 'Edit list' : 'Add to list'}}
                        <span class="font-19">{{list_toggled ? '-' : '+'}}</span>
                    </button>
                    
                    <button
                    @click="collection_toggled=!collection_toggled"
                    type="button"
                    class="btn btn-link d-inline-block text-light font-weight-bold">
                        Add to collection <span class="font-19">{{collection_toggled ? '-' : '+'}}</span>
                    </button>
                </div>

                <add-to-list
                v-if="list_toggled"
                :data="$data"
                @add-to-list="addToList"
                @update-list="updateList"
                @update-favourite="updateFavourite"
                @remove-from-list="removeFromList"
                @change-status="changeStatus">
                </add-to-list>

                <add-to-collection
                v-if="collection_toggled"
                :data="$data"
                @add-to-collection="addToCollection"
                @remove-from-collection="removeFromCollection">
                </add-to-collection>

                <modal-stats :info="info"></modal-stats>
                <modal-info :info="info"></modal-info>
            </div>

            <div
            v-if="!loaded"
            class="w-100 text-center text-dark font-weight-bold">
                <i class="fas fa-spinner fa-3x fa-spin"></i>
            </div>
        </ui-modal>
    </div>
</template>

<script>
    import animeInfoModalTable      from '@/components/titleInfoModal/anime/animeInfoModalTable.vue';
    import animeInfoModalStats      from '@/components/titleInfoModal/anime/animeInfoModalStats.vue';
    import addAnimeToList           from '@/components/titleInfoModal/addToList.vue';
    import addAnimeToCollection     from '@/components/titleInfoModal/addToCollection.vue';
    import axios                    from 'axios';
    export default{
        name: 'animeInfoModal',
        data(){
            return {
                loaded: false,
                info: {},
                isOnList: false,
                status: 'Plan to watch',
                score: '0',
                progress: 0,
                favourited: false,
                list_toggled: false,
                collection_toggled: false,
                collection_name: '',
                collection_is_new: false,
                selected_collection: '',
                collections: [],
                type: 'anime',
                pages: [
                    { name: 'Characters', icon: 'fa-address-book', hasPage: false },
                    { name: 'Staff', icon: 'fa-building', hasPage: false },
                    { name: 'Episodes', icon: 'fa-tv', hasPage: true },
                    { name: 'Reviews', icon: 'fa-pen', hasPage: true },
                    { name: 'Recommendations', icon: 'fa-history', hasPage: false },
                    { name: 'News', icon: 'fa-newspaper', hasPage: false },
                    { name: 'Stats', icon: 'fa-chart-bar', hasPage: false },
                    { name: 'Forum', icon: 'fa-comments', hasPage: false },
                    { name: 'Ratings', icon: 'fa-users', hasPage: true }
                ]
            }
        },
        components: {
            'modal-info': animeInfoModalTable,
            'modal-stats': animeInfoModalStats,
            'add-to-list': addAnimeToList,
            'add-to-collection': addAnimeToCollection
        },
        methods: {
            removeFromList(){
                let anime_list = JSON.parse(localStorage.animeList);
                for (let i = 0; i < anime_list.length; i++) {
                    if(parseInt(this.info.id) === anime_list[i].id){
                        anime_list.splice(i, 1);
                        break;
                    }
                }
                localStorage.setItem("animeList", JSON.stringify(anime_list));
                this.isOnList=false;
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '<h6>Removed <u>'+this.info.title+'</u> from list!</h6>'
                });
            },
            changeStatus(){
                if(this.status=='Completed') this.progress=this.info.episodes;
            },
            updateList(){
                let anime_list=JSON.parse(localStorage.animeList);
                let date=new Date();

                let current_time=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

                for(let i=0; i<anime_list.length; i++){
                    if(anime_list[i].id===parseInt(this.info.id)){
                        anime_list[i].status=this.status;
                        anime_list[i].score=parseInt(this.score);
                        anime_list[i].progress=parseInt(this.progress);
                        anime_list[i].date=current_time;
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: '<h6>Updated <u>'+this.info.title+'</u>!</h6>',
                            text: '<p class="font-14 mb-0"><b>Status:</b> '+this.status+'  <b>Score:</b> '+this.score+'  <b>Progress:</b> '+this.progress+'/'+(this.info.episodes || '?')+'</p>'
                        });
                    }
                }
                localStorage.setItem('animeList', JSON.stringify(anime_list));
            },
            updateFavourite(removing){
                if(localStorage.favourites){
                    let favourites=JSON.parse(localStorage.favourites);

                    if(removing){
                        for(let i=0; i<favourites.anime.length; i++){
                            if(favourites.anime[i].id === this.info.id) favourites.anime.splice(i,1);
                        }

                        this.favourited=false;
                    }
                    else{
                        favourites.anime.push({
                            id: this.info.id,
                            name: this.info.title,
                            image: this.info.image
                        });

                        this.favourited=true;
                    }

                    localStorage.setItem('favourites',JSON.stringify(favourites));
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: '<h6>'+(removing ? 'Removed' : 'Added')+' <u>'+this.info.title+'</u> '+(removing ? 'from' : 'to')+' favourites!</h6>'
                    });
                }
                else{
                    let favourites={
                        anime:[{
                            id: this.info.id,
                            name: this.info.title,
                            image: this.info.image
                        }],
                        manga: [],
                        characters: [],
                        people: []
                    };

                    this.favourited=true;
                    localStorage.setItem('favourites',JSON.stringify(favourites));
                }
            },
            addToList(){
                let date=new Date();

                let current_time=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

                let new_anime={
                    id: parseInt(this.info.id),
                    image: this.info.image,
                    title: this.info.title,
                    status: this.status,
                    score: parseInt(this.score),
                    progress: parseInt(this.progress),
                    genres: this.info.genres.map(genre => genre.name).toString(),
                    date: current_time
                }
                if(localStorage.animeList){
                    let anime_list=JSON.parse(localStorage.animeList);
                    anime_list.push(new_anime);
                    localStorage.setItem('animeList', JSON.stringify(anime_list));
                }
                else{
                    let anime_list=[new_anime];
                    localStorage.setItem('animeList', JSON.stringify(anime_list));
                }
                this.isOnList=true;
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '<h6>Added <u>'+this.info.title+'</u> to list!</h6>',
                    text: '<p class="font-14 mb-0"><b>Status:</b> '+this.status+'  <b>Score:</b> '+this.score+'  <b>Progress:</b> '+this.progress+'/'+(this.info.episodes || '?')+'</p>'
                });
            },
            addToCollection(new_collection){
                let date=new Date();

                let current_time=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

                let new_item={
                    id: this.info.id,
                    title: this.info.title,
                    image: this.info.image,
                    progress: this.progress,
                    score: parseInt(this.score),
                    status: this.status,
                    date: current_time
                };
                let size_limit=100;
                let isOnCollection=false;
                let reachedSizeLimit=false;

                if(localStorage.collections){
                    let collections=JSON.parse(localStorage.collections);

                    if(new_collection){
                        let name_is_empty=this.collection_name.split(' ').join('') === '';
                        if(name_is_empty){
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: '<h6>Collection name cannot be empty!</h6>'
                            });
                            return;
                        }
                        else{
                            collections.push({
                                id: parseInt(collections.length)+1,
                                name: this.collection_name,
                                type: 'anime',
                                items: [new_item]
                            });
                            // console.log(collections);
                            localStorage.setItem('collections',JSON.stringify(collections));
                        }
                    }
                    else{
                        let selected_collection=collections.filter(collection => collection.type == 'anime' && collection.name == this.selected_collection);

                        let collection_items = selected_collection[0].items;
                        let collection_size=selected_collection[0].items.length;
                        reachedSizeLimit=collection_size === size_limit;

                        for (let i = 0; i < collection_items.length; i++) {
                            if(parseInt(this.info.id) === collection_items[i].id){
                                isOnCollection=true;
                                break;
                            }
                        }

                        if(!isOnCollection && collection_size < size_limit){
                            collection_items.push(new_item);
                            localStorage.setItem('collections',JSON.stringify(collections));
                        }
                    }
                }
                else{
                    let collections=[
                        {
                            id: 1,
                            name: this.collection_name,
                            type: 'anime',
                            items: [new_item]
                        }
                    ];
                    console.log(collections);
                    localStorage.setItem('collections',JSON.stringify(collections));
                }

                let title;

                if(reachedSizeLimit){
                    title = 'Collection "'+this.selected_collection+'" has reached its size limit('+size_limit+')!'
                }
                else{
                    title=!isOnCollection
                    ? 'Added <u>'+this.info.title+'</u> to collection "'+(new_collection ? this.collection_name : this.selected_collection)+'"!'
                    : ''+this.info.title+'</u> is already added to collection "'+this.selected_collection+'"!';
                }

                this.$notify({
                    group: 'foo',
                    type: (isOnCollection || reachedSizeLimit) ? 'error' : 'success',
                    title: '<h6>'+title+'</h6>'
                });
            },
            removeFromCollection(){
                let collections = JSON.parse(localStorage.collections);
                let collection_items = collections.filter(collection => collection.type == 'anime' && collection.name == this.selected_collection)[0].items;
                let isOnList=false;

                for (let i = 0; i < collection_items.length; i++) {
                    if(parseInt(this.info.id) === collection_items[i].id){
                        collection_items.splice(i, 1);
                        isOnList=true;
                        break;
                    }
                }

                let title=isOnList
                ? '<h6>Removed <u>'+this.info.title+'</u> from collection "'+this.selected_collection+'"!</h6>'
                : '<h6>'+this.info.title+'</u> is not added to collection "'+this.selected_collection+'"!</h6>';

                localStorage.setItem('collections',JSON.stringify(collections));
                this.$notify({
                    group: 'foo',
                    type: isOnList ? 'success' : 'error',
                    title: title
                });
            },
            openModal(ref,id,title) {
                let self=this;
                this.loaded=false;
                this.favourited=false;
                this.isOnList=false;
                this.collection_toggled=false;
                this.list_toggled=false;
                this.collection_is_new=false;
                this.collection_name='';
                this.selected_collection='';

                axios.get("https://api.jikan.moe/v3/anime/"+id)
                .then(response => {
                  console.log(response.data);

                  let genres=[];
                  let anime=response.data;
                  for(let i=0; i<anime.genres.length; i++){
                    genres.push({
                        id: anime.genres[i].mal_id,
                        name: anime.genres[i].name
                    });
                  }
                  self.info={
                    id: id,
                    title: title,
                    story: anime.synopsis,
                    episodes: anime.episodes,
                    type: anime.type,
                    image: anime.image_url.slice(0,-4)+'l.jpg',
                    status: anime.status,
                    aired: anime.aired.string,
                    rating: anime.rating,
                    premiered: anime.premiered,
                    duration: anime.duration,
                    source: anime.source,
                    broadcast: anime.broadcast,
                    studios: anime.studios,
                    genres: genres,
                    score: anime.score,
                    scored_by: anime.scored_by,
                    members: anime.members,
                    favourites: anime.favorites,
                    rank: anime.rank
                  };
                  self.loaded=true;

                  if(localStorage.animeList){
                        let anime_list = JSON.parse(localStorage.animeList);

                        for (let i = 0; i < anime_list.length; i++) {
                            if(anime_list[i].id==id){
                                self.status=anime_list[i].status;
                                self.score=JSON.stringify(anime_list[i].score);
                                self.progress=parseInt(anime_list[i].progress) || 0;
                                self.isOnList=true;
                            }
                        }
                    }

                    if(localStorage.favourites){
                        let favourites = JSON.parse(localStorage.favourites).anime;

                        for(let i=0; i<favourites.length; i++){
                            if(favourites[i].id === self.info.id) self.favourited=true;
                        }
                    }
                }).catch(error => {
                    console.log(error);
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: '<h6>Failed to load info. Please try again!</h6>'
                    });
                    this.$refs[ref].close();
                });
                if(!this.isOnList){
                    this.status='Plan to watch';
                    this.score='0';
                    this.progress=0;
                }

                if(localStorage.collections){
                    let collections=JSON.parse(localStorage.collections);
                    self.collections=collections.filter(collection => collection.type == 'anime').map(collection => collection.name);
                    // console.log(collections.map(collection => collection.name))
                }

                this.$refs[ref].open();
            },
            restoreScroll(){
                document.getElementsByTagName('body')[0].style.overflowY = 'auto';
            }
        }
    }
</script>

<style scoped>
    img{
        height: 150px;
        width: 100px;
    }    
</style>

<style>
    @media(max-width: 991px){
        .ui-modal__container{
            max-height: 80vh !important;
        }
        .ui-modal__body{
            max-height: 80vh !important;
        }
    }

    .ui-modal__body{
        background-color: rgba(0,0,0,0.9);
        color:white;
        padding-left:0 !important;
        padding-right:0 !important;
    }

    .anime-cover-container{
        height:35vh;
        background-size: cover;
        background-position: top;
        background-repeat: no-repeat;
    }

    .cover-layer{
        background-color: rgba(0,0,0,0.5);
        width: 100%;
        height: 100%;
    }
</style>