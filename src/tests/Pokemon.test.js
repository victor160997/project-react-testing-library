import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 6', () => {
  it('', () => {
    const { history } = renderWithRouter(<App />);

    const pikachuName = screen.getByTestId('pokemon-name');
    expect(pikachuName).toBeInTheDocument();
    expect(pikachuName).toHaveTextContent('Pikachu');

    const pikachuType = screen.getByTestId('pokemon-type');
    expect(pikachuType).toBeInTheDocument();
    expect(pikachuType).toHaveTextContent('Electric');

    const pikachuWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pikachuWeight).toBeInTheDocument();

    const pikachuImg = screen.getByAltText('Pikachu sprite');
    expect(pikachuImg).toBeInTheDocument();
    expect(pikachuImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const moreDetails = screen.getByRole('link', {
      name: 'More details',
    });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toEqual('/pokemons/25');

    const selectFav = screen.getByRole('checkbox');
    expect(selectFav).toBeInTheDocument();
    userEvent.click(selectFav);

    const pikachuFavIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(pikachuFavIcon).toBeInTheDocument();
  });
});
