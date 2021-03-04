<template>
    <div>
        <ui-modal @close="restoreScroll" alignTop :alignTopMargin="0" :max-height="100" :title="loaded ? info.title : ''" ref="mangaInfoModal" class="text-dark text-center manga-info-modal">
            <div v-if="loaded">
                <div :style="{backgroundImage: 'url('+ info.image + ')'}" class="w-100 manga-cover-container position-relative">
                    <div class="cover-layer"></div>

                    <img :src="info.image" class="position-absolute bottom-0 left-5 ml-3">

                    <h6 class="text-primary mr-1 position-absolute top-0 right-0 m-0 p-0">

                        <a
                        target="_blank"
                        :href="'https://myanimelist.net/manga/'+info.id">
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
                            :to="'/manga/'+info.id+'/'+info.title.split(' ').join('-').replace('/','-')+'/'+page.name.toLowerCase()+(page.hasPage ? '/1' : '')">
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

            <div v-if="!loaded" class="w-100 text-center text-light font-weight-bold">
                <i class="fas fa-spinner fa-3x fa-spin"></i>
            </div>
        </ui-modal>
    </div>
</template>

<script>
    import mangaInfoModalTable      from '@/components/titleInfo/mangaInfoModalTable.vue';
    import mangaInfoModalStats      from '@/components/titleInfo/mangaInfoModalStats.vue';
    import addMangaToList           from '@/components/titleInfoModal/addToList.vue';
    import addMangaToCollection     from '@/components/titleInfoModal/addToCollection.vue';
    import axios                    from 'axios';
    export default{
        name: 'mangaInfoModal',
        data(){
            return {
                loaded: false,
                info: {},
                isOnList: false,
                status: 'Plan to read',
                score: '0',
                progress: 0,
                favourited: false,
                list_toggled: false,
                collection_toggled: false,
                collection_name: '',
                collection_is_new: false,
                selected_collection: '',
                collections: [],
                type: 'manga',
                pages: [
                    { name: 'Characters', icon: 'fa-address-book', hasPage: false },
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
            'modal-info': mangaInfoModalTable,
            'modal-stats': mangaInfoModalStats,
            'add-to-list': addMangaToList,
            'add-to-collection': addMangaToCollection
        },
        methods: {
            removeFromList(){
                let mangaList = JSON.parse(localStorage.mangaList);
                for (let i = 0; i < mangaList.length; i++) {
                    if(parseInt(this.info.id) === mangaList[i].id){
                        mangaList.splice(i, 1);
                        break;
                    }
                }
                localStorage.setItem("mangaList", JSON.stringify(mangaList));
                this.isOnList=false;
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '<h6>Removed <u>'+this.info.title+'</u> from list!</h6>'
                });
            },
            changeStatus(){
                if(this.status=='Completed') this.progress=this.info.chapters;
            },
            updateList(){
                let manga_list=JSON.parse(localStorage.mangaList);
                let date=new Date();

                let current_time=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
                console.log(current_time)

                for(let i=0; i<manga_list.length; i++){
                    if(manga_list[i].id === parseInt(this.info.id)){
                        manga_list[i].status=this.status;
                        manga_list[i].score=parseInt(this.score);
                        manga_list[i].progress=parseInt(this.progress);
                        manga_list[i].date=current_time;
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: '<h6>Updated <u>'+this.info.title+'</u>!</h6>',
                            text: '<p class="font-14 mb-0"><b>Status:</b> '+this.status+'  <b>Score:</b> '+this.score+'  <b>Progress:</b> '+this.progress+'/'+((this.info.episodes || this.info.chapters) || '?')+'</p>'
                        });
                    }
                }
                localStorage.setItem('mangaList', JSON.stringify(manga_list));
            },
            updateFavourite(removing){
                if(localStorage.favourites){
                    let favourites=JSON.parse(localStorage.favourites);

                    if(removing){
                        for(let i=0; i<favourites.manga.length; i++){
                            if(favourites.manga[i].id === this.info.id) favourites.manga.splice(i,1);
                        }

                        this.favourited=false;
                    }
                    else{
                        favourites.manga.push({
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
                        anime: [],
                        manga: [{
                            id: this.info.id,
                            name: this.info.title,
                            image: this.info.image
                        }],
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

                let new_manga={
                    id: parseInt(this.info.id),
                    image: this.info.image,
                    title: this.info.title,
                    status: this.status,
                    score: parseInt(this.score),
                    progress: parseInt(this.progress),
                    genres: this.info.genres.map(genre => genre.name).toString(),
                    date: current_time
                }
                if(localStorage.mangaList){
                    let manga_list=JSON.parse(localStorage.mangaList);
                    manga_list.push(new_manga);
                    localStorage.setItem('mangaList', JSON.stringify(manga_list));
                }
                else{
                    let manga_list=[new_manga];
                    localStorage.setItem('mangaList', JSON.stringify(manga_list));
                }
                this.isOnList=true;
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '<h6>Added <u>'+this.info.title+'</u> to list!</h6>',
                    text: '<p class="font-14 mb-0"><b>Status:</b> '+this.status+'  <b>Score:</b> '+this.score+'  <b>Progress:</b> '+this.progress+'/'+(this.info.chapters || '?')+'</p>'
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
                let isOnCollection=false;
                let reachedSizeLimit=false;

                if(localStorage.collections){
                    let collections=JSON.parse(localStorage.collections);

                    if(new_collection){
                        collections.push({
                            id: parseInt(collections.length)+1,
                            name: this.collection_name,
                            type: 'manga',
                            items: [new_item]
                        });
                        console.log(collections);
                        localStorage.setItem('collections',JSON.stringify(collections));
                    }
                    else{
                        let selected_collection=collections.filter(collection => collection.type == 'manga' && collection.name == this.selected_collection);

                        let collection_items = selected_collection[0].items;
                        let collection_size=selected_collection[0].items.length;
                        reachedSizeLimit=collection_size === 100;

                        for (let i = 0; i < collection_items.length; i++) {
                            if(parseInt(this.info.id) === collection_items[i].id){
                                isOnCollection=true;
                                break;
                            }
                        }

                        if(!isOnCollection && collection_size < 100){
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
                            type: 'manga',
                            items: [new_item]
                        }
                    ];
                    console.log(collections);
                    localStorage.setItem('collections',JSON.stringify(collections));
                }

                let title;

                if(reachedSizeLimit){
                    title = 'Collection "'+this.selected_collection+'" has reached its size limit(100)!'
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
                let collection_items = collections.filter(collection => collection.type == 'manga' && collection.name == this.selected_collection)[0].items;
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
                
                axios.get("https://api.jikan.moe/v3/manga/"+id)
                .then(response => {
                    console.log(response.data);

                    let genres=[];
                    let manga=response.data;
                    for(let i=0; i<manga.genres.length; i++){
                        genres.push({
                            id: manga.genres[i].mal_id,
                            name: manga.genres[i].name
                        });
                    }
                    self.info={
                        id: id,
                        title: title,
                        story: manga.synopsis,
                        image: manga.image_url.slice(0,-4)+'l.jpg',
                        status: manga.status,
                        type: manga.type,
                        volumes: manga.volumes,
                        chapters: manga.chapters,
                        published: manga.published.string,
                        rating: manga.rating,
                        authors: manga.authors,
                        genres: genres,
                        score: manga.score,
                        scored_by: manga.scored_by,
                        members: manga.members,
                        favourites: manga.favorites,
                        rank: manga.rank
                    };
                    self.loaded=true;

                    if(localStorage.mangaList){
                        let mangaList = JSON.parse(localStorage.mangaList);

                        for (let i = 0; i < mangaList.length; i++) {
                            if(mangaList[i].id==id){
                                self.status=mangaList[i].status;
                                self.score=JSON.stringify(mangaList[i].score);
                                self.progress=parseInt(mangaList[i].progress) || 0;
                                self.isOnList=true;
                            }
                        }
                    }
                    if(localStorage.favourites){
                        let favourites = JSON.parse(localStorage.favourites).manga;

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
                    this.status='Plan to read';
                    this.score='0';
                    this.progress=0;
                }

                if(localStorage.collections){
                    let collections=JSON.parse(localStorage.collections);
                    self.collections=collections.filter(collection => collection.type == 'manga').map(collection => collection.name);
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
        padding-left:0 !important;
        padding-right:0 !important;
    }

    .manga-cover-container{
        height:280px;
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