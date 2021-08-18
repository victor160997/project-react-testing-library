import React from 'react';
import { render, screen } from '@testing-library/react';

import NotFound from '../components/NotFound';

describe('Requisito 4', () => {
  it('Verifica se existe um h2 com o texto "Page requested not found 😭"', () => {
    render(<NotFound />);

    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });
    expect(notFound).toBeInTheDocument();
    expect(notFound.textContent).toEqual('Page requested not found 😭');
  });

  it('Verifica se existe a img do not found', () => {
    render(<NotFound />);

    const img = screen.getByAltText(/Pikachu crying because the page/);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
