import React from 'react';
import { renderX, screen, fireEvent } from '../../../Tests/TestUtils';
import { auth } from '../../../Firebase/firebase.utils';

import NavMenu from '../NavMenu';

const { getByText, getByRole } = screen;

describe('Tests for Component: NavMenu', () => {
  test('renders correctly', () => {
    const { asFragment } = renderX(<NavMenu />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('ensure correct links', () => {
    renderX(<NavMenu />);

    // movies
    const moviesLink = getByRole('link', { name: /Movies/i }).closest('a');
    expect(moviesLink).toHaveAttribute('href', '/movies');

    // TV shows
    const tvShowsLink = getByRole('link', { name: /TV Shows/i }).closest('a');
    expect(tvShowsLink).toHaveAttribute('href', '/tvshows');

    // My List
    const myListLink = getByRole('link', { name: /My List/i }).closest('a');
    expect(myListLink).toHaveAttribute('href', '/mylist');
  });

  test('ensure NavBar status for guest user', () => {
    renderX(<NavMenu />);
    expect(getByText(/Hi, Guest/i)).toBeInTheDocument();

    const signInLink = getByRole('link', { name: /Sign In/i }).closest('a');
    expect(signInLink).toHaveAttribute('href', '/signin');
  });

  test('ensure NavBar status for logged in user', () => {
    const userName = 'Abdul';
    const appState = { user: { currentUser: { displayName: userName } } };
    renderX(<NavMenu />, appState);
    expect(getByText(`Hi, ${userName}`)).toBeInTheDocument();
    expect(getByText(/Sign Out/i)).toBeInTheDocument();
  });

  test('ensure logout event handler', () => {
    const userName = 'Abdul';
    const appState = { user: { currentUser: { displayName: userName } } };
    renderX(<NavMenu />, appState);
    fireEvent.click(getByText(/Sign out/i));
    expect(auth.signOut).toBeCalled();
  });
});
