<template>
    <div>
        <div class="w-100 d-block text-right">
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
                ]
            }
        },
        methods: {
            changeView(name){
                sessionStorage.setItem('topView',name);
                this.$root.topView=name;
            }
        }
    }
</script>