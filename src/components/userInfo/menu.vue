<template>
    <div>
        <div class="w-100 text-center text-light float-left menu-container">
            <ul class="list-unstyled">
                <li class="d-inline mx-2">
                    <router-link class="font-weight-bold"
                    :class="($route.name=='profile' || $route.name=='local_profile') ? 'text-primary' : 'text-light'"
                    :to="($route.params.username ? '/user/'+$route.params.username : '/local')">
                        <i class="fas fa-user"></i> Profile
                    </router-link>
                </li>


                <li class="d-inline mx-2">
                    <router-link class="font-weight-bold"
                    :class="($route.name=='list' || $route.name=='local_list') && $route.params.type=='anime' ? 'text-primary' : 'text-light'"
                    :to="($route.params.username ? '/user/'+$route.params.username : '/local')+'/list/anime/watching/1'">
                        <i class="fas fa-tv"></i> Anime list
                    </router-link>
                </li>


                <li class="d-inline mx-2">
                    <router-link class="font-weight-bold"
                    :class="($route.name=='list' || $route.name=='local_list') && $route.params.type=='manga' ? 'text-primary' : 'text-light'"
                    :to="($route.params.username ? '/user/'+$route.params.username : '/local')+'/list/manga/reading/1'">
                        <i class="fas fa-book"></i> Manga list
                    </router-link>
                </li>


                <li
                v-if="!$route.params.username"
                class="d-inline mx-2">
                    <router-link class="font-weight-bold"
                    :class="$route.name=='collections' ? 'text-primary' : 'text-light'"
                    :to="'/local/collections'">
                        <i class="fas fa-list-alt"></i> Collections
                    </router-link>
                </li>


                <li
                v-if="$route.params.username"
                class="d-inline mx-2">
                    <router-link class="font-weight-bold"
                    :class="($route.name=='friends' || $route.name=='local_friends') ? 'text-primary' : 'text-light'"
                    :to="($route.params.username ? '/user/'+$route.params.username : '/local')+'/friends/1'">
                        <i class="fas fa-users"></i> Friends
                    </router-link>
                </li>


                <li class="d-inline mx-2">
                    <router-link class="font-weight-bold"
                    :class="($route.name=='history' || $route.name=='local_history') ? 'text-primary' : 'text-light'"
                    :to="($route.params.username ? '/user/'+$route.params.username : '/local')+'/history'+(!$route.params.username ? '/1' : '')">
                        <i class="fas fa-history"></i> History
                    </router-link>
                </li>
            </ul>
        </div>

        <div
        v-if="$route.name == 'history' || $route.name == 'local_history'"
        class="w-100 text-center text-light float-left menu-container">
            <ul class="list-unstyled font-weight-bold">
                <li class="d-inline">
                    <router-link
                        class="mx-4 d-inline"
                        :class="!$route.params.type ? 'text-primary' : 'text-light'"
                        :to="{ name: $route.name, params: { page: 1 } }">
                            <i class="fas fa-history"></i> All
                    </router-link>
                </li>
                <li class="d-inline">
                    <router-link
                        class="mx-4 d-inline"
                        :class="$route.params.type == 'anime' ? 'text-primary' : 'text-light'"
                        :to="{ name: $route.name, params: { type: 'anime', page: 1 } }">
                            <i class="fas fa-tv"></i> Anime
                    </router-link>
                </li>
                <li class="d-inline">
                    <router-link
                        class="mx-4 d-inline"
                        :class="$route.params.type == 'manga' ? 'text-primary' : 'text-light'"
                        :to="{ name: $route.name, params: { type: 'manga', page: 1 } }">
                            <i class="fas fa-book"></i> Manga
                    </router-link>
                </li>
            </ul>
        </div>
        
        <div v-if="$route.name == 'history'">
            <br><br>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'userMenu'
    }
</script>

<style scoped>
    .menu-container{
        white-space: nowrap;
        overflow-x: auto;
    }
</style>