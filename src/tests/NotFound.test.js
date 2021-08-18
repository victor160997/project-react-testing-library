import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('', () => {
  test('Heading', () => {
    render(
      <NotFound />,
    );

    const heading = screen.getByRole('heading');

    expect(heading.textContent).toBe('Page requested not found 😭');
  });

  test('Image', () => {
    render(
      <NotFound />,
    );

    const img = screen.getAllByRole('img')[1];

    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
