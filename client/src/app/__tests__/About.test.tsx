import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import AboutPage from '../about/page';

// Mock useCountdown to return fixed values
jest.mock('../../components/PromoBanner/hooks/useCountdown', () => ({
  useCountdown: () => ({
    hours: 1,
    minutes: 30,
    seconds: 45,
  }),
}));

// The Header needs a mounted Next.js router and hits /api/users/me on mount;
// stub both so tests stay hermetic and default to a logged-out Header.
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('../../lib/auth', () => ({
  useCurrentUser: () => ({ isLoading: false, refresh: jest.fn(), user: null }),
}));

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe('AboutPage component', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = renderWithChakra(<AboutPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  // HEADER
  it('renders the header with navigation', () => {
    renderWithChakra(<AboutPage />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    const jwShopHeadings = screen.getAllByText('JWShop');
    expect(jwShopHeadings.length).toBeGreaterThanOrEqual(1);
  });

  // PAGE TITLE
  it('renders the page title and intro', () => {
    renderWithChakra(<AboutPage />);
    expect(
      screen.getByRole('heading', { name: /about jwshop/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/jewelry and watch shop built on one idea/i),
    ).toBeInTheDocument();
  });

  // STORY SECTION
  it('renders the our story section', () => {
    renderWithChakra(<AboutPage />);
    expect(
      screen.getByRole('heading', { name: /our story/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/started in 2010/i)).toBeInTheDocument();
  });

  // STATS SECTION
  it('renders shop stats', () => {
    renderWithChakra(<AboutPage />);
    expect(screen.getByText('15+')).toBeInTheDocument();
    expect(screen.getByText('Years of craftsmanship')).toBeInTheDocument();
    expect(screen.getByText('50k+')).toBeInTheDocument();
    expect(screen.getByText('Happy customers')).toBeInTheDocument();
    expect(screen.getByText('30+')).toBeInTheDocument();
    expect(screen.getByText('200k+')).toBeInTheDocument();
  });

  // VALUES SECTION
  it('renders all four company values', () => {
    renderWithChakra(<AboutPage />);
    expect(
      screen.getByRole('heading', { name: /what we stand for/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/uncompromising craftsmanship/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/honest, traceable materials/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/timeless design/i)).toBeInTheDocument();
    expect(screen.getByText(/care after the purchase/i)).toBeInTheDocument();
  });

  // CTA SECTION
  it('renders a call-to-action link to the shop', () => {
    renderWithChakra(<AboutPage />);
    const shopLink = screen.getByRole('link', { name: /shop now/i });
    expect(shopLink).toBeInTheDocument();
    expect(shopLink).toHaveAttribute('href', '/shop');
  });

  // FOOTER
  it('renders the footer', () => {
    renderWithChakra(<AboutPage />);
    expect(
      screen.getByText(/© 2025 JWShop. All rights reserved./i),
    ).toBeInTheDocument();
  });

  it('footer About link points to /about', () => {
    // The desktop nav is `display: { base: 'none', md: 'flex' }`, which
    // jsdom always resolves to the `base` value (no real viewport/media
    // queries), so these links are invisible to role-based queries here.
    // Querying the DOM directly checks the href wiring regardless of that.
    const { container } = renderWithChakra(<AboutPage />);
    const aboutAnchors = Array.from(
      container.querySelectorAll<HTMLAnchorElement>('a[href="/about"]'),
    );
    expect(aboutAnchors.length).toBeGreaterThan(0);
    aboutAnchors.forEach((anchor) => {
      expect(anchor.textContent).toMatch(/about/i);
    });
  });
});
