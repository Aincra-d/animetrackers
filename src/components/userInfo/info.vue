<template>
    <div>
        <div class="text-light w-100">
            <img id="user-cover" :src="user.image" class="float-left m-2">
            <h3>{{this.$route.params.username}}</h3>
            <table style="white-space: pre-line;" class="p-0 m-0 align-top font-xs-12 font-sm-15">
                <tr>
                    <td class="font-weight-bold">
                        <span class="mr-2 mt-2">Joined:</span>
                    </td>

                    <td>
                        <span>{{user.joined.substring(0,10)}}</span>
                    </td>
                </tr>

                <tr>
                    <td class="font-weight-bold">
                        <span class="mr-2 mt-2">Birthday:</span>
                    </td>

                    <td>
                        <span>{{user.birthday ? user.birthday.substring(0,10) : '-'}}</span>
                    </td>
                </tr>

                <tr>
                    <td class="font-weight-bold">
                        <span class="mr-2 mt-2">Location:</span>
                    </td>

                    <td>
                        <span>{{user.location ? user.location : '-'}}</span>
                    </td>
                </tr>

                <tr>
                    <td class="font-weight-bold">
                        <span class="mr-2 mt-2">Gender:</span>
                    </td>

                    <td>
                        <span>{{user.gender ? user.gender : '-'}}</span>
                    </td>
                </tr>

                 <tr>
                    <td class="font-weight-bold">
                        <span class="mr-2 mt-2">Online:</span>
                    </td>

                    <td>
                        <span>{{user.last_online.substring(0,10)}}</span>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>  
    export default{
        name: 'info',
        props: {
            user: Object
        }
    }
</script>

<style scoped>
    @media(max-width: 991px){
        #user-cover{
            height:180px;
            width:130px;
        }
    }

    @media(min-width: 991px){
        #user-cover{
            height:220px;
            width:150px;
        }
    }

    #user-cover{
        object-fit: cover;
    }

    p{
        white-space: pre-wrap;
    }
</style>