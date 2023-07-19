<template>
	<div
		class="flex items-center justify-between gap-4 text-center p-4 my-4 border rounded-md">
		<div>
			<p>
				<b>#{{ item.id }}</b>
			</p>
		</div>
		<div>
			<p>{{ item.date }}</p>
		</div>
		<div>
			<p>{{ item.name }}</p>
		</div>
		<div>
			IDR
			{{
				item.items.reduce((acc, currentValue) => acc + currentValue.total, 0)
			}}
		</div>
		<div>
			<p>{{ item.status }}</p>
		</div>
		<div>
			<button>></button>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['foo'],
		setup(props) {
			// setup() receives props as the first argument.
			console.log(props.foo);
		},
	};
</script>
