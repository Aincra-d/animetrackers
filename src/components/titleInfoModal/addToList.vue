<template>
	<div class="text-center">
        <ui-select
        @change="$emit('change-status')"
        class="mx-2 mt-0 mb-1 border border-top-0 border-left-0 border-right-0 border-bottom"
        :class="{
            'border-success': data.status == 'Watching' || data.status == 'Reading',
            'border-primary': data.status == 'Completed',
            'border-warning': data.status == 'On-hold',
            'border-danger': data.status == 'Dropped',
            'border-secondary': data.status == 'Plan to watch' || data.status == 'Plan to read'
        }"
        placeholder="Select status"
        :options="[(data.type == 'anime' ? 'Watching' : 'Reading'),'Completed','On-hold','Dropped','Plan to '+(data.type == 'anime' ? 'watch' : 'read')]"
        v-model="data.status"
        ></ui-select>

        <ui-select
        class="mx-2 mt-0 mb-1"
        placeholder="Select score"
        :options="['0','1','2','3','4','5','6','7','8','9','10'].reverse()"
        v-model="data.score"
        ></ui-select>

        <input
        min="0"
        :max="data.info.episodes || data.info.chapters"
        v-model="data.progress"
        class="w-15 mx-2 bg-transparent text-light border-bottom-1 border-left-0 border-right-0 border-top-1 border-light"
        type="number">

        <!-- <button type="button" class="btn btn-link btn-sm p-1 text-light font-weight-bold mx-1">
            <i class="fas fa-minus"></i>
        </button> -->

        <button
        @click="addProgress"
        type="button"
        class="btn btn-link btn-sm p-1 text-light font-weight-bold mx-1">
            <i class="fas fa-plus"></i>
        </button>

        <br>

        <div v-if="!data.isOnList">
            <button
            @click="$emit('add-to-list')"
            type="button"
            class="btn btn-sm btn-outline-success d-inline-block rounded-0 mx-1 mb-2">
                Add to list
            </button>
        </div>

        <div v-else>
            <button
            @click="$emit('remove-from-list')"
            type="button"
            class="btn btn-sm btn-outline-danger d-inline-block rounded-0 mx-1 mb-2">
                Remove
            </button>

            <button
            @click="$emit('update-list')"
            type="button"
            class="btn btn-sm btn-outline-info d-inline-block rounded-0 mx-1 mb-2">
                Update
            </button>

            <button
            @click="$emit('update-favourite',data.favourited)"
            type="button"
            :class="data.favourited ? 'btn-danger' : 'btn-outline-danger'"
            class="btn btn-sm d-inline-block rounded-0 mx-1 mb-2">
                <i class="fas fa-heart mr-1"></i>Favourite
            </button>
        </div>
    </div>
</template>

<script>
	export default{
		name: 'addToListToList',
		props: {
			data: Object
		},
        methods: {
            addProgress(){
                let length = this.data.info.episodes || this.data.info.chapters;

                if(length){
                    this.data.progress < length
                    ? this.data.progress+=1
                    : this.data.progress=length
                }
                else this.data.progress+=1;  
            }
        }
	}
</script>