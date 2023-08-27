import welcome from "./welcome.vue"

import { mount } from "@vue/test-utils"

describe("welcome.vue", () => {
	it("displays a welcome prompt", () => {
		const wrapper = mount(welcome)
		const $title = wrapper.find("#welcome-title")
		const $subtitle = wrapper.find("#welcome-subtitle")

		expect($title.text()).toBe("Welcome to MyFinance")
		expect($subtitle.text()).toBe("What do you want to do today?")
	})
})
