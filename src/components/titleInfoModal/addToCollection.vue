<template>
	<div class="text-center">
        <div class="w-100 text-center">
            <ul class="list-unstyled">
                <li class="d-inline">
                    <ui-checkbox
                    @click="data.collection_is_new=!data.collection_is_new"
                    v-model="data.collection_is_new"
                    :checked.prop="data.collection_is_new"
                    class="mr-3 w-15 d-inline-flex mt-2">
                        New
                    </ui-checkbox>
                </li>

                <li class="d-inline">
                    <input
                    v-if="data.collection_is_new"
                    v-model="data.collection_name"
                    placeholder="Enter collection name"
                    class="w-xs-45 w-30 mx-2 py-2 bg-transparent text-light border-bottom-1 border-left-0 border-right-0 border-top-0 border-light outline-none"
                    type="text">

                    <ui-select
                    v-else
                    :has-search="data.collections.length >= 20"
                    class="mx-2 mt-0 w-xs-45 w-30 mb-1 border border-top-0 border-left-0 border-right-0 border-bottom text-left"
                    placeholder="Select collection"
                    :options="data.collections"
                    v-model="data.selected_collection"
                    ></ui-select>
                </li>
            </ul>
        </div>

        <div>
            <button
            @click="$emit('add-to-collection',data.collection_is_new ? true : false)"
            :disabled="(data.collection_is_new && data.collection_name=='')
            || (!data.collection_is_new && data.selected_collection=='')"
            type="button"
            class="btn btn-sm btn-outline-success d-inline-block rounded-0 mx-1 mb-2">
                Add to collection
            </button>

            <button
            :disabled="data.collection_is_new || data.selected_collection==''"
            @click="$emit('remove-from-collection')"
            type="button"
            class="btn btn-sm btn-outline-danger d-inline-block rounded-0 mx-1 mb-2">
                Remove from collection
            </button>
        </div>
    </div>
</template>

<script>
	export default{
		name: 'addToCollection',
		props: {
			data: Object
		}
	}
</script>