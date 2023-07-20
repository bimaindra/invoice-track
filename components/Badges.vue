<template>
	<span
		:class="`text-slate-800 font-medium px-4 py-1.5 rounded border ${
			badgeType === 'paid'
				? 'bg-teal-100 border-teal-400'
				: badgeType === 'pending'
				? 'bg-yellow-100 border-yellow-400'
				: 'bg-slate-100 border-slate-400'
		}`"
		>{{ badgeType }}</span
	>
</template>

<script>
	export default {
		props: {
			badgeType: String,
		},
	};
</script>

<style lang="scss" scoped></style>
