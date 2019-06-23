// Import modules
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Link from './Link'

const testLink = <Link to="/path">Content</Link>

describe('Examine the Link component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(testLink).contains(<a href="/path">Content</a>)).toBe(true)
  })

  it('should be selectable by class "a"', () => {
    expect(shallow(testLink).is('a')).toBe(true)
  })

  it('should mount in a full DOM', () => {
    expect(mount(testLink).find('a').length).toBe(1)
  })

  it('should render to static HTML', () => {
    expect(render(testLink).text()).toEqual('Content')
  })
})
