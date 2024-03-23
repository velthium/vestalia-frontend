import { render } from '@testing-library/react';
import PageTitle from './PageTitle';
import React from 'react';

describe('PageTitle', () => {
  it('affiche correctement le titre', () => {
    const titleText = 'Titre de la page';
    const { getByText } = render(<PageTitle title={titleText} />);
    const titleElement = getByText(titleText);
    expect(titleElement).toBeInTheDocument();
  });
});
