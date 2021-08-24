import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', {
    name: 'Home',
  });
  const aboutLink = screen.getByRole('link', {
    name: 'About',
  });
  const favoritePokeLink = screen.getByRole('link', {
    name: /favorite/i,
  });

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favoritePokeLink).toBeInTheDocument();
});

test('Teste se ao clicar em "Home" é redirecionado a pág inicial', () => {
  renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', {
    name: 'Home',
  });
  const aboutLink = screen.getByRole('link', {
    name: 'About',
  });
  const favoritePokeLink = screen.getByRole('link', {
    name: 'Favorite Pokémons',
  });

  userEvent.click(homeLink);

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favoritePokeLink).toBeInTheDocument();
});

test('Teste se ao clicar em "About" é redirecionado a pág about', () => {
  renderWithRouter(<App />);

  const aboutLink = screen.getByRole('link', {
    name: 'About',
  });

  userEvent.click(aboutLink);

  const textAbout = screen.getByRole('heading', {
    level: 2,
    value: 'About Pokédex',
  });

  expect(textAbout).toBeInTheDocument();
});

test('Teste se ao clicar em "Favorite Pokémons" é redirecionado a pág favorite', () => {
  renderWithRouter(<App />);

  const favoritePokeLink = screen.getByRole('link', {
    name: 'Favorite Pokémons',
  });

  userEvent.click(favoritePokeLink);

  const textFavorite = screen.getByRole('heading', {
    level: 2,
    value: 'Favorite pokémons',
  });

  expect(textFavorite).toBeInTheDocument();
});

test('Teste se ao clicar em "Favorite Pokémons" é redirecionado a pág favorite', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/rota-nao-existente');

  const textNotFound = screen.getByRole('heading', {
    level: 2,
    value: /not found/i,
  });

  expect(textNotFound).toBeInTheDocument();
});
