<template>
  <div
  id="app"
  :class="$route.name === 'genshin' ? 'w-lg-100 w-xl-100' : 'w-lg-80 w-xl-50'"
  class="w-xs-100 w-sm-100 w-md-100 mx-auto p-0 m-0">
    <notifications
    width="350"
    position="top center"
    group="foo">
    </notifications>

    <button
    style="z-index: 1000;"
    @click="scrollTop"
    type="button"
    class="btn btn-outline-primary position-fixed bottom-2 right-2">
      <i class="fas fa-arrow-up text-light fa-md"></i>
    </button>

    <vue-progress-bar></vue-progress-bar>


    <vue-navigation-bar
    v-if="$route.name!='genshin'"
    style="background-color: rgba(0,0,0,0.25);"
    :options="navbarOptions">
    </vue-navigation-bar>


    <top-navigation
    @change-view="changeView"
    v-if="$route.name.indexOf('top')!==-1
    || $route.name.indexOf('Top')!==-1">
    </top-navigation>


    <season-navigation
    @change-view="changeView"
    v-if="$route.name=='seasonalAnime'">
    </season-navigation>


    <search-navigation
    @change-view="changeView"
    v-if="$route.name=='search'">
    </search-navigation>


    <zoom-center-transition group :duration="500" tag="div">
      <router-view
      :key="(!$route.params.titleid && !$route.params.username && !$route.path.includes('local'))
      ? this.$route.fullPath : ''">
      </router-view>
    </zoom-center-transition>
  </div>
</template>

<script>
  import VueNavigationBar   from "vue-navigation-bar";
  import topNavigation      from '@/components/navigation/topNavigation.vue';
  import seasonNavigation   from '@/components/navigation/seasonNavigation.vue';
  import searchNavigation   from '@/components/navigation/searchNavigation.vue';
  export default{
    name: 'app',
    components: {
      'vue-navigation-bar': VueNavigationBar,
      'top-navigation': topNavigation,
      'season-navigation': seasonNavigation,
      'search-navigation': searchNavigation
    },
    data() {
      let current_month=new Date().getMonth()+1;
      let season= current_month==12 || current_month<=2
      ? 'winter'
      : current_month <=5 ? 'spring'
      : current_month<=8 ? 'summer' : 'fall';
        return {
          navbarOptions: {
            elementId: 'main-navbar',
            isUsingVueRouter: true,
            mobileBreakpoint: 992,
            brandImage: 'https://animemories.files.wordpress.com/2010/07/anime_logo_big2.jpg',
            brandImageAltText: 'Anime',
            showBrandImageInMobilePopup: true,
            ariaLabelMainNav: 'Main Navigation',
            tooltipAnimationType: 'shift-away',
            menuOptionsLeft: [
              {
                type: 'link',
                text: 'Anime',
                iconLeft: '<i class="fas fa-tv mr-1"></i>',
                subMenuOptions: [
                  {
                    type: 'link',
                    text: 'Search',
                    path: '/search/anime?search=',
                    iconLeft: '<i class="fas fa-search"></i>'
                  },
                  {
                    type: 'link',
                    text: 'Seasonal',
                    path: '/season/'+new Date().getFullYear()+'/'+season,
                    iconLeft: '<i class="fa fa-calendar"></i>',
                  },
                  {
                    type: 'link',
                    text: 'Toplist',
                    path: '/top/anime/1',
                    iconLeft: '<i class="fas fa-chart-bar"></i>'
                  },
                  {
                    type: 'link',
                    text: 'Genres',
                    path: '/top/anime/genre/1/Action/1',
                    iconLeft: '<i class="fas fa-list"></i>'
                  },
                  {
                    type: 'link',
                    text: 'Studios',
                    path: '/top/anime/studio/1/Studio-Pierrot/1',
                    iconLeft: '<i class="fas fa-building"></i>'
                  },
                  {
                    type: 'link',
                    text: 'Reviews',
                    path: '/reviews/anime/1',
                    iconLeft: '<i class="fas fa-pen"></i>'
                  },
                  {
                    type: 'link',
                    text: 'Recommendations',
                    path: '/recommendations/anime/1',
                    iconLeft: '<i class="fas fa-history"></i>'
                  }
                ]
              },
              {
                type: 'link',
                text: 'Manga',
                iconLeft: '<i class="fas fa-book mr-1"></i>',
                subMenuOptions: [
                  {
                    type: 'link',
                    text: 'Search',
                    path: '/search/manga?search=',
                    iconLeft: '<i class="fas fa-search"></i>'
                  },
                  {
                    type: 'link',
                    text: 'Toplist',
                    path: '/top/manga/1',
                    iconLeft: '<i class="fas fa-chart-bar"></i>'
                  },
                 {
                    type: 'link',
                    text: 'Genres',
                    path: '/top/manga/genre/1/Action/1',
                    iconLeft: '<i class="fas fa-list"></i>'
                  },
                   {
                    type: 'link',
                    text: 'Magazines',
                    path: '/top/manga/magazine/1/Big-Comic-Original/1',
                    iconLeft: '<i class="fas fa-book"></i>'
                  },
                  {
                    type: 'link',
                    text: 'Reviews',
                    path: '/reviews/manga/1',
                    iconLeft: '<i class="fas fa-pen"></i>'
                  },
                  {
                    type: 'link',
                    text: 'Recommendations',
                    path: '/recommendations/manga/1',
                    iconLeft: '<i class="fas fa-history"></i>'
                  }
                ]
              },
              {
                type: 'link',
                text: 'Characters',
                iconLeft: '<i class="fas fa-users mr-1"></i>',
                subMenuOptions: [
                  {
                    type: 'link',
                    text: 'Search',
                    path: '/search/characters?search=',
                    iconLeft: '<i class="fas fa-search"></i>'
                  },
                  {
                    type: 'link',
                    text: 'Most popular',
                    path: '/top/characters/1',
                    iconLeft: '<i class="fas fa-chart-bar"></i>'
                  }
                ]
              },
              {
                type: 'link',
                text: 'People',
                iconLeft: '<i class="fas fa-users mr-1"></i>',
                subMenuOptions: [
                  {
                    type: 'link',
                    text: 'Search',
                    path: '/search/people?search=',
                    iconLeft: '<i class="fas fa-search"></i>'
                  },
                  {
                    type: 'link',
                    text: 'Most popular',
                    path: '/top/people/1',
                    iconLeft: '<i class="fas fa-chart-bar"></i>'
                  }
                ]
              },
              // {
              //   type: 'link',
              //   text: 'Login',
              //   path: '/login',
              //   iconLeft: '<i class="fas fa-sign-in-alt mr-1"></i>'
              // },
              {
                type: 'link',
                text: 'News',
                path: '/news/1',
                iconLeft: '<i class="fas fa-newspaper mr-1"></i>'
              },
              {
                type: 'link',
                text: 'Forum',
                path: '/forum',
                iconLeft: '<i class="fas fa-comments mr-1"></i>'
              },
              {
                type: 'link',
                text: 'Profile',
                iconLeft: '<i class="fas fa-user mr-1"></i>',
                subMenuOptions: [
                  {
                    type: 'link',
                    text: 'Local',
                    path: '/local',
                    iconLeft: '<i class="fas fa-hdd"></i>'
                  },
                  {
                    type: 'link',
                    text: 'MAL',
                    path: '/user/-Aincrad-',
                    iconLeft: '<i class="fas fa-external-link-alt"></i>'
                  }
                ]
              }
            ]
          }
        }
      },
    methods: {
      scrollTop(){
        window.scrollTo(0,0);
      }
      // changeView(view,name){
      //   sessionStorage.setItem(name+'View',view);
      //   switch(name) {
      //       case 'top': this.$root.topView=view; break;
      //       case 'season': this.$root.seasonView=view; break;
      //       case 'search': this.$root.searchView=view; break;
      //   }
      // }
    }
  }
</script>
<style>
  *,
*::before,
*::after {
    box-sizing: border-box;
}

html {
    font-size: 100%;
}

.vnb__menu-options__option__link{
  color:white;
}

.vnb__menu-options__option__link:hover{
  color:#b9afaf;
}

.vnb__popup{
  max-height: 100%;overflow-y: scroll;
}

@media(min-width: 1200px) and (max-width: 1550px){
  #app{
    width:65%;
  }
}

.ui-collapsible__header{
  background-color: rgba(209, 207, 207, 0.2) !important;
  color:white;
}

.ui-select__content *{
    color:white !important;
    max-width: 200px;
}

.ui-select{
    display: inline-block!important;
}

@media(min-width: 992px){
  ::-webkit-scrollbar {
    color:black;
    width:15px;
    height:10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.5);
  }


  ::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.3);
  }
}

body{
    overflow-x: hidden;
}

.dropdown-toggle{
    color:white !important;
}
</style>