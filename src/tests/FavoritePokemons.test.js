import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import { FavoritePokemons } from '../components';

test('Teste se a página contém as informações sobre a Pokédex', () => {
  renderWithRouter(<FavoritePokemons />);

  const textNoFavorite = screen.getByText('No favorite pokemon found');

  expect(textNoFavorite).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  renderWithRouter(<App />);

  const moreDetailsButton = screen.getByRole('link', {
    name: /more/i,
  });

  userEvent.click(moreDetailsButton);

  const checkFavorite = screen.getByRole('checkbox');

  userEvent.click(checkFavorite);

  expect(checkFavorite).toBeChecked();

  const favoritePokeLink = screen.getByRole('link', {
    name: 'Favorite Pokémons',
  });

  userEvent.click(favoritePokeLink);

  const titlePoke = screen.getByTestId('pokemon-name');

  expect(titlePoke).toBeInTheDocument();
});
