import { mount } from '@vue/test-utils'

import router from './router'
import App from './App.vue'

test('mount component', async () => {
  expect(App).toBeTruthy()

  const wrapper = mount(App, {
    global: {
      plugins: [router]
    }
  })

  expect(wrapper.html()).toMatchSnapshot()

  expect(wrapper.text()).toContain('Vite + Vue')
  expect(wrapper.text()).toContain('count is 0')

  await wrapper.get('button').trigger('click')
  expect(wrapper.text()).toContain('count is 1')

  await wrapper.get('button').trigger('click')
  expect(wrapper.text()).toContain('count is 2')
})
