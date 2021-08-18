import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('About Component', () => {
  test('Heading', () => {
    render(
      <About />,
    );

    const heading = screen.getByRole('heading');

    expect(heading.textContent).toBe('About Pokédex');
  });

  test('Pokedex info', () => {
    render(
      <About />,
    );

    const infoArr = screen.getAllByTestId('about-info');

    expect(infoArr.length).toBe(2);
  });

  test('Image', () => {
    render(
      <About />,
    );

    const img = screen.getByRole('img');

    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
