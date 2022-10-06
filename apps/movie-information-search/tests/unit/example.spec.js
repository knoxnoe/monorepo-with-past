import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import dia from '@/components/dialogs.vue'

describe('dialogs.vue', () => {
  //测试用例
  const wrapper = shallowMount(dia)
  // const vm = wrapper.vm
  it('renders suceess when passed', () => {
    // const diatext = 'This is an dia page'
    expect(wrapper.contains('div')).to.equal(true)
  })

  it('renders the correct markup', () => {
    expect(wrapper.html()).contain('<h1>This is an dia page</h1>')
  })
  
})
