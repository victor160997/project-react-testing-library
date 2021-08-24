import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import { About } from '../components';

test('Teste se a página contém as informações sobre a Pokédex', () => {
  renderWithRouter(<About />);

  const textAbout = screen.getByText('About Pokédex');
  const aboutPokeText = screen.getByText(/this application/i);
  const image = screen.getByRole('img');
  const aboutPokeTextDown = screen.getByText(/and see more details/i);

  expect(textAbout).toBeInTheDocument();
  expect(aboutPokeText).toBeInTheDocument();
  expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  expect(aboutPokeTextDown).toBeInTheDocument();
});
