import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 7', () => {
  it('Testa se as informações detalhadas são renderizadas como deviam', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: 'More details',
    });
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toEqual('/pokemons/25');

    const titleDetails = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(titleDetails).toBeInTheDocument();

    expect(moreDetails).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summary).toBeInTheDocument();

    const pSummary = screen.getByText(/This intelligent Pokémon/i);
    expect(pSummary).toBeInTheDocument();

    const gameLocations = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(gameLocations).toBeInTheDocument();

    const allMaps = screen.getAllByAltText('Pikachu location');
    expect(allMaps.length).toEqual(2);
    expect(allMaps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(allMaps[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const pMap1 = screen.getByText('Kanto Viridian Forest');
    expect(pMap1).toBeInTheDocument();

    const pMap2 = screen.getByText('Kanto Power Plant');
    expect(pMap2).toBeInTheDocument();

    const favCheckbox = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    expect(favCheckbox).toBeInTheDocument();

    userEvent.click(favCheckbox);
    const FavIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(FavIcon).toBeInTheDocument();
    expect(FavIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
