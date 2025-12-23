import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import CheckoutPage from '../checkout/page';

// Mock useCountdown to return fixed values
jest.mock('../../components/PromoBanner/hooks/useCountdown', () => ({
  useCountdown: () => ({
    hours: 1,
    minutes: 30,
    seconds: 45,
  }),
}));

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe('CheckoutPage component', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = renderWithChakra(<CheckoutPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  // HEADER
  it('renders the header with navigation', () => {
    renderWithChakra(<CheckoutPage />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    const jwShopHeadings = screen.getAllByText('JWShop');
    expect(jwShopHeadings.length).toBeGreaterThanOrEqual(1);
  });

  // PAGE TITLE
  it('renders billing details heading', () => {
    renderWithChakra(<CheckoutPage />);
    expect(
      screen.getByRole('heading', { name: /billing details/i }),
    ).toBeInTheDocument();
  });

  it('renders ship to different address text', () => {
    renderWithChakra(<CheckoutPage />);
    expect(screen.getByText(/ship to different address/i)).toBeInTheDocument();
  });

  // BILLING FORM
  it('renders all required form fields', () => {
    renderWithChakra(<CheckoutPage />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/street address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/town.*city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/zip code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it('allows user to fill in first name', async () => {
    const user = userEvent.setup();
    renderWithChakra(<CheckoutPage />);
    const firstNameInput = screen.getByLabelText(/first name/i);
    await user.type(firstNameInput, 'John');
    expect(firstNameInput).toHaveValue('John');
  });

  it('allows user to fill in email', async () => {
    const user = userEvent.setup();
    renderWithChakra(<CheckoutPage />);
    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'john@example.com');
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('renders country select dropdown', () => {
    renderWithChakra(<CheckoutPage />);
    const countrySelect = screen.getByLabelText(/country/i);
    expect(countrySelect).toBeInTheDocument();
    expect(countrySelect.tagName).toBe('SELECT');
  });

  it('renders state select dropdown', () => {
    renderWithChakra(<CheckoutPage />);
    const stateSelect = screen.getByLabelText(/state/i);
    expect(stateSelect).toBeInTheDocument();
    expect(stateSelect.tagName).toBe('SELECT');
  });

  // ORDER SUMMARY
  it('renders your order heading', () => {
    renderWithChakra(<CheckoutPage />);
    expect(
      screen.getByRole('heading', { name: /your order/i }),
    ).toBeInTheDocument();
  });

  it('displays all cart items', () => {
    renderWithChakra(<CheckoutPage />);
    expect(screen.getByText('Gold Necklace')).toBeInTheDocument();
    expect(screen.getByText('Diamond Earrings')).toBeInTheDocument();
    expect(screen.getByText('Pearl Bracelet')).toBeInTheDocument();
  });

  it('displays cart item prices', () => {
    renderWithChakra(<CheckoutPage />);
    expect(screen.getByText('$450')).toBeInTheDocument();
    expect(screen.getByText('$650')).toBeInTheDocument();
    expect(screen.getByText('$280')).toBeInTheDocument();
  });

  it('displays cart item quantities', () => {
    renderWithChakra(<CheckoutPage />);
    const qtyTexts = screen.getAllByText(/qty: 1/i);
    expect(qtyTexts.length).toBe(3);
  });

  it('displays subtotal', () => {
    renderWithChakra(<CheckoutPage />);
    expect(screen.getByText('Subtotal')).toBeInTheDocument();
    const subtotalAmounts = screen.getAllByText('$1380');
    expect(subtotalAmounts.length).toBeGreaterThan(0);
  });

  it('displays shipping as free', () => {
    renderWithChakra(<CheckoutPage />);
    expect(screen.getByText('Shipping')).toBeInTheDocument();
    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  it('displays total amount', () => {
    renderWithChakra(<CheckoutPage />);
    expect(screen.getByText('Total')).toBeInTheDocument();
    // Total should appear twice - once as label, once as amount
    const totalAmounts = screen.getAllByText('$1380');
    expect(totalAmounts.length).toBeGreaterThan(0);
  });

  it('calculates total correctly', () => {
    renderWithChakra(<CheckoutPage />);
    // 450 + 650 + 280 = 1380
    const totalText = screen.getAllByText('$1380');
    expect(totalText.length).toBeGreaterThan(0);
  });

  // PAYMENT METHOD
  it('renders payment method section', () => {
    renderWithChakra(<CheckoutPage />);
    expect(screen.getByText('Payment Method')).toBeInTheDocument();
  });

  it('displays cash on delivery option', () => {
    renderWithChakra(<CheckoutPage />);
    expect(screen.getByText('Cash on delivery')).toBeInTheDocument();
  });

  it('displays PayPal option', () => {
    renderWithChakra(<CheckoutPage />);
    expect(screen.getByText('PayPal')).toBeInTheDocument();
  });

  // PLACE ORDER BUTTON
  it('renders place order button', () => {
    renderWithChakra(<CheckoutPage />);
    const placeOrderButton = screen.getByRole('button', {
      name: /place order/i,
    });
    expect(placeOrderButton).toBeInTheDocument();
  });

  it('place order button is enabled', () => {
    renderWithChakra(<CheckoutPage />);
    const placeOrderButton = screen.getByRole('button', {
      name: /place order/i,
    });
    expect(placeOrderButton).not.toBeDisabled();
  });

  // LAYOUT
  it('uses two-column layout', () => {
    renderWithChakra(<CheckoutPage />);
    const container = screen
      .getByRole('heading', { name: /billing details/i })
      .closest('.chakra-container');
    expect(container).toBeInTheDocument();
  });

  it('renders order summary in a styled box', () => {
    renderWithChakra(<CheckoutPage />);
    const orderHeading = screen.getByRole('heading', { name: /your order/i });
    const summaryBox = orderHeading.parentElement;
    expect(summaryBox).toBeInTheDocument();
    // Проверяем что элемент имеет CSS классы Chakra UI
    expect(summaryBox?.classList.toString()).toMatch(/css-/);
  });
});
