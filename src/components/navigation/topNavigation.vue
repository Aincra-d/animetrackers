<template>
    <div>
         <div class="w-100 d-block">
            <top-select
            v-if="$route.name == 'toplist' &&
            ($route.params.type!='characters' && $route.params.type!='people')"
            class="w-60 d-inline-block text-left align-bottom">
            </top-select>

            <genre-select
            v-if="$route.name == 'genreTop'"
            class="w-60 d-inline-block text-left align-bottom">
            </genre-select>

            <studio-select
            v-if="$route.name == 'studioTop'"
            class="w-60 d-inline-block text-left align-bottom">
            </studio-select>

            <magazine-select
            v-if="$route.name == 'magazineTop'"
            class="w-60 d-inline-block text-left align-bottom">
            </magazine-select>

            <change-view
            class="d-inline-block text-right align-bottom"
            :class="$route.params.type!='characters'
            && $route.params.type!='people' ? 'w-40' : 'w-100'"
            @change-view="changeView"
            :view="$root.topView">
            </change-view>
        </div>
    </div>
</template>

<script>
    import selectGenre    from  '@/components/navigation/topNavigation/selectGenre.vue';
    import selectToplist  from  '@/components/navigation/topNavigation/selectToplist.vue';
    import selectStudio   from  '@/components/navigation/topNavigation/selectStudio.vue';
    import selectMagazine from  '@/components/navigation/topNavigation/selectMagazine.vue';
    import changeView     from  '@/components/navigation/topNavigation/changeView.vue';

    export default {
        name: 'topNavigation',
        components: {
            'genre-select': selectGenre,
            'top-select': selectToplist,
            'studio-select': selectStudio,
            'magazine-select': selectMagazine,
            'change-view': changeView
        },
        methods: {
            changeView(view,name){
                this.$emit('change-view',view,name);
          }
        }
    }
</script>