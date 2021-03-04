<template>
    <div>
        <div class="w-100 text-center text-light">
            <img id="person-cover" :src="person.image" class="float-left mx-2 mt-4 mb-sm-3">
            <br>
            <h6 class="text-light text-left">
                <span>{{person.name}}</span>
                <i class="fas fa-heart text-danger fa-sm mx-1"></i>
                <span>{{person.favourites}}</span>
            </h6>
            <!-- <ui-collapsible v-if="screen<576" title="person description" class="text-dark bg-transparent person-description" open>
                <p class="text-left text-light font-weight-normal">
                    {{person.about!=null && person.about.replace(new RegExp("\\\\n", "g"), "")}}
                </p>
            </ui-collapsible> -->

             <p style="white-space: pre-wrap;" class="my-2 mx-3 text-left text-light font-weight-normal about" :class="screen<576 ? 'font-12' : 'font-14'">
                {{person.about!=null && person.about.replace(new RegExp("\\\\n", "g"), "")}}
            </p>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'info',
        props: {
            person: Object,
            screen: Number
        }
    }
</script>

<style scoped>
    @media(max-width: 576px){
        #person-cover{
            height:130px;
            width:80px;
        }

        .about{
            height:100px;
        }
    }

    @media(min-width: 576px) and (max-width: 991px){
        #person-cover{
            height:170px;
            width:120px;
        }

        .about{
            height:140px;
        }
    }

    @media(min-width: 991px){
        #person-cover{
            height:220px;
            width:150px;
        }

        .about{
            height:170px;
        }
    }

    #person-cover{
        object-fit: cover;
    }
    .about{
        overflow-y: auto;
    }

    p{
        white-space: pre-wrap;
    }
</style>