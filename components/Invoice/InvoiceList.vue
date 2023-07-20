<!-- components/InvoiceList.vue -->
<template>
	<div>
		<template
			v-for="invoice in invoices"
			:key="invoice.id">
			<NuxtLink
				:to="`/invoices/${invoice.id}`"
				class="grid grid-cols-2 md:grid-cols-10 md:items-center gap-4 text-center px-4 py-6 my-4 border rounded-md">
				<div class="md:hidden">
					<p class="text-ellipsis overflow-hidden mb-4">
						<b>#{{ invoice.id }}</b>
					</p>
					<p class="text-sm mb-4"
						>Due:
						<p class="font-semibold">{{ invoice.date }}</p>
					</p>
					<p class="text-2xl font-bold"
						>IDR
						{{
							invoice.items.reduce(
								(acc, currentValue) => acc + currentValue.total,
								0
							)
						}}</p
					>
				</div>
				<div class="md:hidden">
					<p class="text-ellipsis overflow-hidden mb-4">{{ invoice.client.name }}</p>
					<Badges :badgeType="invoice.status" />
				</div>

				<div class="hidden md:block col-span-2">
					<p class="text-ellipsis overflow-hidden">
						<b>#{{ invoice.id }}</b>
					</p>
				</div>
				<div class="hidden md:block col-span-2">
					<small>Due:</small>
					<p class="font-semibold text-sm">{{ invoice.date }}</p>
				</div>
				<div class="hidden md:block ">
					<p class="text-ellipsis overflow-hidden">{{ invoice.client.name }}</p>
				</div>
				<div class="hidden md:block col-span-2">
					<b
						>IDR
						{{
							invoice.items.reduce(
								(acc, currentValue) => acc + currentValue.total,
								0
							)
						}}</b
					>
				</div>
				<div class="hidden md:block ">
					<Badges :badgeType="invoice.status" />
				</div>
				<div class="col-span-2 hidden md:block">
					<router-link
						:to="`/invoices/${invoice.id}`"
						class="btn">
						View</router-link
					>
				</div>
			</NuxtLink>
		</template>
	</div>
</template>

<script>
	import { useInvoicesStore } from '@/store/invoices';

	export default {
		setup() {
			const invoicesStore = useInvoicesStore();

			return {
				invoices: invoicesStore.invoices,
				deleteInvoice: invoicesStore.deleteInvoice,
			};
		},
	};
</script>
