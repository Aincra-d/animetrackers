<template>
    <div>
        <div v-if="$route.params.type!='characters' && $route.params.type!='people'">
            <span class="font-weight-normal text-light d-inline-block mr-2" :class="$root.screen<576 ? 'font-12' : 'font-15'">
                <i class="fas fa-star text-warning" :class="$root.screen<576 ? 'fa-sm' : 'fa-md'"></i>
                {{item.score || '-'}}
            </span>

            <span class="font-weight-normal text-light d-inline-block mr-2" :class="$root.screen<576 ? 'font-12' : 'font-15'">
                <i class="fas fa-users text-light" :class="$root.screen<576 ? 'fa-sm' : 'fa-md'"></i>
                {{item.members || '-'}}
            </span>

            <!-- <span v-if="$route.params.type=='anime'" class="font-weight-normal text-light d-inline-block mr-2" :class="$root.screen<576 ? 'font-12' : 'font-15'">
                <i class="fas fa-tv text-light" :class="$root.screen<576 ? 'fa-sm' : 'fa-md'"></i>
               {{item.episodes ? item.episodes : '-'}}
            </span> -->

            <!-- <span v-else class="font-weight-normal text-light d-inline-block mr-2" :class="$root.screen<576 ? 'font-12' : 'font-15'">
                <i class="fas fa-book text-light" :class="$root.screen<576 ? 'fa-sm' : 'fa-md'"></i>
                {{item.volumes ? item.volumes : '-'}}
            </span> -->
            
            <span class="font-weight-normal text-light d-inline-block mr-2" :class="$root.screen<576 ? 'font-12' : 'font-15'">
                <i class="fas fa-calendar text-light" :class="$root.screen<576 ? 'fa-sm' : 'fa-md'"></i>
                {{item.aired_from || '-'}}
            </span>

            <i
            v-if="item.r18"
            :class="{'fa-xs': $root.screen < 576,
            'fa-sm': $root.screen > 576,
            'ml-1': item.status}"
            class="fas fa-exclamation-triangle text-danger">
            </i>

            <i
            v-if="item.kids"
            class="fas fa-circle fa-xs text-success d-inline">
            </i>

            <span>
                <i
                v-if="($route.params.type != 'characters' && $route.params.type != 'people')
                && item.status"
                class="fas fa-circle"
                :class="{'fa-xs': $root.screen < 576,
                'fa-sm': $root.screen > 576,
                'text-success': item.status === 'Watching' || item.status === 'Reading',
                'text-primary': item.status === 'Completed',
                'text-warning': item.status === 'On-hold',
                'text-danger': item.status === 'Dropped',
                'text-secondary': item.status === 'Plan to watch' || item.status === 'Plan to read'}">
                </i>
            </span>
        </div>

        <div v-else>
            <span class="font-weight-normal text-light d-inline-block mr-2" :class="$root.screen<576 ? 'font-12' : 'font-15'">
                <i class="fas fa-heart text-danger" :class="$root.screen<576 ? 'fa-sm' : 'fa-md'"></i>
                {{item.favourites || '-'}}
            </span>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'cover',
        props: {
            item: Object
        }
    }
</script>