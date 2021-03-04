<template>
    <div>
         <div class="w-100 d-block">
            <search-items class="w-60 d-inline-block text-left align-bottom">
            </search-items>

            <change-view
            class="w-40 d-inline-block text-right align-bottom"
            :view="$root.searchView">
            </change-view>
        </div>
    </div>
</template>

<script>
    import searchItems from  '@/components/navigation/searchNavigation/searchItems.vue';
    import changeView  from  '@/components/navigation/searchNavigation/changeView.vue';

    export default {
        name: 'searchNavigation',
        components: {
            'search-items': searchItems,
            'change-view': changeView
        }
    }
</script>