import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Notifications from 'vue-notification'

import VueHead from 'vue-head'

Vue.use(VueHead)

 import Vuesax from 'vuesax'

  import 'vuesax/dist/vuesax.css' //Vuesax styles
  Vue.use(Vuesax)

import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';
import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';
import VueProgressBar from 'vue-progressbar'
const options = {
  color: 'lightblue',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '1s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

import Transitions from 'vue2-transitions'
Vue.use(Transitions)

import VueLazyload from 'vue-lazyload';

// Vue.use(VueLazyload);

// or with options
Vue.use(VueLazyload, {
  preLoad: 1,
  attempt: 1
});

Vue.use(Notifications)
Vue.use(VueProgressBar, options)
Vue.use(Donut);
Vue.use(KeenUI)
Vue.use(Chartkick.use(Chart))
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

const router = new VueRouter({
    mode: 'history',
    routes: [
    // {
    //     path: '/list/:page',
    //     name: 'home',
    //     component: home
    // },
    {
        path: '',
        name: 'home',
        component: () => import('@/components/home.vue').then(m => m.default)
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/components/login.vue').then(m => m.default)
    },
    {
        path: '/new/:newsid',
        name: 'news',
        component: () => import('@/components/news.vue').then(m => m.default)
    },
    {
        path: '/recommendations/:type/:page',
        name: 'recommendations',
        component: () => import('@/components/recommendations.vue').then(m => m.default)
    },
    {
        path: '/reviews/:type/:page',
        name: 'reviews',
        component: () => import('@/components/reviews.vue').then(m => m.default)
    },
    // {
    //     path: '/reviews/:type/:subtype?/:page',
    //     name: 'reviews',
    //     component: () => import('@/components/reviews.vue').then(m => m.default)
    // },
    {
        path: '/top/:type/:subtype?/:page',
        name: 'toplist',
        component: () => import ('@/components/toplist.vue').then(m => m.default)
    },
    {
        path: '/top/:type/genre/:genreid/:genrename?/:page',
        name: 'genreTop',
        component: () => import ('@/components/toplist.vue').then(m => m.default)
    },
    {
        path: '/top/:type/studio/:studioid/:studioname?/:page',
        name: 'studioTop',
        component: () => import ('@/components/toplist.vue').then(m => m.default)
    },
    {
        path: '/top/:type/magazine/:magazineid/:magazinename?/:page',
        name: 'magazineTop',
        component: () => import ('@/components/toplist.vue').then(m => m.default)
    },
    {
        path: '/character/:charid/:name',
        name: 'character',
        component: () => import('@/components/characterInfo.vue').then(m => m.default),
    },
    {
        path: '/people/:personid/:name',
        name: 'people',
        component: () => import('@/components/peopleInfo.vue').then(m => m.default),
    },
    {
        path: '/user/:username',
        component: () => import('@/components/userInfo.vue').then(m => m.default),
        children:[
        {
            name: 'profile',
            path: '',
            component: () => import('@/components/userInfo/profile.vue').then(m => m.default)
        },
        {
            name: 'list',
            path: 'list/:type/:status/:page',
            component: () => import('@/components/userInfo/list.vue').then(m => m.default)
        },
        {
            name: 'friends',
            path: 'friends/:page',
            component: () => import('@/components/userInfo/friends.vue').then(m => m.default)
        },
        {
            name: 'history',
            path: 'history/:type?',
            component: () => import('@/components/userInfo/history.vue').then(m => m.default)
        }
        ]
    },
    {
        path: '/local',
        component: () => import('@/components/userInfo.vue').then(m => m.default),
        children:[
        {
            name: 'local_profile',
            path: '',
            component: () => import('@/components/userInfo/profile.vue').then(m => m.default)
        },
        {
            name: 'local_list',
            path: 'list/:type/:status/:page',
            component: () => import('@/components/userInfo/list.vue').then(m => m.default)
        },
        {
            name: 'collections',
            path: 'collections/:type?/:collid?/:name?',
            component: () => import('@/components/userInfo/collections.vue').then(m => m.default)
        },
        {
            name: 'local_history',
            path: 'history/:type?/:page',
            component: () => import('@/components/userInfo/history.vue').then(m => m.default)
        }
        ]
    },
    {
        path: '/season/:year/:season',
        name: 'seasonalAnime',
        component: () => import('@/components/season.vue').then(m => m.default) 
    },
    {
        path: '/search/:type',
        name: 'search',
        component: () => import('@/components/search.vue').then(m => m.default) 
    },
    {
        path: '/news/:page',
        name: 'allNews',
        component: () => import('@/components/allNews.vue').then(m => m.default) 
    },
    {
        path: '/forum',
        name: 'forumRoute',
        component: () => import('@/components/forum.vue').then(m => m.default)
    },
    // {
    //     path: '/genshin/:type',
    //     name: 'genshin',
    //     component: () => import('@/components/genshin.vue').then(m => m.default)
    // },
    {
        path: '/:type/:titleid/:title',
        component: () => import('@/components/titleInfo.vue').then(m => m.default),
        children:[
        {
            name: 'titleOverviewRoute',
            path: '',
            component: () => import('@/components/titleInfo/overview.vue').then(m => m.default)
        },
        {
            name: 'titleCharactersRoute',
            path: 'characters',
            component: () => import('@/components/titleInfo/characters.vue').then(m => m.default)
        },
        {
            name: 'titleStaffRoute',
            path: 'staff',
            component: () => import('@/components/titleInfo/staff.vue').then(m => m.default)
        },
        {
            name: 'titleEpisodesRoute',
            path: 'episodes/:page',
            component: () => import('@/components/titleInfo/episodes.vue').then(m => m.default)
        },
        {
            name: 'titleReviewsRoute',
            path: 'reviews/:page',
            component: () => import('@/components/titleInfo/reviews.vue').then(m => m.default)
        },
        {
            name: 'titleStatisticsRoute',
            path: 'stats',
            component: () => import('@/components/titleInfo/stats.vue').then(m => m.default)
        },
        {
            name: 'titleRecommendationsRoute',
            path: 'recommendations',
            component: () => import('@/components/titleInfo/recommendations.vue').then(m => m.default)
        },
        {
            name: 'titleNewsRoute',
            path: 'news',
            component: () => import('@/components/titleInfo/news.vue').then(m => m.default)
        },
        {
            name: 'titleForumRoute',
            path: 'forum',
            component: () => import('@/components/titleInfo/forum.vue').then(m => m.default)
        },
        {
            name: 'titleRatingsRoute',
            path: 'ratings/:page',
            component: () => import('@/components/titleInfo/ratings.vue').then(m => m.default)
        },
        ]
    }
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) return savedPosition
        else return { x: 0, y: 0 }
    }
});

new Vue({
    render: h => h(App),
    router,
    data: {
        topView: sessionStorage.topView || 'list-sm',
        seasonView: sessionStorage.seasonView || 'card',
        searchView: sessionStorage.searchView || 'list-sm',
        listView: sessionStorage.listView || 'card',
        season: [],
        search_results: [],
        screen: window.innerWidth
    },
    methods: {
        onResize(){
            this.screen=window.innerWidth
        }
    },
    mounted(){
        window.addEventListener('resize',this.onResize)
    },
    created(){
        console.log("OK")
    }
}).$mount('#app');