import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('About Component', () => {
  test('Info', () => {
    render(
      <About />,
    );

    screen.getByRole('heading');
    screen.getByText(/application/);
    screen.getByText(/details/);
  });

  test('Heading', () => {
    render(
      <About />,
    );

    const heading = screen.getByRole('heading');

    expect(heading.textContent).toBe('About Pokédex');
  });

  test('Texts', () => {
    render(
      <About />,
    );

    const info1 = screen.getByText(/application/);
    const info2 = screen.getByText(/details/);

    expect(info1.textContent).toMatch(/application/);
    expect(info2.textContent).toMatch(/details/);
  });

  test('Image', () => {
    render(
      <About />,
    );

    const img = screen.getByRole('img');

    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
