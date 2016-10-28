import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Banner from 'components/banner'

describe('Banner', () => {
  it('should have a header', () => {
    const wrapper = shallow(<Banner/>)
    expect(wrapper.find('header')).to.have.length(1)
  })
  it('should have a div', () => {
    const wrapper = shallow(<Banner/>)
    expect(wrapper.find('div')).to.have.length(1)
  })
})
