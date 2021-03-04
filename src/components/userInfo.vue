<template>
    <div style="height:100vh;">
        <div v-if="loaded">
            <info
            v-if="$route.params.username"
            :user="user_info">
            </info>

            <br>

            <user-menu class="d-block">
            </user-menu>

            <br>

            <zoom-x-transition group :duration="500">
                <router-view :key="$route.fullPath">
                </router-view>
            </zoom-x-transition>
        </div>

        <div
        v-else
        class="text-center w-100">
            <i class="fas fa-spinner fa-2x fa-spin text-light"></i>
        </div>
    </div>
</template>

<script>
    import axios    from 'axios';
    import info     from '@/components/userInfo/info.vue';
    import userMenu from '@/components/userInfo/menu.vue';
    export default{
        name: 'userInfo',
        components: {
            info,
            'user-menu': userMenu
        },
        data(){
            return{
                user_info: {},
                loaded: this.$route.params.username ? false : true
            }
        },
        methods: {
            getUserInfo(){
                let user_info;
                let self=this;
                axios.get("https://api.jikan.moe/v3/user/"+this.$route.params.username)
                .then(response => {
                    console.log(response.data);
                    self.loaded=false;
                    let user=response.data;

                    user_info={
                        image: user.image_url,
                        last_online: user.last_online,
                        gender: user.gender,
                        location: user.location,
                        joined: user.joined,
                        birthday: user.birthday,
                        about: user.about
                    };

                    console.log('user_info',user_info);

                    self.user_info=user_info;
                    self.loaded=true;
                }).catch(error =>{
                    console.log(error);
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: '<h6>Failed to load user info. Please try again!</h6>'
                    });
                    self.loaded=true;
                });
            }
        },
        // beforeRouteUpdate(to,from,next){
        //     if(to.params.username!=from.params.username){
        //         this.$Progress.start();
        //         let userInfo={};
        //         axios.get("https://api.jikan.moe/v3/user/"+to.params.username)
        //         .then(response => {
        //             console.log(response.data)
        //             let user=response.data;
        //             userInfo={
        //                 image: user.image_url,
        //                 last_online: user.last_online,
        //                 gender: user.gender,
        //                 location: user.location,
        //                 joined: user.joined,
        //                 birthday: user.birthday,
        //                 about: user.about
        //             };
        //             this.user=userInfo;
        //             next();
        //             this.$Progress.finish();
        //         }).catch(error => { console.log(error) });
        //     }
        //     else next();
        // },
        // beforeRouteEnter(to,from,next){
        //     if(to.params.username){
        //         let userInfo={};
        //         axios.get("https://api.jikan.moe/v3/user/"+to.params.username)
        //         .then(response => {
        //             console.log(response.data)
        //             let user=response.data;
        //             userInfo={
        //                 image: user.image_url,
        //                 last_online: user.last_online,
        //                 gender: user.gender,
        //                 location: user.location,
        //                 joined: user.joined,
        //                 birthday: user.birthday,
        //                 about: user.about
        //             };
        //             next(vm => {
        //                 vm.$Progress.start();
        //                 vm.user=userInfo;
        //                 vm.$Progress.finish();
        //             });
        //         }).catch(error => { console.log(error) });
        //     }
        //     else next();
        // }
        created(){
            if(this.$route.params.username) this.getUserInfo();
        }
    }
</script>

<style>
    .ui-collapsible__body{
        border:0;
        padding:0;
        margin:0;
        margin-top:10px;
        text-align: left;
    }
</style>