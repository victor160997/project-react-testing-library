import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

import * as services from '../services/pokedexService';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('favorites');

    const noFavorites = screen.getByText(/No favorite pokemon found/i);
    expect(noFavorites).toBeInTheDocument();
  });
});

describe('teste 2', () => {
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const id = 10;
    services.updateFavoritePokemons(id, true);

    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('favorites');

    const all = screen.getAllByTestId('pokemon-name');
    expect(all.length).toBe(1);
  });
});
