import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('dhdfh');
    const have = screen.getByText(/Page requested not found/i);
    expect(have).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('dhdfh');

    const have = screen.getByAltText(/Pikachu crying/i);
    expect(have.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
