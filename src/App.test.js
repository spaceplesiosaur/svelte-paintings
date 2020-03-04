import '@testing-library/jest-dom/extend-expect'

import { render, fireEvent } from '@testing-library/svelte'

import App from './App'


test('shows app name in header when rendered', () => {
  const { getByText } = render(App, { name: 'Inferno' })

  expect(getByText('Ponies and Ballerinas!')).toBeInTheDocument()
})
