<template>
	<div>
		<ui-modal ref="mangaInfo" title="With footer" class="text-dark">
            Hello, World. What's happening?
            <div slot="footer">
                <ui-button color="primary">Say Hi</ui-button>
                <ui-button @click="closeModal('mangaInfo')">Close</ui-button>
            </div>
        </ui-modal>
	</div>
</template>

<script>
	export default{
		name: 'mangaInfoModal',
		props: {
			mangaID: Number
		}
	}
</script>