<template>
	<div>
		<div class="w-100 text-center">
			<img class="mx-auto img-fluid" :src="gifs[Math.floor(Math.random() * gifs.length)]">
		</div>
	</div>
</template>

<script>
	export default{
		name: 'loading',
		data(){
			return{
				gifs: ["https://i.imgur.com/nfegm3h.gif","https://i.imgur.com/O8QGIUD.gif","https://i.imgur.com/gMGkdyk.gif","https://i.imgur.com/kSGru2k.gif",""]
			}
		}
	}
</script>