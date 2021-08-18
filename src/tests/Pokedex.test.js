import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  const nameId = 'pokemon-name';
  it('Teste se página contém um heading h2 com o texto', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    const have = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(have).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    const botao = screen.getByText(/Próximo pokémon/i);
    expect(botao).toBeInTheDocument();

    const nameArea = screen.getByTestId(nameId);
    expect(nameArea.textContent).toBe('Pikachu');

    userEvent.click(botao);

    expect(nameArea.textContent).toBe('Charmander');
    const max = 8;
    for (let index = 0; index < max; index += 1) {
      userEvent.click(botao);
    }

    expect(nameArea.textContent).toBe('Pikachu');
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    const pokemonsd = screen.getAllByTestId(nameId);
    expect(pokemonsd.length).toBe(1);
  });
});

describe('Teste se a Pokédex tem os botões de filtro', () => {
  const nameId = 'pokemon-name';
  it('Deve existir um botão de filtragem para cada', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    const all = screen.getByText(/ALL/i);
    const types = screen.getAllByTestId('pokemon-type-button');
    const number = 7;
    expect(all).toBeInTheDocument();
    expect(types.length).toBe(number);
  });
  it('A partir da seleção de um botão de tipo', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    const eletric = screen.getByRole('button', {
      name: 'Electric',
    });
    userEvent.click(eletric);

    const pikachu = screen.getByTestId(nameId);
    expect(pikachu.textContent).toBe('Pikachu');

    const fire = screen.getByText(/Fire/i);
    userEvent.click(fire);

    const charmander = screen.getByText(/Charmander/i);
    expect(charmander.textContent).toBe('Charmander');
  });

  it('O texto do botão deve corresponder ao nome do tipo', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    const pokeName = screen.getByTestId(nameId);
    expect(pokeName).toBeInTheDocument();
  });
});
