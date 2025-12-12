import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import Home from '../page';

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

function getScopedByHeading(headingText: string | RegExp) {
  const heading = screen.getByRole('heading', { name: headingText });
  const container = (heading.closest('section') ??
    heading.parentElement ??
    heading) as HTMLElement;
  return within(container);
}

describe('Home component', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = renderWithChakra(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });

  // NAVIGATION
  it('renders all navigation links', () => {
    renderWithChakra(<Home />);
    [
      'Home',
      'About',
      'Blog',
      'Shop',
      'Features',
      'Contacts',
      'Instant Quote',
    ].forEach((link) => {
      expect(screen.getAllByText(link)[0]).toBeInTheDocument();
    });
  });

  // HERO
  it('renders hero section with heading, text and buttons', () => {
    renderWithChakra(<Home />);

    const hero = getScopedByHeading(/A Unique Watch That Fits Your Style/i);
    expect(
      hero.getByRole('heading', {
        name: /A Unique Watch That Fits Your Style/i,
      }),
    ).toBeInTheDocument();
    expect(
      hero.getByText(/Lawson collection is already here/i),
    ).toBeInTheDocument();
    expect(
      hero.getByRole('button', { name: 'Learn More' }),
    ).toBeInTheDocument();
    expect(hero.getByRole('button', { name: 'View' })).toBeInTheDocument();
  });

  // SPLIT SECTIONS
  it("renders split section 'Ideal Has Never Been Closer'", () => {
    renderWithChakra(<Home />);
    const ideal = getScopedByHeading(/Ideal Has Never Been Closer/i);
    expect(
      ideal.getByRole('heading', { name: /Ideal Has Never Been Closer/i }),
    ).toBeInTheDocument();
    expect(
      ideal.getByRole('button', { name: 'Learn More' }),
    ).toBeInTheDocument();
  });

  it("renders split section 'Swiss Essence'", () => {
    renderWithChakra(<Home />);
    expect(
      screen.getByRole('heading', { name: /Swiss Essence/i }),
    ).toBeInTheDocument();
  });

  // BESTSELLERS
  it('renders bestseller products with correct titles and prices', () => {
    renderWithChakra(<Home />);
    expect(
      screen.getByText(/Gold chunky paperclip link chain/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Sterling silver criss cross ring/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Ear cuff with cubic zirconias/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Set of two gold stacking layering necklaces/i),
    ).toBeInTheDocument();
    // check discount
    expect(screen.getByText('-10%')).toBeInTheDocument();
  });

  it('renders bestseller action buttons', () => {
    renderWithChakra(<Home />);
    const bs = getScopedByHeading(/Our Bestsellers/i);
    expect(bs.getByRole('button', { name: 'Show all' })).toBeInTheDocument();
    expect(bs.getByRole('button', { name: 'View' })).toBeInTheDocument();
  });

  // JOURNAL
  it('renders journal section with posts', () => {
    renderWithChakra(<Home />);
    expect(
      screen.getByRole('heading', { name: /Journal & Blog/i }),
    ).toBeInTheDocument();
    const posts = screen.getAllByText(/What Are the Types of Watch Movements/i);
    expect(posts).toHaveLength(3);
    expect(
      screen.getByRole('button', { name: /Read more/i }),
    ).toBeInTheDocument();
  });

  // FOOTER
  it('renders footer with JWShop, links and email input', () => {
    renderWithChakra(<Home />);
    expect(screen.getAllByRole('heading', { name: 'JWShop' })).toHaveLength(2);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('renders footer copyright', () => {
    renderWithChakra(<Home />);
    expect(screen.getByText(/©2025 JWShop/i)).toBeInTheDocument();
  });

  // INTERACTIONS
  it('allows typing in the email input', async () => {
    renderWithChakra(<Home />);
    const input = screen.getByPlaceholderText('Email') as HTMLInputElement;
    await userEvent.type(input, 'test@example.com');
    expect(input.value).toBe('test@example.com');
  });

  it('clicks on CTA buttons', async () => {
    renderWithChakra(<Home />);
    const learnMoreBtn = screen.getAllByRole('button', {
      name: 'Learn More',
    })[0];
    const viewBtn = screen.getAllByRole('button', { name: 'View' })[0];
    await userEvent.click(learnMoreBtn);
    await userEvent.click(viewBtn);
    expect(learnMoreBtn).toBeEnabled();
    expect(viewBtn).toBeEnabled();
  });

  it('clicks on footer send button', async () => {
    renderWithChakra(<Home />);
    const sendBtn = screen.getByRole('button', { name: 'Send' });
    await userEvent.click(sendBtn);
    expect(sendBtn).toBeEnabled();
  });
});
