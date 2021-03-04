<template>
    <div>
        <div
        :key="item.id"
        v-for="(item,i) in items"
        class="d-inline-block ml-2 my-1 item-container rounded text-left position-relative">
            <div>
                <router-link
                :to="!editingCollection
                ? '/'+$route.params.type+'/'+item.id+'/'+(item.title.split(' ').join('-')).replace('/','-')
                : ''">
                    <img
                    :alt="item.title"
                    v-lazy="item.image"
                    class="rounded item-cover">
                </router-link>
                
                <button
                v-if="!editingCollection"
                @click="$emit('open-modal',$route.params.type+'InfoModal',item.id,item.title)"
                class="position-absolute top-0 right-0 bg-transparent border-0 item-info py-1">
                    <i
                    style="text-shadow: 0px 0px 5px black"
                    class="fas fa-info-circle text-light rounded fa-lg">
                    </i>
                </button>

                <button
                v-else
                @click="items.splice(i,1)"
                class="position-absolute top-0 right-0 bg-transparent border-0 item-info py-1">
                    <i class="fas fa-times text-danger rounded fa-lg"></i>
                </button>

                <span
                style="background-color: rgba(0,0,0,0.65);"
                class="position-absolute top-2 left-2 rounded px-1 anime-stat font-weight-normal text-light"
                :class="$root.screen < 991 ? 'font-11' : 'font-13'">
                    <span class="mr-1">
                        <i class="fas fa-star fa-sm text-warning mr-1"></i>
                        {{item.score || '0'}}
                    </span>

                    <span>
                        <i
                        class="fas fa-sm text-light"
                        :class="$route.params.type == 'anime' ? 'fa-eye' : 'fa-book'"></i>
                        {{item.progress ? item.progress : '0'}}
                    </span>

                    <span>
                        <i
                        class="fas fa-circle fa-sm"
                        :class="{'text-success': item.status === 1 || item.status === 'Watching' || item.status === 'Reading',
                        'text-primary': item.status === 2 || item.status === 'Completed',
                        'text-warning': item.status === 3 || item.status === 'On-hold',
                        'text-danger': item.status === 4 || item.status === 'Dropped',
                        'text-secondary': item.status === 6 || item.status === 'Plan to watch' || item.status === 'Plan to read'}">
                        </i>
                    </span>
                </span>
            </div>

            <div
            class="w-100 bg-dark text-light position-relative left-0 text-left"
            :class="$root.screen > 991 ? 'top-80' : 'top-70'"
            style="white-space: nowrap;">
                <router-link :to="!editingCollection
                ? '/'+$route.params.type+'/'+item.id+'/'+(item.title.split(' ').join('-')).replace('/','-')
                : ''">
                    <span
                    v-if="$root.screen < 991"
                    class="font-12 font-weight-bold text-light">
                        {{item.title.length > 15 ? item.title.substring(0,12)+'...' : item.title}}
                    </span>

                    <span
                    v-else
                    class="font-12 font-weight-bold text-light">
                        {{item.title.length > 21 ? item.title.substring(0,18)+'...' : item.title}}
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'itemCards',
        props: {
            items: Array,
            editingCollection: Boolean
        },
        methods: {
            // addToList(){
            //     let manga_list=JSON.parse(localStorage.mangaList);

            //     let date=new Date();

            //     let current_time=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDay()-1)+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

            //     for(let i=0; i<this.items.length; i++){
            //         manga_list.push({
            //             id: parseInt(this.items[i].id),
            //             image: this.items[i].image,
            //             title: this.items[i].title,
            //             status: 'Reading',
            //             score: parseInt(this.items[i].score),
            //             progress: parseInt(this.items[i].progress),
            //             date: current_time
            //         });
            //     }
            //         localStorage.setItem('mangaList', JSON.stringify(manga_list));
            //     this.$notify({
            //         group: 'foo',
            //         type: 'success',
            //         title: '<h6>Added <u>'+this.info.title+'</u> to list!</h6>',
            //         text: '<p class="font-14 mb-0"><b>Status:</b> '+this.status+'  <b>Score:</b> '+this.score+'  <b>Progress:</b> '+this.progress+'/'+(this.info.chapters || '?')+'</p>'
            //     });
            // }
        }
    }
</script>

<style scoped>
    @media(max-width: 991px){
        .item-container div:first-child .item-cover{
            width:110px;
            height:155px;
        }
    }

    @media(min-width: 991px){
        .item-container div:first-child .item-cover{
            width:150px;
            height:220px;
        }
    }

    .item-container div:first-child .item-cover{
        vertical-align: top;
        object-fit: cover;
    }

    .item-info{
        border-radius: 50%;
    }
</style>