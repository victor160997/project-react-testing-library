import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

const nameId = 'pokemon-name';
const typeId = 'pokemon-type';
const weightId = 'pokemon-weight';

describe('', () => {
  test('Card', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <Pokemon
          pokemon={ pokemons[0] }
          isFavorite
        />
      </MemoryRouter>,
    );
    const name = screen.getByTestId(nameId).textContent;
    const type = screen.getByTestId(typeId).textContent;
    const weight = screen.getByTestId(weightId).textContent;

    const { averageWeight } = pokemons[0];
    const { value, measurementUnit } = averageWeight;

    expect(name).toBe(pokemons[0].name);
    expect(type).toBe(pokemons[0].type);
    expect(weight).toBe(`Average weight: ${value} ${measurementUnit}`);

    const img = screen.getByAltText(`${name} sprite`);

    expect(img.src).toBe(pokemons[0].image);
  });

  test('Nav Link Click', () => {
    cleanup();
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const link = screen.getByText('More details');
    const name = screen.getByTestId(nameId).textContent;

    link.click();

    const heading = screen.getByText(`${name} Details`);

    expect(heading.textContent).toBe(`${name} Details`);
  });

  test('Nav Link', () => {
    cleanup();
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <Pokemon
          pokemon={ pokemons[0] }
          isFavorite
        />
      </MemoryRouter>,
    );
    const link = screen.getByRole('link').href;
    const name = screen.getByTestId(nameId).textContent;
    const { id } = pokemons.find((el) => el.name === name);
    const paramsIndex = 16;

    expect(link.slice(paramsIndex)).toBe(`/pokemons/${id}`);
  });

  test('Nav Link Click Redirect', () => {
    cleanup();
    let testLocation;
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <Pokemon
          pokemon={ pokemons[0] }
          isFavorite
        />
        <Route
          path="*"
          render={ ({ location }) => {
            testLocation = location;
            return null;
          } }
        />
      </MemoryRouter>,
    );

    const link = screen.getByRole('link');
    const name = screen.getByTestId(nameId).textContent;
    const { id } = pokemons.find((el) => el.name === name);

    link.click();

    expect(testLocation.pathname).toBe(`/pokemons/${id}`);
  });

  test('Favorite', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <Pokemon
          pokemon={ pokemons[0] }
          isFavorite
        />
      </MemoryRouter>,
    );

    const name = screen.getByTestId(nameId).textContent;
    const img = screen.getAllByRole('img')[1];
    const paramsIndex = 16;

    if (img.src.length === 0) fail();

    expect(img.alt).toBe(`${name} is marked as favorite`);
    expect(img.src.slice(paramsIndex)).toBe('/star-icon.svg');
  });
});
