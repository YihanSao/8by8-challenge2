import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { useEffect } from 'react';
import userEvent from '@testing-library/user-event';
import { useContextSafely } from '@/hooks/use-context-safely';
import {
  HamburgerMenuState,
  HeaderContext,
  HeaderContextProvider,
} from '@/components/header/header-context';

describe('HeaderContextProvider', () => {
  afterEach(cleanup);

  it('orchestrates opening and closing the hamburger menu', async () => {
    const user = userEvent.setup();
    render(
      <HeaderContextProvider>
        <MockChildComponent />
      </HeaderContextProvider>,
    );
    const openMenuText = 'Open Menu';
    const closeMenuText = 'Close Menu';
    const openHamburgerMenuBtn = screen.getByText(openMenuText);
    expect(screen.queryByText(closeMenuText)).not.toBeInTheDocument();
    await user.click(openHamburgerMenuBtn);
    await waitFor(() =>
      expect(screen.queryByText(closeMenuText)).toBeInTheDocument(),
    );
    const closeHamburgerMenuBtn = screen.getByText(closeMenuText);
    await user.click(closeHamburgerMenuBtn);
    await waitFor(() =>
      expect(screen.queryByText(openMenuText)).toBeInTheDocument(),
    );
    expect(screen.queryByText(closeMenuText)).not.toBeInTheDocument();
  });

  it('orchestrates opening and closing the signout menu', async () => {
    const user = userEvent.setup();
    render(
      <HeaderContextProvider>
        <MockChildComponent />
      </HeaderContextProvider>,
    );
    const openModalText = 'Open Signout Modal';
    const closeModalText = 'Close Signout Modal';
    const openModalBtn = screen.getByText(openModalText);
    expect(screen.queryByText(closeModalText)).not.toBeInTheDocument();
    await user.click(openModalBtn);
    await waitFor(() =>
      expect(screen.queryByText(closeModalText)).toBeInTheDocument(),
    );
    const closeModalBtn = screen.getByText(closeModalText);
    await user.click(closeModalBtn);
    await waitFor(() =>
      expect(screen.queryByText(openModalText)).toBeInTheDocument(),
    );
    expect(screen.queryByText(closeModalText)).not.toBeInTheDocument();
  });
});

function MockChildComponent() {
  const {
    hamburgerMenuState,
    hamburgerMenuRef,
    openHamburgerMenuBtnRef,
    closeHamburgerMenuBtnRef,
    openHamburgerMenu,
    closeHamburgerMenu,
    isSignoutModalShown,
    openSignoutModal,
    closeSignoutModal,
  } = useContextSafely(HeaderContext, 'MockChildComponent');

  useEffect(() => {
    if (
      (hamburgerMenuState === HamburgerMenuState.opening ||
        hamburgerMenuState === HamburgerMenuState.closing) &&
      hamburgerMenuRef.current
    ) {
      fireEvent.animationEnd(hamburgerMenuRef.current, {});
    }
  }, [hamburgerMenuState, hamburgerMenuRef]);

  return (
    <nav ref={hamburgerMenuRef}>
      {hamburgerMenuState === HamburgerMenuState.closed && (
        <button ref={openHamburgerMenuBtnRef} onClick={openHamburgerMenu}>
          Open Menu
        </button>
      )}
      {hamburgerMenuState === HamburgerMenuState.open && (
        <button ref={closeHamburgerMenuBtnRef} onClick={closeHamburgerMenu}>
          Close Menu
        </button>
      )}
      {!isSignoutModalShown ?
        <button onClick={openSignoutModal}>Open Signout Modal</button>
      : <button onClick={closeSignoutModal}>Close Signout Modal</button>}
    </nav>
  );
}
