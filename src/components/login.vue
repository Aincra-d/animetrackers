<template>
    <div>
        <div class="login-container d-flex align-items-center text-center mx-auto">
            <div class="w-100 text-light text-center mb-5">
                <ui-textbox
                class="mx-auto col-12 col-sm-6 my-4"
                icon="person"
                type="text"
                placeholder="Enter your MAL username"
                v-model="username"
                ></ui-textbox>

                <ui-textbox
                class="mx-auto col-12 col-sm-6 my-4"
                icon="person"
                type="password"
                placeholder="Enter your MAL password"
                v-model="password"
                ></ui-textbox>

                <ui-button @click="login" size="medium">Login</ui-button>
            </div>
        </div>
    </div>
</template>

<script>
    import cheerio from 'cheerio';
    import axios from 'axios';
    export default {
        name: 'login',
        data(){
            return {
                username: '',
                password: '',
                token: ''
            }
        },
        methods: {
            login(){
                let self=this;
                let data={
                    // user_name: self.username,
                    // password: self.password,
                    // cookie: '1',
                    // sublogin: 'Login',
                    // submit: '1',
                    anime_id: 40591,
                    status: 1,
                    score: 10,
                    // num_read_volumes: 0,
                    num_watched_episodes: 7,
                    // num_read_chapters: 0,
                    csrf_token: self.token
                };
                axios.post("https://cors-anywhere.herokuapp.com/https://myanimelist.net/ownlist/anime/edit.json",JSON.stringify(data))
                .then(response => {
                    console.log(response)
                }).catch(error => console.log(error));
            }
        },
        created(){
            // let data={
            //     anime_id: 5435,
            //     status: 1,
            //     score: 10,
            //     watched: 7,
            //     token: 'dfjgfjdg'
            // };
            // console.log(JSON.stringify(data));
            let self=this;

            axios.get("https://cors-anywhere.herokuapp.com/https://myanimelist.net/login.php")
            .then(response => {
                const $ = cheerio.load(response.data);
                self.token=$("meta[name=csrf_token]").attr("content");
                console.log('token',self.token);
            }).catch(error => console.log(error));
        }
    }
</script>

<style scoped>
    .login-container{
        height:100vh;
        background-color: rgba(0,0,0,0.5);
    }
</style>