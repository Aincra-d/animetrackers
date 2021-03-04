<template>
	<div>
		<button type="button" class="btn btn-outline-light btn-sm page-buttons ml-2 mx-lg-1">
			<slot></slot>
		</button>
	</div>
</template>

<script>
	export default{
		name: 'pageButton'
	}
</script>