import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Testando o About', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('about');
    const have = screen.getByText(/This application simulates a Pokédex/i);
    expect(have).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('about');
    const have = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(have).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('about');
    const numberOfParagraphs = 3;

    const p1 = screen.getAllByText(/Pokémons/);
    expect(p1.length).toBe(numberOfParagraphs);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('about');
    const have = screen.getByAltText('Pokédex');
    expect(have.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
