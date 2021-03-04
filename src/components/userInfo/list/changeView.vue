<template>
    <div>
        <b-dropdown
        v-if="$route.params.collid"
        :dropright="$root.screen < 576"
        :dropleft="$root.screen > 576"
        class="m-0"
        :size="$root.screen < 576 ? 'md' : 'lg'"
        variant="link">
            <template v-slot:button-content>
                <i class="fas fa-edit"></i>
            </template>

            <b-dropdown-item @click="$emit('rename-collection')">
                <i
                style="width:20px"
                class="fas fa-pen text-primary mr-2">
                </i>
            
                <span>Rename collection</span>
            </b-dropdown-item>

            <b-dropdown-item @click="$emit('edit-collection')">
                <i
                style="width:20px"
                class="fas fa-times text-danger mr-2">
                </i>
                
                <span>Remove {{$route.params.type}}</span>
            </b-dropdown-item>

            <b-dropdown-item @click="$emit('add-more')">
                <i
                style="width:20px"
                class="fas fa-plus text-success mr-2">
                </i>
                
                <span>Add new {{$route.params.type}}</span>
            </b-dropdown-item>

            <b-dropdown-item @click="$emit('delete-collection')">
                <i
                style="width:20px"
                class="fas fa-trash text-danger mr-2">
                </i>
                
                <span>Delete collection</span>
            </b-dropdown-item>
        </b-dropdown>

        <b-dropdown
        v-if="$route.name == 'local_list'
        || $route.name == 'list'
        || ($route.name == 'collections' && $route.params.collid)"
        :dropright="$root.screen < 576"
        :dropleft="$root.screen > 576"
        class="m-0"
        :size="$root.screen < 576 ? 'md' : 'lg'"
        variant="link">
            <template v-slot:button-content>
                <i class="fas fa-sort"></i>
            </template>

            <b-dropdown-item
            :key="index"
            v-for="(sort,index) in sorts"
            @click="$emit('sort-by-'+sort.type, sort.sort)">
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
                <i class="fas fa-th"></i>
            </template>

            <b-dropdown-item
            :key="view_.name"
            v-for="view_ in views"
            @click="$emit('change-view', view_.name)">
                <i
                class="fas mr-2"
                :class="view_.icon+' '+(view_.name == view ? 'text-primary' : '')">
                </i>

                <span>{{view_.title}}</span>
            </b-dropdown-item>
        </b-dropdown>
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
                    name: 'card',
                    icon:'fa-th',
                    title: 'Card view'
                },
                {
                    name: 'table-lg',
                    icon:'fa-th-list',
                    title: 'List view (large images)'
                },
                {
                    name: 'table-sm',
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
        }
    }
</script>