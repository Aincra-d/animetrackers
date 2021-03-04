<template>
	<div>
		<div class="w-100 text-left text-light">
			<div
			:key="index"
			v-for="(board,index) in boards"
			style="background-color: rgba(0,0,0,0.3);"
			class="w-95 mx-auto text-light py-1 my-2 rounded">
				<div class="mx-2">
					<router-link :to="'/forum?board='+board.id+'&page=1'">
						<h5
						v-if="$root.screen>576"
						class="text-primary">
							<i
							class="fa-sm text-light d-inline-block"
							:class="board.icon"></i>
							{{board.title}}
						</h5>

						<h6
						v-else
						class="text-primary">
							<i
							class="fa-sm text-light d-inline-block"
							:class="board.icon"></i>
							{{board.title}}
						</h6>
					</router-link>
					
					<p class="text-light font-xs-12 font-sm-15">
						{{board.description}}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'boards',
	data(){
		return {
			boards: [
			{
				id: 5,
				title: 'Updates & Announcements',
				description: 'Updates, changes, and additions to MAL.',
				icon: 'fas fa-bullhorn'
			},
			{
				id: 14,
				title: 'MAL Guidelines & FAQ',
				description: 'Site rules, forum rules, database guidelines, review/recommendation guidelines, and other helpful information.',
				icon: 'fas fa-gavel'
			},
			{
				id: 3,
				title: 'Support',
				description: 'Have a problem using the site or think you found a bug? Post here.',
				icon: 'fas fa-life-ring'
			},
			{
				id: 4,
				title: 'Suggestions',
				description: 'Have an idea or suggestion for the site? Share it here.',
				icon: 'fas fa-lightbulb'
			},
			{
				id: 13,
				title: 'MAL Contests',
				description: 'Our season-long anime game and other user competitions can be found here.',
				icon: 'fas fa-trophy'
			},
			{
				id: 15,
				title: 'News Discussion',
				description: 'Current news in anime and manga.',
				icon: 'fas fa-newspaper'
			},
			{
				id: 16,
				title: 'Anime & Manga Recommendations',
				description: 'Ask the community for series recommendations or help other users looking for suggestions.',
				icon: 'fas fa-gift'
			},
			{
				id: 1,
				title: 'Anime Discussion',
				description: 'General anime discussion that is not specific to any particular series.',
				icon: 'fas fa-tv'
			},
			{
				id: 2,
				title: 'Manga Discussion',
				description: 'General manga discussion that is not specific to any particular series.',
				icon: 'fas fa-book'
			},
			{
				id: 8,
				title: 'Introductions',
				description: 'New to MyAnimeList? Introduce yourself here.',
				icon: 'fas fa-comment'
			},
			{
				id: 7,
				title: 'Games, Computers & Tech Support',
				description: 'Discuss visual novels and other video games, or ask our community a computer related question.',
				icon: 'fas fa-gamepad'
			},
			{
				id: 10,
				title: 'Music & Entertainment',
				description: 'Asian music and live-action series, Western media and artists, best-selling novels, etc.',
				icon: 'fas fa-music'
			},
			{
				id: 6,
				title: 'Current Events',
				description: 'World headlines, the latest in science, sports competitions, and other debate topics.',
				icon: 'fas fa-calendar'
			},
			{
				id: 11,
				title: 'Casual Discussion',
				description: "General interest topics that don't fall into one of the sub-categories above, such as community polls.",
				icon: 'fas fa-coffee'
			},
			{
				id: 12,
				title: 'Creative Corner',
				description: 'Show your creations to get help or feedback from our community. Graphics, list designs, stories; anything goes.',
				icon: 'fas fa-image'
			},
			{
				id: 9,
				title: 'Forum Games',
				description: 'Fun forum games are contained here.',
				icon: 'fas fa-puzzle-piece'
			}
			]
		}
	}
}
</script>