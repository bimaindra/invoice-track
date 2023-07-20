import { defineStore } from 'pinia';

export interface Invoice {
	id: number;
	biller: {
		name: string;
		address: string;
	};
	client: {
		name: string;
		email: string;
		address: string;
	};
	date: string;
	projectDescription: string;
	paymentTerms: string;
	status: 'draft' | 'pending' | 'paid';
	items: InvoiceItem[];
}

export interface InvoiceItem {
	name: string;
	qty: number;
	price: number;
	total: number;
}

export const useInvoicesStore = defineStore('invoices', {
	state: () => ({
		invoices: [
			{
				id: 1689747740137,
				biller: {
					name: 'Indra',
					address: 'Sidoarjo',
				},
				client: {
					name: 'Frank',
					email: 'abc@mail.com',
					address: 'Jakarta',
				},
				date: '2024-01-01',
				projectDescription: 'lorem	ipsum dolor sit amet',
				paymentTerms: '30',
				status: 'draft',
				items: [
					{
						name: 'Banner Design',
						qty: 2,
						price: 100,
						total: 200,
					},
				],
			},
			{
				id: 1689743740137,
				biller: {
					name: 'Indra',
					address: 'Sidoarjo',
				},
				client: {
					name: 'John',
					email: 'abc@mail.com',
					address: 'Jakarta',
				},
				date: '2024-01-01',
				projectDescription: 'lorem	ipsum dolor sit amet',
				paymentTerms: '30',
				status: 'pending',
				items: [],
			},
			{
				id: 1649743740137,
				biller: {
					name: 'Indra',
					address: 'Sidoarjo',
				},
				client: {
					name: 'Tugiman',
					email: 'abc@mail.com',
					address: 'Jakarta',
				},
				date: '2024-01-01',
				projectDescription: 'lorem	ipsum dolor sit amet',
				paymentTerms: '30',
				status: 'paid',
				items: [
					{
						name: 'Banner Design',
						qty: 2,
						price: 100,
						total: 200,
					},
					{
						name: 'Website revamp',
						qty: 1,
						price: 100,
						total: 100,
					},
				],
			},
		],
	}),
	actions: {
		addInvoice(newInvoice: any) {
			this.invoices.push(newInvoice);
		},
		updateInvoice(updatedInvoice: any) {
			const index = this.invoices.findIndex(
				(invoice) => invoice.id === updatedInvoice.id
			);
			if (index !== -1) {
				this.invoices[index] = updatedInvoice;
			}
		},
		deleteInvoice(invoiceId: number) {
			this.invoices = this.invoices.filter(
				(invoice) => invoice.id !== invoiceId
			);
		},
	},
	getters: {
		sortInvoice: (state) => (payload: string) => {
			return state.invoices.sort((a, b) => {
				const statusA = a.status.toLowerCase();
				const statusB = payload.toLowerCase();

				if (statusA > statusB) {
					return 1;
				}

				return 0;
			});
		},
		getInvoiceById: (state) => (id: number) => {
			return state.invoices.find((invoice) => invoice.id === id);
		},
	},
});
