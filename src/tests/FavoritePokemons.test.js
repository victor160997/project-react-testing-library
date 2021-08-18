import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('', () => {
  test('Not found message', () => {
    render(
      <MemoryRouter>
        <FavoritePokemons pokemons={ [] } />
      </MemoryRouter>,
    );

    screen.getByText('No favorite pokemon found');
  });

  test('Render favorite pokemons', () => {
    render(
      <MemoryRouter initialEntries={ ['/favorites'] }>
        <FavoritePokemons pokemons={ pokemons } />
      </MemoryRouter>,
    );

    const names = screen.getAllByTestId('pokemon-name');

    expect(names.length).toBe(pokemons.length);
  });
});
