import { render } from '@testing-library/react'
import Link from './Link'

const setup = () => {
  const utils = render(<Link to="/path">Content</Link>)

  const link = utils.getByTestId('link')

  return {
    ...utils,
    link,
  }
}

describe('Examine the Link component', () => {
  it('should render its content', () => {
    const { link } = setup()

    expect(link).toHaveTextContent('Content')
  })

  it('should have the correct href', () => {
    const { link } = setup()

    expect(link).toHaveAttribute('href', '/path')
  })
})
