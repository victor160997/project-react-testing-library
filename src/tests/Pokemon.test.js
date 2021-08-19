import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    // O nome e o tipo correto do Pokémon deve ser mostrado na tela
    const firstPokemon = screen.getByTestId('pokemon-name');
    const firstPokemonType = screen.getByTestId('pokemon-type');
    expect(firstPokemon.textContent).toBe('Pikachu');
    expect(firstPokemonType.textContent).toBe('Electric');

    // O peso médio do pokémon deve ser exibido
    const firstWeight = pokemons.find(
      (poke) => poke.name === firstPokemon.textContent,
    );
    const { averageWeight } = firstWeight;
    const inf = `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`;
    const have = screen.getByText(inf);
    expect(have).toBeInTheDocument();
    expect(firstWeight.averageWeight.value).toBe('6.0');

    // A imagem do Pokémon deve ser exibida
    const imageFirst = screen.getByAltText(`${firstWeight.name} sprite`);
    expect(imageFirst.src).toBe(firstWeight.image);

    // testing caterpie
    const botao = screen.getByText('Bug');
    userEvent.click(botao);

    // O nome e o tipo correto do Pokémon deve ser mostrado na tela
    const secondPokemon = screen.getByTestId('pokemon-name');
    const secondPokemonType = screen.getByTestId('pokemon-type');
    expect(secondPokemon.textContent).toBe('Caterpie');
    expect(secondPokemonType.textContent).toBe('Bug');

    // O peso médio do pokémon deve ser exibido
    const secondPokemonWeight = pokemons.find(
      (poke) => poke.name === firstPokemon.textContent,
    );
    const { averageWeight: weight } = secondPokemonWeight;
    const sinf = `Average weight: ${weight.value} ${weight.measurementUnit}`;
    const haveSecond = screen.getByText(sinf);
    expect(haveSecond).toBeInTheDocument();
    expect(secondPokemonWeight.averageWeight.value).toBe('2.9');

    // A imagem do Pokémon deve ser exibida
    const image = screen.getByAltText(`${secondPokemonWeight.name} sprite`);
    expect(image.src).toBe(secondPokemonWeight.image);
  });
});
