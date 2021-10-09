import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';
import { Pokemon } from '../components';

test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
  renderWithRouter(<App />);

  const pokeName = screen.getByTestId('pokemon-name');
  const pokeType = screen.getByTestId('pokemon-type');
  const pokeWeight = screen.getByTestId('pokemon-weight');
  const { averageWeight, image, name, type } = pokemons[0];
  const pokeImg = screen.getByAltText(`${name} sprite`);

  expect(pokeName.innerHTML).toBe(name);
  expect(pokeType.innerHTML).toBe(type);
  expect(pokeWeight.innerHTML)
    .toBe(`Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`);
  expect(pokeImg).toBeInTheDocument();
  expect(pokeImg.src).toBe(image);
});

test('Teste se o card indicado na Pokédex contém link de navegação more details', () => {
  const { history } = renderWithRouter(<App />);

  userEvent.click(screen.getByText(/more/i));
  const { location } = history;
  const { pathname } = location;

  expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
});

test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
  renderWithRouter(<App />);

  userEvent.click(screen.getByText(/more/i));
  const titleDetails = screen.getByRole('heading', {
    level: 2,
    name: 'Pikachu Details',
  });

  expect(titleDetails).toBeInTheDocument();
});

test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
  renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
  const startIcon = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);

  expect(startIcon).toBeInTheDocument();
  expect(startIcon.src).toBe('http://localhost/star-icon.svg');
});
