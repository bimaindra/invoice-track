<template>
	<div>
		<h1>Invoice detail for {{ id }}</h1>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque corrupti
			consequuntur, aliquam id accusantium tempora fugiat eaque sint et quidem
			adipisci mollitia illo, quia assumenda itaque placeat non distinctio
			eveniet.
		</p>
	</div>
</template>

<script>
	export default {
		setup() {
			const { id } = useRoute().params;

			return { id };
		},
	};
</script>

<style lang="scss" scoped></style>
