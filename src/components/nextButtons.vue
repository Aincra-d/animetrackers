<template>
    <div>
        <div
        class="d-inline-block"
        v-if="data.allPages>data.currentPage">
            <router-link
            class="d-inline-block"
            v-if="data.pageDiff >= 1"
            :to="{
                name: $route.name,
                params: { page: parseInt($route.params.page)+1, type: $route.params.type },
                query: $route.query.page ? route(parseInt($route.query.page)+1) : ''
            }">
                <pageButton>
                    {{(data.pages.next)}}
                </pageButton>
            </router-link>

            <router-link
            class="d-inline-block"
            v-if="data.pageDiff >= 2"
            :to="{
                name: $route.name,
                params: { page: parseInt($route.params.page)+2, type: $route.params.type },
                query: $route.query.page ? route(parseInt($route.query.page)+2) : ''
            }">
                <pageButton>
                    {{(data.pages.next2)}}
                </pageButton>
            </router-link>

            <router-link
            class="d-inline-block"
            v-if="data.pageDiff >= 1"
            :to="{
                name: $route.name,
                params: { page: parseInt($route.params.page)+1, type: $route.params.type },
                query: $route.query.page ? route(parseInt($route.query.page)+1) : ''
            }">
                <pageButton>
                    <i class="fas fa-angle-right"></i>
                </pageButton>
            </router-link>

            <router-link
            class="d-inline-block"
            v-if="data.pageDiff >= 3"
            :to="{
                name: $route.name,
                params: { page: parseInt(data.allPages), type: $route.params.type },
                query: $route.query.page ? route(parseInt(data.allPages)) : ''
            }">
                <pageButton>
                    <i class="fas fa-angle-double-right"></i>
                </pageButton>
            </router-link>
        </div>
    </div>
</template>

<script>
    import pageButton from '@/components/pageButton.vue'
    export default{
       
        name: 'prevButtons',
            props: ["data"],
            components: {
            pageButton
        },
        methods: {
            route(page){
                let queries;
                if(this.$route.query.board){
                    queries={
                        board: this.$route.query.board,
                        page: page
                    }
                }
                
                if(!this.$route.query.board){
                    queries={
                        topic: this.$route.query.topic,
                        page: page
                    }
                }

                if(this.$route.query.type){
                    if(this.$route.query.subtype){
                        queries={
                            type: this.$route.query.type,
                            id: this.$route.query.id,
                            subtype: this.$route.query.subtype,
                            page: page
                        }
                    }
                    else{
                        queries={
                            type: this.$route.query.type,
                            id: this.$route.query.id,
                            page: page
                        }
                    }
                    
                }
                return queries;
            }
        }
    }
</script>