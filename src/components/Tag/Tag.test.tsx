import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Tag } from './Tag'

describe('Tag component', () => {
  it('renders without errors', () => {
    const { queryByTestId } = render(<Tag>My Tag</Tag>)
    expect(queryByTestId('tag')).toBeInTheDocument()
  })

  describe('with a background prop', () => {
    it('applies the background style', () => {
      const backgroundColor = '#e44608'
      const { getByTestId } = render(
        <Tag background={backgroundColor}>My Tag</Tag>
      )
      expect(getByTestId('tag')).toHaveStyle(`
background: ${backgroundColor};
`)
    })
  })
})
