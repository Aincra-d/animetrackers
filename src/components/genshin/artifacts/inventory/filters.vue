<template>
    <div>
        <slide-y-up-transition :duration="250">
            <b-form-group
            v-if="filters.by_star"
            class="text-light stars-filter"
            label="Select artifact rarity to show">
                <b-form-checkbox-group
                v-model="stars"
                :options="[1,2,3,4,5]"
                buttons
                @input="!stack && $emit('filter-by-stars',stars)"
                button-variant="outline-light"
                size="md"
                name="buttons-2">
                </b-form-checkbox-group>
            </b-form-group>

            <b-form-group
            v-if="filters.by_type"
            class="text-light type-filter"
            label="Select artifact type to show">
                <b-form-checkbox-group
                v-model="types"
                :options="artifact_types"
                buttons
                @input="!stack && $emit('filter-by-types',types)"
                button-variant="outline-light"
                :size="$root.screen < 991 ? 'sm' :'md'"
                name="buttons-2">
                </b-form-checkbox-group>
            </b-form-group>

            <div v-if="filters.by_set">
                <ui-select
                @change="!stack && $emit('filter-by-set-names',sets)"
                multipleDelimiter=" | "
                class="mt-1 mb-2 select pt-1 px-1"
                placeholder="Select artifact set"
                :options="artifact_sets"
                multiple
                v-model="sets">
                </ui-select>

                <button
                @click="emptySets"
                type="button"
                class="btn btn-danger d-inline-block text-light btn-sm mb-2 ml-1 pt-1 pb-1 rounded">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <!-- <div
            v-if="filters.by_set"
            class="center con-selects w-100">
                <vs-select
                class="w-100 mx-auto mx-md-0"
                @input="$emit('filter-by-set-names',sets)"
                multiple
                filter
                collapse-chips
                placeholder="Select set(s)"
                state="light"
                v-model="sets">
                    <vs-option
                    :key="i"
                    v-for="(set,i) in artifact_sets"
                    :label="set"
                    :value="set">
                        {{set}}
                    </vs-option>
                </vs-select>
            </div> -->

            <div v-if="filters.by_main">
                <ui-select
                @input="!stack && $emit('filter-by-main-stats',main_stats)"
                multipleDelimiter=" | "
                class="mt-0 mb-0 select pt-1 pb-0 px-1"
                placeholder="Select main stats"
                :options="artifact_main_stats"
                multiple
                v-model="main_stats">
                </ui-select>

                <button
                @click="emptyMainStats"
                type="button"
                class="btn btn-danger d-inline-block text-light btn-sm mb-2 ml-1 pt-1 pb-1 rounded">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <!-- <div
            v-if="filters.by_main"
            class="center con-selects">
                <vs-select
                class="mx-auto mx-md-0"
                @input="$emit('filter-by-main-stats',main_stats)"
                multiple
                collapse-chips
                placeholder="Select main stat(s)"
                state="light"
                v-model="main_stats">
                    <vs-option
                    :key="i"
                    v-for="(main_stat,i) in artifact_main_stats"
                    :label="main_stat"
                    :value="main_stat">
                        {{main_stat}}
                    </vs-option>
                </vs-select>
            </div> -->

            <table
            class="mx-auto mx-md-0"
            v-if="filters.by_sub">
                <tr>
                    <td>
                        <ui-select
                        @change="!stack && $emit('filter-by-sub-stats')"
                        @input="!stack && $emit('set-sub-stats',sub_stats)"
                        multipleDelimiter=" | "
                        class="mt-1 mb-2 select pt-1 px-1"
                        placeholder="Select sub stats"
                        :options="artifact_sub_stats"
                        multiple
                        v-model="sub_stats">
                        </ui-select>

                        <button
                        @click="emptySubStats"
                        type="button"
                        class="btn btn-danger d-inline-block text-light btn-sm mb-2 ml-1 pt-1 pb-1 rounded">
                            <i class="fas fa-times"></i>
                        </button>

                        <!-- <vs-select
                        @change="$emit('filter-by-sub-stats')"
                        @input="$emit('set-sub-stats',sub_stats)"
                        multiple
                        collapse-chips
                        placeholder="Select sub stat(s)"
                        state="light"
                        v-model="sub_stats">
                            <vs-option
                            :key="i"
                            v-for="(sub_stat,i) in artifact_sub_stats"
                            :label="sub_stat"
                            :value="sub_stat">
                                {{sub_stat}}
                            </vs-option>
                        </vs-select> -->
                    </td>

                    <td>
                        <b-form-group
                        class="text-light p-0 m-0 sub-filter-type">
                            <b-form-checkbox-group
                            v-model="sub_filter_type"
                            :options="['Contain','Match']"
                            buttons
                            @input="!stack && $emit('set-sub-filter-type',sub_filter_type)"
                            button-variant="outline-light"
                            size="  "
                            name="buttons-2">
                            </b-form-checkbox-group>
                        </b-form-group>
                    </td>
                </tr>
            </table>
        </slide-y-up-transition>

        <h6
        v-if="stack"
        class="text-light">
            Filters:
        </h6>

        <div
        v-if="stack"
        class="font-italic text-light">
            <!-- <div v-if="stack && stars.length!=0">
                <span class="font-weight-bold">
                    Stars:
                </span>

                <ul class="list-unstyled d-inline">
                    <li
                    :key="i"
                    v-for="(star,i) in stars"
                    class="d-inline">
                        {{
                            star+((stars.length > 1 && i!=stars.length-1) ? ',' : '')
                        }}
                    </li>
                </ul>
            </div>

            <div v-if="stack && main_stats.length!=0">
                <span class="font-weight-bold">
                    Main stats:
                </span>

                <ul class="list-unstyled d-inline">
                    <li
                    :key="i"
                    v-for="(main_stat,i) in main_stats"
                    class="d-inline">
                        {{
                            main_stat+((main_stats.length > 1 && i!=main_stats.length-1) ? ',' : '')
                        }}
                    </li>
                </ul>
            </div>

            <div v-if="stack && sub_stats.length!=0">
                <span class="font-weight-bold">
                    Sub stats:
                </span>

                <ul class="list-unstyled d-inline">
                    <li
                    :key="i"
                    v-for="(sub_stat,i) in sub_stats"
                    class="d-inline">
                        {{
                            sub_stat+((sub_stats.length > 1 && i!=sub_stats.length-1) ? ',' : '')
                        }}
                    </li>
                </ul>

                <span>
                    ({{ sub_filter_type }})
                </span>
            </div>

            <div v-if="stack && types.length!=0">
                <span class="font-weight-bold">
                    Types:
                </span>

                <ul class="list-unstyled d-inline">
                    <li
                    :key="i"
                    v-for="(type,i) in types"
                    class="d-inline">
                        {{
                            type+((types.length > 1 && i!=types.length-1) ? ',' : '')
                        }}
                    </li>
                </ul>
            </div>

            <div v-if="stack && sets.length!=0">
                <span class="font-weight-bold">
                    Sets:
                </span>

                <ul class="list-unstyled d-inline">
                    <li
                    :key="i"
                    v-for="(set,i) in sets"
                    class="d-inline">
                        {{
                            set+((sets.length > 1 && i!=sets.length-1) ? ',' : '')
                        }}
                    </li>
                </ul>
            </div>
 -->
            <div
            :key="i"
            v-for="(active_filter,i) in [
                    {
                        title: 'Stars',
                        type: Object.keys(filters)[0],
                        filters: this.stars,
                        method: emptyStars
                    },
                    {
                        title: 'Main stats',
                        type: Object.keys(filters)[1],
                        filters: this.main_stats,
                        method: emptyMainStats
                    },
                    {
                        title: 'Sub stats',
                        type: Object.keys(filters)[2],
                        filters: this.sub_stats,
                        method: emptySubStats
                    },
                    {
                        title: 'Types',
                        type: Object.keys(filters)[3],
                        filters: this.types,
                        method: emptyTypes
                    },
                    {
                        title: 'Sets',
                        type: Object.keys(filters)[4],
                        filters: this.sets,
                        method: emptySets
                    }
                ]">
                <div v-if="stack && active_filter.filters.length!=0">
                    <span class="font-weight-bold">
                        {{ active_filter.title }}:
                    </span>

                    <ul class="list-unstyled d-inline">
                        <li
                        :key="i"
                        v-for="(filter,i) in active_filter.filters"
                        class="d-inline">
                            {{
                                filter+((active_filter.filters.length > 1 && i!=active_filter.filters.length-1) ? ',' : '')
                            }}
                        </li>

                        <button
                        style="font-size:10px"
                        class="btn py-0 px-1 mb-1 ml-1 mr-1 btn-primary d-inline"
                        @click="$emit('update-filters',active_filter.type)">
                            <i class="fas fa-pen"></i>
                        </button>

                        <button
                        style="font-size:12px"
                        class="btn py-0 px-1 mb-1 ml-2 btn-danger d-inline"
                        @click="active_filter.method">
                            <i class="fas fa-times"></i>
                        </button>
                    </ul>
                </div>
            </div>

            <button
            class="btn btn-primary btn-sm mt-2"
            @click="applyFilters">
                Apply filters
            </button>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'inventoryFilters',
        props: {
            filters: Object,
            stack: Boolean
        },
        data(){
            return {
                stars: [],
                main_stats: [],
                sub_stats: [],
                sub_filter_type: 'Contain',
                types: [],
                sets: [],
                artifact_types: ["Flower of Life","Plume of Death","Sands of Eon","Goblet of Eonothem","Circlet of Logos"],
                artifact_main_stats: Object.keys(require('../mainstats.json')[0].stats),
                artifact_sets: require('../sets.json').map(set => set.name),
                artifact_sub_stats: require('../substats.json').map(sub => sub.name)
            }
        },
        methods: {
            emptySets(){
                this.sets=[];
                this.$emit('filter-by-set-names',this.sets);
            },
            emptyStars(){
                this.stars=[];
                this.$emit('filter-by-stars',this.stars);
            },
            emptyTypes(){
                this.types=[];
                this.$emit('filter-by-types',this.types);
            },
            emptyMainStats(){
                this.main_stats=[];
                this.$emit('filter-by-main-stats',this.main_stats);
            },
            emptySubStats(){
                this.sub_stats=[];
                this.$emit('set-sub-stats',this.sub_stats);
                this.$emit('filter-by-sub-stats');
            },
            applyFilters(){
                let filters={
                    stars: this.stars,
                    main_stats: this.main_stats,
                    sub_stats: this.sub_stats,
                    types: this.types,
                    sets: this.sets
                };
                this.$emit('apply-filters',filters);
            },
            resetFilters(){
                if(!this.filters.by_main){
                    this.main_stats=[];
                }
                if(!this.filters.by_type){
                    this.types=[];
                }
                if(!this.filters.by_sub){
                    this.sub_stats=[];
                    this.sub_filter_type='Contain';
                }
                if(!this.filters.by_star){
                    this.stars=[];
                }
                if(!this.filters.by_set){
                    this.sets=[];
                }
            }
        },
        updated(){
            if(!this.stack) this.resetFilters();
        }
    }
</script>

<style>
    .select .ui-select__content *{
        max-width: 100vw !important;
    }

    .select{
        background-color: white;
        border-radius: 10px;
    }

    .sub-filter-type .btn{
        border-radius: 10px;
    }

    .select .ui-select__display-value, .select .ui-select__content *{
        color: black !important;
    }

    .stars-filter, .type-filter{
        text-shadow: 0px 0px 2px black;
    }

    .stars-filter label span:after{
        content: '⭐';
    }
</style>