<template>
    <div>
        <router-link :to="'/'
            +($route.params.type=='characters'
            ? 'character'
            : $route.params.type)
            +'/'
            +item.id
            +'/'
            +($route.params.type!='characters' && $route.params.type!='people'
            ? (item.title.split(' ').join('-')).replace('/','-')
            : item.title.split(',').join('').split(' ').join('-'))">
            <span v-if="view!='list'" class="font-xs-12 font-sm-13 font-15 font-weight-bold text-light">
                <span v-if="$root.screen<576">
                    {{
                        view=='list-sm'
                        ? item.title.length > 53 ? item.title.substring(0,50)+'...' : item.title
                        : item.title.length > 73 ? item.title.substring(0,70)+'...' : item.title
                    }}
                </span>

                <span v-else>
                    {{item.title}}
                </span>
            </span>

            <span v-else>
                <span class="font-weight-bold text-light font-xs-12 font-15">
                    {{index+($route.params.page*perPage-perPage)+1}}. {{item.title}}
                </span>
            </span>
        </router-link>
    </div>
</template>

<script>
    export default{
        name: 'cover',
        props: {
            item: Object,
            index: Number,
            view: String
        },
        data(){
            return{
                perPage: this.$route.params.genreid || this.$route.params.studioid ? 100 : 50
            }
        }
    }
</script>