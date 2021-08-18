import React from 'react';
import { render, screen } from '@testing-library/react';

import About from '../components/About';

describe('Requisito 2', () => {
  it('Se a página contém um h2 com "About Pokédex"', () => {
    render(<About />);

    const about = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(about).toBeInTheDocument();
  });

  it('Se a página contém dois parágrafos com o texto sobre a Pokédex', () => {
    render(<About />);

    const p1 = screen.getByText(/This application simulates a Pokédex/);
    expect(p1).toBeInTheDocument();

    const p2 = screen.getByText(/One can filter Pokémons by type/);
    expect(p2).toBeInTheDocument();
  });

  it('Se a página contém um imagem', () => {
    render(<About />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(img).toHaveAttribute('alt', 'Pokédex');
    expect(img).toBeInTheDocument();
  });
});
