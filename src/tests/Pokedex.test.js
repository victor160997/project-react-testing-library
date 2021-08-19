import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

function isPokemonFavoriteById() {
  const favoritePokemonIds = readFavoritePokemonIds();
  const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
    acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
    return acc;
  }, {});

  return isPokemonFavorite;
}

const id = 'pokemon-name';
const nextId = 'next-pokemon';

describe('Pokedex', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />
      </MemoryRouter>,
    );
  });

  test('Heading', () => {
    const heading = screen.getByRole('heading');

    expect(heading.textContent).toBe('Encountered pokémons');
  });

  test('Next Pokemon Button', () => {
    const btnNext = screen.getByTestId(nextId);
    let curPokemonName;

    pokemons.forEach((pokemon) => {
      curPokemonName = screen.getByTestId(id).textContent;
      expect(curPokemonName).toBe(pokemon.name);
      btnNext.click();
    });

    curPokemonName = screen.getByTestId(id).textContent;

    expect(curPokemonName).toBe(pokemons[0].name);
    expect(btnNext.textContent).toBe('Próximo pokémon');
  });

  test('One at time', () => {
    const btnNext = screen.getByTestId(nextId);
    let curPokemonName;

    pokemons.forEach(() => {
      curPokemonName = screen.getAllByTestId(id);
      expect(curPokemonName.length).toBe(1);
      btnNext.click();
    });

    curPokemonName = screen.getAllByTestId(id);

    expect(curPokemonName.length).toBe(1);
  });

  test('Type Filter', () => {
    const typeArr = [];

    pokemons.forEach((pokemon) => {
      if (typeArr.length < 1) return typeArr.push(pokemon.type);

      if (!(typeArr.some((el) => el === pokemon.type))) {
        typeArr.push(pokemon.type);
      }
    });

    const btnFilterList = screen.getAllByTestId('pokemon-type-button');

    expect(btnFilterList.length).toBe(typeArr.length);

    //
    btnFilterList[0].click();
    const selectedType = btnFilterList[0].textContent;
    const btnNext = screen.getByTestId(nextId);

    const filteredByType = pokemons.filter((el) => (
      el.type === btnFilterList[0].textContent
    ));

    filteredByType.forEach(() => {
      const curPokemonType = screen.getByTestId('pokemon-type').textContent;
      expect(curPokemonType).toBe(selectedType);
      btnNext.click();
    });

    const btnAll = screen.getByText('All');

    expect(btnAll).toBeVisible();
  });

  test('', () => {
    const btnAll = screen.getByText('All');
    const btnNext = screen.getByTestId(nextId);
    const listArr = [];

    pokemons.forEach((el) => {
      const curPokeName = screen.getByTestId(id).textContent;
      if (listArr.length === 0) return listArr.push(curPokeName);
      if (!(listArr.some((el2) => el2.name === curPokeName))) {
        listArr.push(curPokeName);
      }
      btnNext.click();
      return el.name;
    });

    expect(listArr.length).toBe(pokemons.length);

    btnAll.click();

    const clickArr = [];

    pokemons.forEach((el) => {
      const curPokeName = screen.getByTestId(id).textContent;
      if (clickArr.length === 0) return clickArr.push(curPokeName);
      if (!(clickArr.some((el2) => el2.name === curPokeName))) {
        clickArr.push(curPokeName);
      }
      btnNext.click();
      return el.name;
    });

    expect(clickArr.length).toBe(pokemons.length);
  });
});
