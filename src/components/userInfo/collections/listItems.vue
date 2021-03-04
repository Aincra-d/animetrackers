<template>
    <div>
        <div class="w-100 text-center text-light">
            <div
            :key="listItems[i-1].id"
            v-for="i in limit"
            class="d-inline-block ml-2 my-1 item-container rounded text-left position-relative">
                <label style="cursor: pointer;">
                    <div>
                        <img
                        :alt="listItems[i-1].title"
                        v-lazy="listItems[i-1].image"
                        class="rounded item-cover">

                        <div
                        class="position-absolute top-0 right-0 bg-transparent border-0"
                        :class="$root.screen < 991 ? 'p-1' : 'p-2'">
                            <input
                            @click="listItems[i-1].checked=!listItems[i-1].checked"
                            :style="{
                                height: $root.screen < 991 ? '15px' : '20px',
                                width: $root.screen < 991 ? '15px' : '20px'
                            }"
                            class="pointer"
                            type="checkbox"
                            autocomplete="off">
                        </div>
                    </div>
                </label>

                <span
                style="background-color: rgba(0,0,0,0.65);"
                class="position-absolute top-2 left-2 rounded px-1 anime-stat font-weight-normal text-light"
                :class="$root.screen < 991 ? 'font-11' : 'font-13'">
                    <span class="mr-1">
                        <i class="fas fa-star fa-sm text-warning mr-1"></i>
                        {{listItems[i-1].score || '0'}}
                    </span>

                    <span>
                        <i
                        class="fas fa-sm text-light"
                        :class="$route.params.type=='anime' ? 'fa-eye' : 'fa-book'"></i>
                        {{listItems[i-1].progress ? listItems[i-1].progress : '0'}}
                    </span>

                    <span>
                        <i class="fas fa-circle" :class="{
                            'fa-xs': $root.screen < 991,
                            'fa-sm': $root.screen > 991,
                            'text-success': listItems[i-1].status === 'Watching'
                            || listItems[i-1].status === 'Reading',
                            'text-primary': listItems[i-1].status === 'Completed',
                            'text-warning': listItems[i-1].status === 'On-hold',
                            'text-danger': listItems[i-1].status === 'Dropped',
                            'text-secondary': listItems[i-1].status === 'Plan to watch'
                            || listItems[i-1].status === 'Plan to read'}
                            "></i>
                    </span>
                </span>

                <div
                class="w-100 bg-dark text-light position-relative left-0 text-left"
                :class="$root.screen>991 ? 'top-80' : 'top-70'"
                style="white-space: nowrap;">
                    <span
                    v-if="$root.screen<991"
                    class="font-12 font-weight-bold text-light">
                        {{listItems[i-1].title.length > 15 ? listItems[i-1].title.substring(0,12)+'...' : listItems[i-1].title}}
                    </span>

                    <span
                    v-else
                    class="font-12 font-weight-bold text-light">
                        {{listItems[i-1].title.length > 21 ? listItems[i-1].title.substring(0,18)+'...' : listItems[i-1].title}}
                    </span>
                </div>
            </div>

            <br>

            <button
            v-if="listItems.length > limit"
            @click="limit+50 < listItems.length ? limit+=50 : limit=listItems.length"
            type="button"
            class="btn btn-secondary">
                Show more
            </button>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'collectionListItems',
        props: {
            listItems: Array
        },
        data(){
            return {
                limit: this.listItems.length < 50 ? this.listItems.length : 50
            }
        }
    }
</script>

<style scoped>
    @media(max-width: 991px){
        .item-container .item-cover{
            width:110px;
            height:155px;
        }
    }

    @media(min-width: 991px){
        .item-container .item-cover{
            width:150px;
            height:220px;
        }
    }

    .item-container .item-cover{
        vertical-align: top;
        object-fit: cover;
    }
</style>