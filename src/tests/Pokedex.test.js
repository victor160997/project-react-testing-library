import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  renderWithRouter(<App />);

  const encounteredText = screen.getByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  });

  expect(encounteredText).toBeInTheDocument();
});

test('Teste se é exibido o próximo Pokémon quando o botão Próximo é clicado', () => {
  renderWithRouter(<App />);

  const nextButton = screen.getByRole('button', {
    name: 'Próximo pokémon',
  });

  expect(nextButton).toBeInTheDocument();

  const buttonAll = screen.getByRole('button', {
    name: 'All',
  });

  expect(buttonAll).toBeInTheDocument();
  userEvent.click(buttonAll);

  pokemons.forEach((poke, i) => {
    if (i === pokemons.length - 1) {
      userEvent.click(nextButton);
      const nextPokeInArray = pokemons[0].name;
      const nextPoke = screen.getByText(nextPokeInArray);
      expect(nextPoke).toBeInTheDocument();
    } else {
      userEvent.click(nextButton);
      const nextPokeInArray = pokemons[i + 1].name;
      const nextPoke = screen.getByText(nextPokeInArray);
      expect(nextPoke).toBeInTheDocument();
    }
  });
});

test('Teste se é mostrado apenas um Pokémon por vez', () => {
  renderWithRouter(<App />);

  const pokeImage = screen.getAllByRole('img');

  expect(pokeImage.length).toBe(1);
});

test('Teste se a Pokédex tem os botões de filtro', () => {
  renderWithRouter(<App />);

  const buttonAll = screen.getByRole('button', {
    name: 'All',
  });

  expect(buttonAll).toBeInTheDocument();

  const arrayTypeButtons = screen.getAllByTestId('pokemon-type-button');
  const tamArrayButtons = 7;

  expect(arrayTypeButtons.length).toBe(tamArrayButtons);

  arrayTypeButtons.forEach((type) => {
    const button = screen.getByRole('button', {
      name: type.innerHTML,
    });
    userEvent.click(button);

    const pokeType = screen.getByTestId('pokemon-type');

    expect(pokeType).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();
  });
});
