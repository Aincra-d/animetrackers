<template>
	<div>
		<b-button
        variant="outline-primary"
        class="ml-2 mx-lg-1 select-page"
        id="selectPage"
        tabindex="0">
			<slot></slot>
		</b-button>

		<b-popover
        placement="bottom"
        custom-class="page-select"
        target="selectPage"
        variant="light"
        triggers="focus">
			<template v-slot:title>Jump to page</template>

			<router-link
            :key="page"
            v-for="page in data.allPages"
            class="w-100 d-block font-weight-bold font-20 text-center"
			:class="{'text-danger':page === data.currentPage}"
            :disabled="page === data.currentPage"
			:to="{
                name: $route.name,
                params: { page: page, type: $route.params.type },
                query: $route.query.page ? route(page) : ''
            }">
                {{page}}
            </router-link>
			<br>
		</b-popover>
	</div>
</template>

<script>
	export default{
		name: 'pageSelect',
		props: ["data"],
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

<style scoped>
	.page-select{
		max-height:200px;
		overflow-y:scroll;
		line-height:30px;
	}
</style>