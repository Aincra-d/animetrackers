<template>
    <div>
        <div class="w-100 mt-2 mb-2 text-center">
            <h6 class="text-light">
                Page {{current_page}}    
            </h6>

            <router-link v-if="current_page>2" :to="route(1)">
                <button type="button" class="btn btn-outline-light btn-sm rounded-0 d-inline-block mx-1">First</button>
            </router-link>

            <router-link v-if="current_page>1" :to="route(parseInt($route.params.page)-1)">
                <button type="button" class="btn btn-outline-light btn-sm rounded-0 d-inline-block mx-1">Prev</button>
            </router-link>

            <b-button
            v-if="$route.params.page>3"
            variant="outline-light"
            class="ml-2 mx-lg-1 select-page rounded-0 py-1"
            id="selectPage"
            tabindex="0">
                {{$route.params.page}}
            </b-button>

            <b-popover
            v-if="$route.params.page>3"
            placement="bottom"
            custom-class="page-select"
            target="selectPage"
            variant="light"
            triggers="focus">
                <template v-slot:title>Jump to page</template>

                <router-link
                :key="page"
                v-for="page in parseInt(current_page)"
                class="w-100 d-block font-weight-bold font-20 text-center"
                :class="{'text-danger': page==$route.params.page}"
                :disabled="page==$route.params.page"
                :to="{ name: 'recommendations', params: {
                    type: $route.params.type,
                    page: page
                }}">
                    {{page}}
                </router-link>
                <br>
            </b-popover>

            <router-link v-if="array.length>=perPage" :to="route(parseInt($route.params.page)+1)">
                <button type="button" class="btn btn-outline-light btn-sm rounded-0 d-inline-block mx-1">Next</button>
            </router-link>
      </div>
    </div>
</template>

<script>
    export default{
        name: 'paginate',
        props: {
            array: Array,
            perPage: Number
        },
        methods: {
            route(page) {
                let url=this.$route.fullPath;
                let newurl = url.split('/').slice(0,-1).join('/')+'/'+page;
                return newurl;
            }
        },
        data(){
            return {
                current_page: this.$route.params.page || this.$route.query.page
            }
        }
    }
</script>

<style scoped>
    .page-select{
        max-height:200px;
        overflow-y:scroll;
        line-height:30px;
    }
</style>