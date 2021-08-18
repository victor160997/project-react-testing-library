import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 1', () => {
  it('Se o app tem o link "Home" e redireciona para a "/"', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toEqual('/');
  });

  it('Se o app tem o link "About" e redireciona para a "/about"', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toEqual('/about');
  });

  it('Se o app tem o link "Favorite Pokémons" e redireciona para a "/favorites"', () => {
    const { history } = renderWithRouter(<App />);

    const favoritePokemonsLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(favoritePokemonsLink).toBeInTheDocument();

    userEvent.click(favoritePokemonsLink);
    const { pathname } = history.location;
    expect(pathname).toEqual('/favorites');
  });

  it('Se ao digitar um caminho que não existe ele executa o componente Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/nao-existe');
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });
    expect(notFound).toBeInTheDocument();
    expect(notFound).toHaveTextContent('Page requested not found 😭');
  });
});
