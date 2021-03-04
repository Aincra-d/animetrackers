<template>
    <div class="d-block align-items-start text-center">
        <manga-info-modal
        v-if="$route.params.collid && $route.params.type=='manga'"
        ref="mangaInfoModal">
        </manga-info-modal>
        
        <anime-info-modal
        v-if="$route.params.collid && $route.params.type=='anime'"
        ref="animeInfoModal">
        </anime-info-modal>


        <collections
        v-if="!$route.params.collid"
        :collections="collections">
        </collections>
        

        <div
        v-if="!loaded"
        class="w-100 text-center text-light font-weight-bold">
            <i class="fas fa-spinner fa-2x fa-spin"></i>
        </div>

        <div v-else class="w-100 d-block">
            <manage-collection
            v-if="$route.params.collid"
            class="w-50 text-left text-light d-inline-block"
            :toggled="toggled"
            :collection_name="collection_name"
            :new_collection_name="new_collection_name"
            @rename-collection="renameCollection"
            @edit-collection="editCollection"
            @delete-collection="deleteCollection">
            </manage-collection>

            <change-view
            v-if="$route.params.collid"
            class="w-50 d-inline-block text-right align-bottom"
            :view="view"
            @change-view="changeView"
            @rename-collection="toggleRename"
            @edit-collection="toggled.edit_collection=!toggled.edit_collection"
            @delete-collection="toggled.delete_collection=!toggled.delete_collection"
            @add-more="toggleAddMore()"
            @sort-by-score="sortByScore"
            @sort-by-title="sortByTitle">
            </change-view>
        </div>

        <div class="w-100 d-block">
            <div v-if="$route.params.collid">
                <slide-y-down-transition :duration="200">
                    <card-view
                    v-if="view == 'card'"
                    @open-modal="openModal"
                    :editingCollection="toggled.edit_collection"
                    :items="collection_items">
                    </card-view>
                
                    <list-view
                    v-else
                    :view="view"
                    @open-modal="openModal"
                    :editingCollection="toggled.edit_collection"
                    :items="collection_items">
                    </list-view>
                </slide-y-down-transition>
            </div>

            <button
            v-if="$route.params.collid"
            @click="toggleAddMore()"
            class="btn btn-primary btn-md rounded text-light d-inline-block px-1 py-0 mt-3 mb-3">
                <i
                :class="toggled.add_more ? 'fa-minus' : 'fa-plus'"
                class="fas">
                </i>
                Add {{$route.params.type}} to collection
            </button>

            <button
            v-if="$route.params.collid && toggled.add_more"
            @click="addToCollection"
            class="btn btn-success btn-md rounded text-light d-inline-block px-1 py-0 mt-3 mb-3 ml-2">
                <i class="fas fa-check"></i>
                Save
            </button>

            <list-items
            v-if="$route.params.collid && toggled.add_more"
            :listItems="list_items">
            </list-items>
        </div>
    </div>
</template>

<script>
import mangaInfoModal       from   '@/components/mangaInfoModal.vue';
import animeInfoModal       from   '@/components/animeInfoModal.vue';
import cardView             from   '@/components/userInfo/list/itemCards.vue';
import listView             from   '@/components/userInfo/list/itemList.vue';
import changeView           from   '@/components/userInfo/list/changeView.vue';
import allCollections       from   '@/components/userInfo/collections/collections.vue';
import collectionListItems  from   '@/components/userInfo/collections/listItems.vue';
import manageCollection     from   '@/components/userInfo/collections/manageCollection.vue';
export default{
    name: 'allCollections',
    components: {
        'manga-info-modal': mangaInfoModal,
        'anime-info-modal': animeInfoModal,
        'card-view': cardView,
        'list-view': listView,
        'change-view': changeView,
        'collections': allCollections,
        'list-items': collectionListItems,
        'manage-collection': manageCollection
    },
    // head: {
    //     title() {
    //         return {
    //             inner: this.$route.params.username.split('-').join(' ')+' - Collections',
    //             separator: '-',
    //             complement: 'Anime'
    //         }
    //     },
    //     meta(){
    //         return  [
    //             {
    //                 name: 'description',
    //                 content: 'Check out all the anime/manga '+this.$route.params.username.split('-').join(' ')+' has watched, rated, dropped etc.',
    //                 id: this.$route.params.titleid
    //             }
    //         ]
    //     }
    // },
    data(){
        return{
            title: '',
            collection_name: JSON.parse(localStorage.collections).filter(collection => collection.id === parseInt(this.$route.params.collid))[0].name,
            new_collection_name: '',
            collection_items: [],
            list_items: [],
            collections: [],
            loaded: false,
            list_loaded: false,
            view: sessionStorage.listView || 'card',
            toggled: {
                add_more: false,
                rename: false,
                edit_collection: false,
                delete_collection: false
            },
        }
    },
    methods: {
        changeView(view){
            sessionStorage.setItem('listView',view);
            this.view=view;
        },
        openModal(ref,id,title) {
            ref=="animeInfoModal"
            ? this.$refs.animeInfoModal.openModal(ref,id,title)
            : this.$refs.mangaInfoModal.openModal(ref,id,title)
        },
        addToCollection(){
            let original_list_size = this.list_items.length;
            let title;
            let new_items_size; //CHECK THE SIZE OF ITEMS AFTER ADDING NEW ONES
            let added_new = false; //CHECK IF NEW ITEMS HAVE BEEN ADDED
            let checked_items = this.list_items.filter(item => item.checked);
            let collections = JSON.parse(localStorage.collections);
            let current_collection = collections.filter(collection => collection.id === parseInt(this.$route.params.collid))[0];
            let reached_size_limit = checked_items.length + current_collection.items.length > 100;

            if(!reached_size_limit){
                //ADD CHECKED ITEMS TO COLLECTION
                checked_items.forEach(item => this.collection_items.push(item));

                //FILTER/REMOVE PREVIOUSLY CHECKED LIST ITEMS
                this.list_items=this.list_items.filter(item => !item.checked);

                new_items_size = Math.abs(original_list_size - this.list_items.length);
                added_new = new_items_size > 0;

                current_collection.items=this.collection_items;

                localStorage.setItem('collections',JSON.stringify(collections));

                title = added_new
                ? 'Added <u>'+new_items_size+'</u> new '+this.$route.params.type+' to the collection!'
                : 'No '+this.$route.params.type+' has been selected!';
            }
            else{
                title = 'Cannot add all items, because collection reaches its size limit(100)!';
            }

            this.$notify({
                group: 'foo',
                type: (added_new && !reached_size_limit) ? 'success' : 'error',
                title: '<h6>'+title+'</h6>'
            });
        },
        toggleRename(){
            this.toggled.rename=!this.toggled.rename;
            this.toggled.edit_collection=false;
        },
        toggleAddMore(){
            this.toggled.add_more=!this.toggled.add_more;
            if(!this.list_loaded){
                this.list_loaded=true;
                this.getListItems();
            }
        },
        renameCollection(new_collection_name){
            this.toggled.edit_collection=false;
            let name_is_empty=new_collection_name === '' || new_collection_name.replace(' ','') === '';

            if(!name_is_empty){
                let collections=JSON.parse(localStorage.collections);

                collections.filter(collection => collection.id === parseInt(this.$route.params.collid))[0].name=new_collection_name.trim();

                localStorage.setItem('collections', JSON.stringify(collections));

                this.toggled.rename=false;
                this.collection_name=new_collection_name;
            }

            let title=!name_is_empty
            ? 'Renamed collection to "'+new_collection_name+'".'
            : 'Collection name cannot be empty!';

            if(!name_is_empty) new_collection_name='';

            this.$notify({
                group: 'foo',
                type: !name_is_empty ? 'success' : 'error',
                title: '<h6>'+title+'</h6>'
            });
        },
        editCollection(){
            this.toggled.rename=false;
            this.toggled.edit_collection=true;

            let collections=JSON.parse(localStorage.collections);

            collections.filter(collection => collection.id === parseInt(this.$route.params.collid))[0].items=this.collection_items;

            localStorage.setItem('collections',JSON.stringify(collections));

            this.toggled.edit_collection=false;

            this.$notify({
                group: 'foo',
                type: 'success',
                title: '<h6>Saved collection!</h6>'
            });
        },
        deleteCollection(){
            let collections=JSON.parse(localStorage.collections);

            collections.splice(collections.findIndex(collection => collection.id === parseInt(this.$route.params.collid)),1);

            localStorage.setItem('collections',JSON.stringify(collections));

            this.$notify({
                group: 'foo',
                type: 'success',
                title: '<h6>Deleted collection <u>'+this.collection_name+'</u>!</h6>'
            });

            let self=this;

            setTimeout(function() {
                self.$router.push({
                    path: '/local/collections'
                });
            }, 1500);
        },
        sortByScore(sort){
            this.collection_items.sort((a, b) => sort == 'desc' ? (parseFloat(b.score) - parseFloat(a.score))
                : parseFloat(a.score) - parseFloat(b.score));
        },
        sortByTitle(sort){
            this.collection_items.sort((a, b) => sort == 'desc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
        },
        getListItems(){
            if(this.$route.params.collid){
                let anime_list=JSON.parse(localStorage.animeList);
                let manga_list=JSON.parse(localStorage.mangaList);

                // let list_items=anime_list.concat(manga_list);
                let list_items=this.$route.params.type == 'anime'
                ? anime_list : manga_list

                //WORKS BUT COMPLICATED AND HARD TO UNDERSTAND
                // const o = this.collection_items.reduce((r, e) => (r[e.id] = true, r), {})
                // const result = list_items.map(e => ({ ...e, checked: o[e.id] || false}))
                // console.log(result.filter(item => item.checked));


                //WORKS AND EASILY UNDERSTANDABLE
                const collection_items_ids = new Set(this.collection_items.map(item => item.id));
                list_items.forEach(item => item.checked = collection_items_ids.has(item.id));


                //CORRECTED VERSION OF MY PREVIOUS CODE
                // list_items.forEach(list_item => {
                //     for (let i = 0; i < this.collection_items.length; i++) {
                //         if (this.collection_items[i].id === list_item.id) {
                //             list_item.checked = true;
                //             return;
                //         }
                //     }
                //     list_item.checked = false;
                // });

                console.log('list_items',list_items.filter(item => !item.checked));
                this.list_items=list_items.filter(item => !item.checked);
            }
        }
    },
    created(){
        if(this.$route.params.collid){
            this.collection_items=JSON.parse(localStorage.collections).filter(collection => collection.type == this.$route.params.type && collection.id == this.$route.params.collid)[0].items;
        }
        else this.collections=JSON.parse(localStorage.collections);

        this.loaded=true;
    }
}
</script>