import '@testing-library/jest-dom/extend-expect'

import { render, fireEvent } from '@testing-library/svelte'

import App from './App'

test('it renders correctly', () => {
  const tree = render(App, { name: 'Inferno' })

  expect(tree).toMatchSnapshot();
});

test('shows app name in header when rendered', () => {
  const { getByText } = render(App, { name: 'Inferno' })

  expect(getByText('Ponies and Ballerinas!')).toBeInTheDocument()
})

test('changes value of currentMedium when button is clicked', async () => {
  const { getByText, getByQuery } = render(App, { name: 'Inferno' })

  // let mockMedium = [{title: "drawing name", image: "drawing picture"}]
  // let currentMedium = [{title: "misc name", image: "misc picture"}]
  
  const drawingsButton = getByText('Drawings')

  // getByQuery("chooseCurrentMedium") = jest.fn().mockImplementation(() => {
  //   currentMedium = mockMedium
  // })

  await fireEvent.click(drawingsButton)

  expect(getByText('View of Mount Vesuvius')).toBeInTheDocument()
})
