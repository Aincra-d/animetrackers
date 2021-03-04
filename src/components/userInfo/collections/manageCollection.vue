<template>
	<div>
		<div>
            <div v-if="!toggled.rename && !toggled.edit_collection && !toggled.delete_collection">
                <h6
                v-if="$root.screen<576"
                class="font-weight-bold text-light d-inline-block">
                    {{collection_name.length > 20 ? collection_name.split('-').join(' ').substring(0,17)+'...' : collection_name.split('-').join(' ')}}
                </h6>

                <h5
                v-else
                class="font-weight-bold text-light d-inline-block">
                    {{collection_name.split('-').join(' ')}}
                </h5>
            </div>

            <div
            v-if="toggled.edit_collection"
            class="mb-2">
                <button
                @click="toggled.edit_collection=false"
                class="btn btn-sm py-0 btn-danger d-inline ml-2">
                    Cancel
                </button>

                <button
                @click="$emit('edit-collection')"
                class="btn btn-sm py-0 btn-primary d-inline ml-2">
                    Save
                </button>
            </div>

            <div
            v-if="toggled.delete_collection"
            class="mb-2">
                <button
                @click="$emit('delete-collection')"
                class="btn btn-sm py-0 btn-outline-danger d-inline ml-2">
                    Delete
                </button>

                <button
                @click="toggled.delete_collection=false"
                class="btn btn-sm py-0 btn-danger d-inline ml-2">
                    Cancel
                </button>
            </div>

            <div
            v-if="toggled.rename && !toggled.edit_collection"
            class="mb-2">
                <input
                v-model.trim="new_collection_name"
                @keyup.enter="$emit('rename-collection',new_collection_name)"
                class="w-60 rounded d-inline"
                style="height:25px"
                placeholder="Enter name"
                type="text">

                <button
                @click="$emit('rename-collection',new_collection_name)"
                class="btn btn-sm py-0 btn-primary d-inline ml-2">
                    Save
                </button>
            </div>
        </div>
	</div>
</template>

<script>
	export default{
		name: 'manageCollection',
		props: {
			toggled: Object,
			collection_name: String,
			new_collection_name: String
		}
	}
</script>