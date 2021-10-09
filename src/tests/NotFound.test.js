import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import { NotFound } from '../components';

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  renderWithRouter(<NotFound />);

  const textNotFound = screen.getByRole('heading', {
    level: 2,
    name: /page requested not found/i,
  });

  const image = screen
    .getByAltText('Pikachu crying because the page requested was not found');

  expect(textNotFound).toBeInTheDocument();
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
