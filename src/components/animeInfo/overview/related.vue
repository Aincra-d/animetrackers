<template>
    <div>
        <div class="w-100 text-left text-light">
            <ui-collapsible title="Related" class="text-dark bg-transparent border-0" open>
                <table class="table w-100 align-top text-light table-striped font-weight-bold text-left">
                    <tbody>
                        <adaptation v-if="related['Adaptation']" :related="related['Adaptation']"></adaptation>
                        <prequel v-if="related['Prequel']" :related="related['Prequel']"></prequel>
                        <sequel v-if="related['Sequel']" :related="related['Sequel']"></sequel>
                        <side-story v-if="related['Side story']" :related="related['Side story']"></side-story>
                        <anime-summary v-if="related['Summary']" :related="related['Summary']"></anime-summary>
                        <parent-story v-if="related['Parent']" :related="related['Parent']"></parent-story>
                        <spin-off v-if="related['Spin-off']" :related="related['Spin-off']"></spin-off>
                        <alternative-version v-if="related['Alternative version']" :related="related['Alternative version']"></alternative-version>
                        <character v-if="related['Character']" :related="related['Character']"></character>
                        <other v-if="related['Other']" :related="related['Other']"></other>
                    </tbody>
                </table>
            </ui-collapsible>
        </div>
    </div>
</template>

<script>
import animeRelatedAdaptation from '@/components/animeInfo/overview/related/adaptation.vue';
import animeRelatedPrequel from '@/components/animeInfo/overview/related/prequel.vue';
import animeRelatedSequel from '@/components/animeInfo/overview/related/sequel.vue';
import animeRelatedSideStory from '@/components/animeInfo/overview/related/sideStory.vue';
import animeRelatedSummary from '@/components/animeInfo/overview/related/summary.vue';
import animeRelatedParentStory from '@/components/animeInfo/overview/related/parentStory.vue';
import animeRelatedSpinoff from '@/components/animeInfo/overview/related/spinOff.vue';
import animeRelatedAlternative from '@/components/animeInfo/overview/related/alternative.vue';
import animeRelatedCharacter from '@/components/animeInfo/overview/related/character.vue';
import animeRelatedOther from '@/components/animeInfo/overview/related/other.vue';
export default {
  name: 'related',
  props: {
    related: Array
  },
  components: {
    'adaptation': animeRelatedAdaptation,
    'prequel': animeRelatedPrequel,
    'sequel': animeRelatedSequel,
    'side-story': animeRelatedSideStory,
    'anime-summary': animeRelatedSummary,
    'parent-story': animeRelatedParentStory,
    'spin-off': animeRelatedSpinoff,
    'alternative-version': animeRelatedAlternative,
    'character': animeRelatedCharacter,
    'other': animeRelatedOther
  }
}
</script>