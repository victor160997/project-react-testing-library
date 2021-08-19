import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import * as service from '../services/pokedexService';

const pokemonName = 'pokemon-name';
describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    // O nome e o tipo correto do Pokémon deve ser mostrado na tela
    const firstPokemon = screen.getByTestId(pokemonName);
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
    const secondPokemon = screen.getByTestId(pokemonName);
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

  it('Teste se o card do Pokémon indicado na Pokédex', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    const has = screen.getByRole('link', {
      name: /More details/i,
    });

    expect(has).toBeInTheDocument();

    const pokemonActive = screen.getByTestId(pokemonName);
    const activeId = pokemons.find((pok) => pok.name === pokemonActive.textContent);
    expect(has.href).toContain(activeId.id);
  });

  it('Teste se ao clicar no link de navegação do Pokémon', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    const name = screen.getByTestId(pokemonName);
    const linkPoke = screen.getByRole('link', {
      name: /More details/i,
    });

    userEvent.click(linkPoke);

    const titulo = screen.getByRole('heading', {
      level: 2,
      name: `${name.textContent} Details`,
    });

    expect(titulo).toBeInTheDocument();
  });

  it('Teste também se a URL exibida no navegador muda', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    const name = screen.getByTestId(pokemonName);
    const linkPoke = screen.getByRole('link', {
      name: /More details/i,
    });

    userEvent.click(linkPoke);

    const pokeId = pokemons.find((poke) => poke.name === name.textContent);
    const { entries } = customHistory;
    const caminhos = entries.map((cam) => cam.pathname);
    const atual = caminhos[caminhos.length - 1].split('/');
    expect(atual[atual.length - 1]).toContain(pokeId.id);
  });

  it('Teste se existe um ícone de estrela', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    const name = screen.getByTestId(pokemonName);
    const linkPoke = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(linkPoke);
    const pokeId = pokemons.find((poke) => poke.name === name.textContent);
    const favorites = service.readFavoritePokemonIds();
    if (favorites.includes(pokeId.id)) {
      const star = screen.getByAltText(`${pokeId.name} is marked as favorite`);
      expect(star).toBeInTheDocument();
      expect(star.src).toBe('/star-icon.svg');
    } else {
      const aparece = screen.queryByAltText(`${pokeId.name} is marked as favorite`);
      expect(aparece).toBeNull();
      const images = screen.queryAllByRole('img', {
        name: `${pokeId.name} is marked as favorite`,
      });
      expect(images).toEqual([]);
    }
  });
});
