<template>
	<div>
		<div class="col-12 col-md-8 mx-auto text-center text-light">
            <div class="w-100 mx-auto">
                <ul v-show="labels" class="list-unstyled">
                    <li :title="stat.label+' - '+stat.value+'  -  '+Math.round((stat.value/(stats[0].value+stats[1].value+stats[2].value+stats[3].value+stats[4].value))*100)+'%'" :key="stat.label" v-for="stat in stats" class="d-inline mx-2">
                        <div :style="{backgroundColor: stat.color}" class="mr-1 d-inline-block label"></div>
                        <span class="font-weight-normal">{{stat.label}}</span>
                    </li>
                </ul>
                <div :key="stat.label" v-for="stat in stats" :title="stat.label+' - '+stat.value+'  -  '+Math.round((stat.value/(stats[0].value+stats[1].value+stats[2].value+stats[3].value+stats[4].value))*100)+'%'" :style="{width: (stat.value/(stats[0].value+stats[1].value+stats[2].value+stats[3].value+stats[4].value))*100+'%', backgroundColor: stat.color}" class="d-inline-block p-0 m-0 block">   
                </div>
            </div>
        </div>
	</div>
</template>

<script>
	export default{
		name: 'lineStat',
		props: {
			stats: Array,
            labels: Boolean
		}
	}
</script>

<style scoped>
	.label{
		height:15px;
		width:15px;
		border-radius: 50%;
	}

    @media(max-width: 576px){
        .block{
            height:30px;
        }

        ul li span{
            font-size: 12px;
        }
    }

    @media(min-width: 576px){
        .block{
            height:40px;
        }

        ul li span{
            font-size: 15px;
        }
    }
</style>