<template>
    <div>
         <div class="w-100 d-block">
            <navigate-season
            :class="$root.screen<576 ? 'w-65' : 'w-50'"
            class="d-inline-block text-left align-bottom">
            </navigate-season>

            <change-view
            :class="$root.screen<576 ? 'w-35' : 'w-50'"
            class="d-inline-block text-right align-bottom"
            :view="$root.seasonView">
            </change-view>
        </div>
    </div>
</template>

<script>
    import navigate    from  '@/components/navigation/seasonNavigation/navigate.vue';
    import changeView  from  '@/components/navigation/seasonNavigation/changeView.vue';
    export default {
        name: 'seasonNavigation',
        components: {
            'navigate-season': navigate,
            'change-view': changeView
        }
    }
</script>