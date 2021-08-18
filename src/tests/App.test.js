import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import App from '../App';

describe('App test', () => {
  test('Navigation links', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const [link1, link2, link3] = screen.getAllByRole('link');

    expect(link1.textContent).toBe('Home');
    expect(link2.textContent).toBe('About');
    expect(link3.textContent).toBe('Favorite Pokémons');
  });

  test('Home Link', () => {
    let testLocation;
    render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
        <Route
          path="*"
          render={ ({ location }) => {
            testLocation = location;
            return null;
          } }
        />
      </MemoryRouter>,
    );

    const homeLink = screen.getByText('Home');

    homeLink.click();

    expect(testLocation.pathname).toBe('/');
  });

  test('About Link', () => {
    let testLocation;
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
        <Route
          path="*"
          render={ ({ location }) => {
            testLocation = location;
            return null;
          } }
        />
      </MemoryRouter>,
    );

    const aboutLink = screen.getByText('About');

    aboutLink.click();

    expect(testLocation.pathname).toBe('/about');
  });

  test('Favorites Link', () => {
    let testLocation;
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
        <Route
          path="*"
          render={ ({ location }) => {
            testLocation = location;
            return null;
          } }
        />
      </MemoryRouter>,
    );

    const favoritesLink = screen.getByText('Favorite Pokémons');

    favoritesLink.click();

    expect(testLocation.pathname).toBe('/favorites');
  });

  test('Not Found Page', () => {
    render(
      <MemoryRouter initialEntries={ ['/thispagedoesntexist'] }>
        <App />
      </MemoryRouter>,
    );

    const title = screen.getByText('Page requested not found');

    expect(title.textContent).toBe('Page requested not found 😭');
  });
});
