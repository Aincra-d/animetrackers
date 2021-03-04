<template>
	<div>
		<div class="w-100 mobile-slider mobile-slider-singer" style="overflow-x: scroll !important;overflow-y: hidden !important;height:relative;white-space: nowrap;">
			<div :key="char.id" v-for="char in characters" :style="{ backgroundImage: 'url(' + char.image + ')' }" style="background-position: top;background-size: cover;" class="d-inline-block bg-transparent w-xs-35 w-sm-20 w-md-20 mobile-card d-inline-flex align-items-end">
				<div style="background: rgba(0,0,0,0.4);" class="w-100">
					<span style="font-size: 9px !important;" class="font-weight-bold song-title text-light">
						<a class="text-light">
							{{char.name.length>15 ? char.name.substring(0,15)+"..." : char.name}}
						</a>
					</span>
				</div>
			</div>
		</div>
		<!-- <ul class="list-unstyled">
			<li :key="char.id" class="d-block" v-for="char in characters">
				<img :src="char.image">
				<br>
				<span class="font-weight-bold">
					{{char.name}}
				</span>
			</li>
		</ul> -->
	</div>
</template>

<script>
	export default{
		name: 'characters',
		props: {
			characters: Array
		}
	}
</script>

<style scoped>
	@media (max-width: 450px){
  .mobile-slider .mobile-card{
    height: 80px;
    width: 45%;
  }

  .mobile-slider-singer .mobile-card{
    height: 120px !important;
    width: 90px !important;
  }
}

@media (min-width: 450px) and (max-width: 991px){
  .mobile-slider .mobile-card{
    height: 100px;
    width: 30%;
  }

  .mobile-slider-singer .mobile-card{
    height: 140px !important;
    width: 95px !important;
  }
}

@media (min-width: 991px) and (max-width: 1200px){
  .mobile-slider .mobile-card{
    height: 250px !important;
    width: 200px !important;
  }

  .mobile-slider-singer .mobile-card{
    height: 140px !important;
    width: 95px !important;
  }
}

@media (min-width: 1200px) and (max-width: 1400px){
  .mobile-slider .mobile-card{
    height: 250px !important;
    width: 200px !important;
  }

  .mobile-slider-singer .mobile-card{
    height: 160px !important;
    width: 120px !important;
  }
}

@media (min-width: 1400px){
  .mobile-slider .mobile-card{
    height: 200px !important;
    width: 300px !important;
  }

  .mobile-slider-singer .mobile-card{
    height: 170px !important;
    width: 130px !important;
  }
}
</style>