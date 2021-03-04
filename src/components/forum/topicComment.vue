<template>
	<div>

		<div
		class="comments"
		:key="comment.index"
		v-for="comment in comments">
			<div
			v-if="comment.index"
			class="w-95 mx-auto comment-container text-light my-3 rounded p-2">
				<div
				v-if="comment.index"
				class="w-100 comment-wrapper position-relative">
					<div class="w-100 text-left user-container">
						<ul class="list-unstyled">
							<li
							v-if="comment.user.picture"
							class="d-inline-block">
								<router-link :to="'/user/'+comment.user.name">
									<img
									:title="comment.user.name"
									:alt="comment.user.name"
									v-lazy="comment.user.picture"
									class="user-picture">
								</router-link>
							</li>

							<li class="d-inline-block user-name ml-2">
								<router-link 
								:to="'/user/'+comment.user.name"
								class="text-light">
									<h5 class="font-xs-13 font-sm-13 font-md-13">
										{{comment.user.name}}
									</h5>
								</router-link>

								<h6 class="comment-date font-xs-13 font-sm-13 font-md-13">
									{{comment.date}}
								</h6>
							</li>
						</ul>

						<span class="h5 position-absolute top-0 right-0 font-xs-15">
							{{comment.index}}

							<button
							@click="comment.toggled=!comment.toggled"
							type="button"
							class="btn btn-link btn-sm">
								<i class="fa-lg"
								:class="comment.toggled ? 'fas fa-angle-down' : 'fas fa-angle-up'">
								</i>
							</button>
						</span>

					</div>

					<div
					v-show="comment.toggled"
					style="overflow-x: auto;"
					v-html="comment.comment"
					class="w-100 comment mb-1 mt-2 font-xs-13 font-sm-13 font-md-13 font-lg-14 font-xl-14">
						{{comment.comment}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'topicComment',
	props: {
		comments: Array
	}
}
</script>

<style>
	.comment-container{
		background-color: rgba(0,0,0,0.3);
	}

	.user-container{
		border-bottom:1px solid white;
	}

	@media(max-width: 991px){
		.user-picture{
			height:70px;
			width:55px;
		}
	}

	@media(min-width: 991px){
		.user-picture{
			height:80px;
			width:70px;
		}
	}

	.comment .userimg{
		max-width: 100%;
	}

	.comment{
		max-width: 100%;
	}

	.comment .button.show_button,.comment .button.hide_button, .comment .button.expand_quote{
		background-color: rgba(0,0,0,0.8);
		color:white;
		border:none;
		border-radius: 0.25rem;
		padding:5px;
	}

	.quotetext{
		border: 1px solid white;
		margin: 5px;
		padding: 5px;
	}
</style>