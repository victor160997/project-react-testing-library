import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste do topo', () => {
  it('Testando link Home', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const link = screen.getByText('Home');
    expect(link).toBeInTheDocument();
  });

  it('Testando link About', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const link = screen.getByText('About');
    expect(link).toBeInTheDocument();
  });

  it('Testando link Favorite Pokémons', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const link = screen.getByText('Favorite Pokémons');
    expect(link).toBeInTheDocument();
  });
});

describe('Teste de redirecionamento', () => {
  it('Testando se é redirecionado para /', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const link = screen.getByText('Home');

    userEvent.click(link);

    const have = screen.getByText('Encountered pokémons');
    expect(have).toBeInTheDocument();
  });
});

describe('Teste de redirecionamento About', () => {
  it('Testando se é redirecionado para About', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const link = screen.getByText('About');

    userEvent.click(link);

    const have = screen.getByText(/This application simulates a/i);
    expect(have).toBeInTheDocument();
  });
});

describe('Teste de redirecionamento Favoritos', () => {
  it('Testando se é redirecionado para Pokemons Favoritos', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const link = screen.getByText('Favorite Pokémons');
    userEvent.click(link);

    const have = screen.getByText('Favorite pokémons');
    expect(have).toBeInTheDocument();
  });
});

describe('Teste se a aplicação é redirecionada para a página Not Found', () => {
  it('Testando Not found', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('sfgsg');
    const have = screen.getByText(/not found/i);

    expect(have).toBeInTheDocument();
  });
});
