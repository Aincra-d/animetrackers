<template>
    <div class="d-block align-items-start text-center">
        <manga-info-modal ref="mangaInfoModal">
        </manga-info-modal>
        
        <anime-info-modal ref="animeInfoModal">
        </anime-info-modal>

        <div class="w-100 d-block">
            <ui-collapsible
            title="Latest list updates"
            class="text-dark bg-transparent"
            open>
                <history-list
                :history="history"
                @open-modal="openModal">
                </history-list>
            </ui-collapsible>
        </div>
    </div>
</template>

<script>
  import historyList    from '@/components/userInfo/history/historyList.vue'
  import mangaInfoModal from '@/components/mangaInfoModal.vue';
  import animeInfoModal from '@/components/animeInfoModal.vue';
    export default{
        name: 'history',
        props: {
            history: Array
        },
        components: {
            'history-list': historyList,
            'manga-info-modal': mangaInfoModal,
            'anime-info-modal': animeInfoModal
        },
        methods: {
            openModal(ref,id,title) {
                ref=="animeInfoModal"
                ? this.$refs.animeInfoModal.openModal(ref,id,title)
                : this.$refs.mangaInfoModal.openModal(ref,id,title)
            }
        }
    }
</script>

<style scoped>
  .anime-cover-container{
    height:280px;
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
  }
</style>

<style>
  @media(max-width: 991px){
    .ui-modal__container{
        max-height: 80vh !important;
      }
    .ui-modal__body{
        max-height: 80vh !important;
    }
  }
  .ui-modal__body{
    padding-left:0 !important;
    padding-right:0 !important;
  }
</style>