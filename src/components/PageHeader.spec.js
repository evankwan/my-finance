import PageHeader from "./PageHeader.vue"

import { mount } from "@vue/test-utils"

describe("PageHeader", () => {
	const getWrapper = () => {
		return mount(PageHeader, {
			shallow: true,
			props: {
				heading: "Expenses"
			}
		});
	}
	it("runs", () => {
		getWrapper();
		expect(true).toBe(true);
	})
})