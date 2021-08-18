import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 5', () => {
  it('Verifica se existe um H2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent('Encountered pokémons');
  });

  const name1 = 'Verifica se ao clicar no botão próximo pokémon ele é renderizado';
  const name2 = 'e se ao chegar no final da lista ele volta para o inicial';

  it(`${name1} ${name2}`, () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextPokemon).toBeInTheDocument();

    userEvent.click(nextPokemon);
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();

    const numberOfClicks = 7;
    for (let i = 0; i < numberOfClicks; i += 1) {
      userEvent.click(nextPokemon);
    }
    const dragonair = screen.getByText('Dragonair');
    expect(dragonair).toBeInTheDocument();

    userEvent.click(nextPokemon);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });

  it('Verifica se só existe 1 pokémon na tela', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();

    const nextPokemon = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(nextPokemon);
    expect(pokemonName.textContent).not.toEqual('Pikachu');
  });

  it('Testa se existem botões de filtros e suas funcionalidades', () => {
    renderWithRouter(<App />);

    const numberOfButtons = 7;
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons.length).toEqual(numberOfButtons);

    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();

    const fireType = screen.getByRole('button', {
      name: 'Fire',
    });
    expect(fireType).toBeInTheDocument();
    userEvent.click(fireType);
    expect(pokemonName).toHaveTextContent('Charmander');

    const allType = screen.getByRole('button', {
      name: 'All',
    });
    expect(allType).toBeInTheDocument();
    userEvent.click(allType);
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
});
