import SideBar from "./Sidebar.vue"

import { mount } from "@vue/test-utils"
import { RouterLink } from "vue-router";

vi.mock("vue-router", () => ({
  RouterLink: {
    template: "<div/>"
  }
}))

const getWrapper = () => {
  return mount(SideBar, {
    shallow: true,
    stubs: {
      RouterLink,
    },
  })
}

describe("Sidebar.vue", () => {
  it("runs", () => {
    const wrapper = getWrapper();
    const $title = wrapper.find("#sidebar-title");
    expect($title.exists()).toBe(true);
  })
})