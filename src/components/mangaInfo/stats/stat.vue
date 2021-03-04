<template>
    <div>
        <vc-donut class="font-xs-12 font-sm-16" background="white" foreground="grey"
       :size="screen<576 ? 160 : 200" unit="px" :thickness="100"
       has-legend :legend-placement="screen<576 ? 'top' : 'top'"
       :sections="sections" :total="stats.total"
       :start-angle="0">
           <h6 class="text-dark">Total: stats.total</h6>
       </vc-donut>
        <br>

        <line-stat :labels="false" :stats="lineStats"></line-stat>
        <br>

        <h6 class="text-light">
            Total ratings: {{allRatings}}
        </h6>

        <bar-chart :data="charRatings.slice().reverse()"></bar-chart>
    </div>
</template>

<script>
import lineStat from '@/components/lineStat.vue';
export default {
    name: 'mangaStat',
    props: {
        stats: Object,
        charRatings: Array,
        sections: Array,
        lineStats: Array,
        allRatings: Number,
        screen: Number
    },
    components: {
        'line-stat': lineStat
    }
}
</script>