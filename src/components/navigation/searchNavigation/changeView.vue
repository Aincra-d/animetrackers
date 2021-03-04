<template>
    <div>
        <div class="w-100 d-block text-right">
            <b-dropdown
            v-if="$route.name === 'search'"
            :dropright="$root.screen < 576"
            :dropleft="$root.screen > 576"
            class="m-0"
            :size="$root.screen < 576 ? 'md' : 'lg'"
            variant="link">
                <template v-slot:button-content>
                    <i class="fas fa-sort"></i>
                </template>

                <b-dropdown-item
                :key="i"
                v-for="(sort,i) in sorts"
                @click="sortResults(sort.type,sort.sort)
                /*(i === 0 || i === 1)
                ? sortByScore(sorts[i].sort)
                : (i === 2 || i === 3)
                ? sortByMembers(sorts[i].sort)
                : sortByTitle(sorts[i].sort)*/">
                    <i
                    class="fas mr-2"
                    :class="sort.icon">
                    </i>
                    
                    <span>{{sort.title}}</span>
                </b-dropdown-item>
            </b-dropdown>

            <b-dropdown
            :dropright="$root.screen < 576"
            :dropleft="$root.screen > 576"
            class="m-0"
            :size="$root.screen < 576 ? 'md' : 'lg'"
            variant="link">
                <template v-slot:button-content>
                    <i class="fas fa-th-list"></i>
                </template>

                <b-dropdown-item
                :key="view_.name"
                v-for="view_ in views"
                @click="changeView(view_.name)">
                    <i
                    class="fas mr-2"
                    :class="view_.icon+' '+(view_.name == view ? 'text-primary' : '')">
                    </i>

                    <span>{{view_.title}}</span>
                </b-dropdown-item>
            </b-dropdown>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'changeView',
        props: {
            view: String
        },
        data(){
            return {
                views: [
                {
                    name: 'list-lg',
                    icon:'fa-th-list',
                    title: 'List view (large images)'
                },
                {
                    name: 'list-sm',
                    icon:'fa-list-ul',
                    title: 'List view (small images)'
                },
                {
                    name: 'list',
                    icon:'fa-align-justify',
                    title: 'List view (no images)'
                }
                ],
                sorts: [
                {
                    type: 'score',
                    sort: 'desc',
                    icon:'fa-star text-warning',
                    title: 'Sort by score (desc 10-1)'
                },
                {
                    type: 'score',
                    sort: 'asc',
                    icon:'fa-star text-warning',
                    title: 'Sort by score (asc 1-10)'
                },
                {
                    type: 'members',
                    sort: 'desc',
                    icon:'fa-users text-primary',
                    title: 'Sort by members (desc x-0)'
                },
                {
                    type: 'members',
                    sort: 'asc',
                    icon:'fa-users text-primary',
                    title: 'Sort by members (asc 0-x)'
                },
                {
                    type: 'title',
                    sort: 'desc',
                    icon:'fa-font',
                    title: 'Sort by title (desc a-z)'
                },
                {
                    type: 'title',
                    sort: 'asc',
                    icon:'fa-font',
                    title: 'Sort by title (asc z-a)'
                }
                ]
            }
        },
        methods: {
            changeView(name){
                sessionStorage.setItem('searchView',name);
                this.$root.searchView=name;
            },
            sortResults(type,sort){
                switch(type){
                    case 'score': this.sortByScore(sort); break;
                    case 'members': this.sortByMembers(sort); break;
                    case 'title': this.sortByTitle(sort); break;
                }
            },
            sortByScore(sort){
                this.$root.search_results.sort((a, b) => sort == 'desc'
                    ? (parseFloat(b.score || 0) - parseFloat(a.score || 0))
                    : parseFloat(a.score || 0) - parseFloat(b.score || 0));
                // let r18=[];

                // for(let i=0; i<this.$root.search_results.length; i++){
                //     if(this.$root.search_results[i].r18 === true){
                //         r18.push(this.$root.search_results[i]);
                //     }
                // }
                // for(let i=0; i<r18.length; i++){
                //     this.$set(this.$root.search_results,i,r18[i]);
                // }
                // this.$root.search_results=r18;
                // console.log(this.$root.search_results)
            },
            sortByMembers(sort){
                this.$root.search_results.sort((a, b) => sort == 'desc'
                    ? (parseInt(b.members || 0) - parseInt(a.members || 0))
                    : parseInt(a.members || 0) - parseInt(b.members || 0));
            },
            sortByTitle(sort){
                this.$root.search_results.sort((a, b) => sort == 'desc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title));
            }
        }
    }
</script>