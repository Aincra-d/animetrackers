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
            <span class="font-xs-12 font-15 font-weight-bold text-light">
                <span v-if="$root.screen<576">
                    {{
                        view=='list-sm'
                        ? item.title.length>53 ? item.title.substring(0,50)+'...' : item.title
                        : item.title.length>73 ? item.title.substring(0,70)+'...' : item.title
                    }}
                </span>

                <span v-else>
                    {{item.title}}
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
            let perPage;
            if(this.$route.params.genreid || this.$route.params.studioid) perPage=100;
            else perPage=50
            return{
                perPage: perPage
            }
        }
    }
</script>