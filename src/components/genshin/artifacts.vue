<template>
    <div>
        <b-tabs
        class="text-light font-weight-bold"
        active-nav-item-class="btn-light border-0"
        v-if="$root.screen <= 776"
        align="center"
        content-class="mt-3">
            <b-tab title="Artifact roll" active>
                <div
                style="height:100%; overflow-y: auto;"
                :class="$root.screen < 776 ? 'position-relative d-block' : 'position-absolute top-0 left-0 d-inline-block'"
                class="roll-container p-3 text-center col-12">
                    <artifact-roll
                    @update-inventory="updateInventory">
                    </artifact-roll>
                </div>
            </b-tab>

            <b-tab title="Inventory">
                <div
                :class="$root.screen < 776 ? 'position-relative d-block' : 'position-absolute top-0 right-0 d-inline-block'"
                class="inventory-container p-0 text-center col-12">
                    <artifact-inventory
                    style="max-height:100vh; overflow-y: auto;"
                    :artifacts="artifacts">
                    </artifact-inventory>
                </div>
            </b-tab>
        </b-tabs>

        <div v-else>
            <div
            style="height:100vh; overflow-y: auto;"
            :class="$root.screen < 776 ? 'position-relative d-block' : 'position-absolute top-0 left-0 d-inline-block'"
            class="roll-container p-0 text-center col-12 col-sm-12 col-md-5 col-lg-4 col-xl-5">
                <artifact-roll
                @update-inventory="updateInventory">
                </artifact-roll>
            </div>

            <div
            :class="$root.screen < 776 ? 'position-relative d-block' : 'position-absolute top-0 right-0 d-inline-block'"
            class="inventory-container p-0 text-left col-12 col-sm-12 col-md-7 col-lg-8 col-xl-7">
                <artifact-inventory
                style="max-height:100vh; overflow-y: auto;"
                :artifacts="artifacts">
                </artifact-inventory>
            </div>
        </div>
    </div>
</template>

<script>
    import artifactRoll from '@/components/genshin/artifacts/roll.vue'
    import artifactInventory from '@/components/genshin/artifacts/inventory.vue'
    export default{
         name: 'artifacts',
         components: {
            'artifact-roll': artifactRoll,
            'artifact-inventory': artifactInventory
         },
         data(){
            return {
                artifacts: JSON.parse(localStorage.artifacts)
            }
         },
         methods: {
            updateInventory(){
                this.artifacts=JSON.parse(localStorage.artifacts)
            }
         }
    }
</script>

<style>
    body{
        /*background-image: url('https://images8.alphacoders.com/111/1114939.jpg');*/
        background-image: url('https://preview.redd.it/i1mvyqi2s7s51.png?width=1980&format=png&auto=webp&s=ba95e562209ee7d3ef89e5da83fd917b4cff5cf9');
        background-size: cover;
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-position: center;
    }
</style>