import { mount } from '@vue/test-utils'
import TestCom from '../src/views/test/index.vue'

test('Test.vue', async () => {
  const wrapper = mount(TestCom)
  expect(wrapper.html()).toContain('Unit Test Page')
  expect(wrapper.html()).toContain('count is: 0')
  await wrapper.find('button').trigger('click')
  expect(wrapper.html()).toContain('count is: 1')
})
