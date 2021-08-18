import React from 'react';
import { render, screen } from '@testing-library/react';

import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 3', () => {
  it('Se caso não houver nenhum pokemon favoritado renderiza uma mensagem', () => {
    render(<FavoritePokemons />);

    const noFavorites = screen.getByText('No favorite pokemon found');
    expect(noFavorites).toBeInTheDocument();
  });

  it('Caso tenha pokemons favoritados, eles devem ser renderizados na tela', () => {
    const pokemons = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      },
      {
        id: 4,
        name: 'Charmander',
        type: 'Fire',
        averageWeight: {
          value: '8.5',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
      },
    ];

    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    // Pikachu
    const pikachuName = screen.getByText('Pikachu');
    expect(pikachuName).toBeInTheDocument();

    const pikachuType = screen.getByText('Electric');
    expect(pikachuType).toBeInTheDocument();

    const pikachuWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pikachuWeight).toBeInTheDocument();

    const pikachuImg = screen.getByAltText('Pikachu sprite');
    expect(pikachuImg).toBeInTheDocument();
    expect(pikachuImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const pikachuFavIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(pikachuFavIcon).toBeInTheDocument();
    expect(pikachuFavIcon).toHaveAttribute('src', '/star-icon.svg');

    // Charmander
    const charmanderName = screen.getByText('Charmander');
    expect(charmanderName).toBeInTheDocument();

    const charmanderType = screen.getByText('Fire');
    expect(charmanderType).toBeInTheDocument();

    const charmanderWeight = screen.getByText('Average weight: 8.5 kg');
    expect(charmanderWeight).toBeInTheDocument();

    const charmanderImg = screen.getByAltText('Charmander sprite');
    expect(charmanderImg).toBeInTheDocument();
    expect(charmanderImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');

    const charmanderFavIcon = screen.getByAltText('Charmander is marked as favorite');
    expect(charmanderFavIcon).toBeInTheDocument();
    expect(charmanderFavIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
