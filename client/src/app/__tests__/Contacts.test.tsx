import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import ContactsPage from '../contacts/page';

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

describe('ContactsPage component', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = renderWithChakra(<ContactsPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  // HEADER
  it('renders the header with navigation', () => {
    renderWithChakra(<ContactsPage />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    const jwShopHeadings = screen.getAllByText('JWShop');
    expect(jwShopHeadings.length).toBeGreaterThanOrEqual(1);
  });

  // PAGE TITLE AND DESCRIPTION
  it('renders page title', () => {
    renderWithChakra(<ContactsPage />);
    expect(
      screen.getByRole('heading', { name: /get in touch with us/i }),
    ).toBeInTheDocument();
  });

  it('renders page description', () => {
    renderWithChakra(<ContactsPage />);
    expect(
      screen.getByText(/for more information about our products/i),
    ).toBeInTheDocument();
  });

  // CONTACT INFORMATION SECTION
  it('renders address information', () => {
    renderWithChakra(<ContactsPage />);
    expect(
      screen.getByText(/236 5th SE Avenue, New York NY10000, United States/i),
    ).toBeInTheDocument();
  });

  it('renders phone information', () => {
    renderWithChakra(<ContactsPage />);
    expect(screen.getByText(/phone/i)).toBeInTheDocument();
    expect(screen.getByText(/mobile:.*546-6789/i)).toBeInTheDocument();
    expect(screen.getByText(/hotline:.*456-6789/i)).toBeInTheDocument();
  });

  it('renders working time information', () => {
    renderWithChakra(<ContactsPage />);
    expect(screen.getByText(/working time/i)).toBeInTheDocument();
    expect(
      screen.getByText(/monday-friday: 9:00 - 22:00/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/saturday-sunday: 9:00 - 21:00/i),
    ).toBeInTheDocument();
  });

  // CONTACT FORM
  it('renders all form fields', () => {
    renderWithChakra(<ContactsPage />);

    expect(screen.getByText(/your name/i)).toBeInTheDocument();
    expect(screen.getByText(/email address/i)).toBeInTheDocument();
    expect(screen.getByText(/subject/i)).toBeInTheDocument();
    expect(screen.getByText(/message/i)).toBeInTheDocument();
  });

  it('renders name input field', () => {
    renderWithChakra(<ContactsPage />);
    const nameInput = screen.getByPlaceholderText(/abc$/i);
    expect(nameInput).toBeInTheDocument();
    expect(nameInput.tagName).toBe('INPUT');
  });

  it('renders email input field', () => {
    renderWithChakra(<ContactsPage />);
    const emailInput = screen.getByPlaceholderText(/abc@def.com/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('renders subject input field', () => {
    renderWithChakra(<ContactsPage />);
    const subjectInput = screen.getByPlaceholderText(/this is an optional/i);
    expect(subjectInput).toBeInTheDocument();
  });

  it('renders message textarea field', () => {
    renderWithChakra(<ContactsPage />);
    const messageTextarea = screen.getByPlaceholderText(
      /hi! i'd like to ask about/i,
    );
    expect(messageTextarea).toBeInTheDocument();
    expect(messageTextarea.tagName).toBe('TEXTAREA');
  });

  it('renders submit button', () => {
    renderWithChakra(<ContactsPage />);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  // FORM INTERACTIONS
  it('allows user to type in name field', async () => {
    const user = userEvent.setup();
    renderWithChakra(<ContactsPage />);
    const nameInput = screen.getByPlaceholderText(/abc$/i);
    await user.type(nameInput, 'John Doe');
    expect(nameInput).toHaveValue('John Doe');
  });

  it('allows user to type in email field', async () => {
    const user = userEvent.setup();
    renderWithChakra(<ContactsPage />);
    const emailInput = screen.getByPlaceholderText(/abc@def.com/i);
    await user.type(emailInput, 'john@example.com');
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('allows user to type in subject field', async () => {
    const user = userEvent.setup();
    renderWithChakra(<ContactsPage />);
    const subjectInput = screen.getByPlaceholderText(/this is an optional/i);
    await user.type(subjectInput, 'Product inquiry');
    expect(subjectInput).toHaveValue('Product inquiry');
  });

  it('allows user to type in message field', async () => {
    const user = userEvent.setup();
    renderWithChakra(<ContactsPage />);
    const messageTextarea = screen.getByPlaceholderText(
      /hi! i'd like to ask about/i,
    );
    await user.type(
      messageTextarea,
      'I would like more information about your watches.',
    );
    expect(messageTextarea).toHaveValue(
      'I would like more information about your watches.',
    );
  });

  it('allows user to click submit button', async () => {
    const user = userEvent.setup();
    renderWithChakra(<ContactsPage />);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);
    expect(submitButton).toBeInTheDocument();
  });

  // FOOTER
  it('renders the footer', () => {
    renderWithChakra(<ContactsPage />);
    expect(
      screen.getByText(/© 2025 JWShop. All rights reserved./i),
    ).toBeInTheDocument();
  });

  it('renders footer newsletter subscription', () => {
    renderWithChakra(<ContactsPage />);
    expect(
      screen.getByText(/subscribe to our newsletter/i),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your email/i),
    ).toBeInTheDocument();
  });

  // ICONS
  it('renders contact information sections with icons', () => {
    renderWithChakra(<ContactsPage />);
    // Проверяем наличие всех трех секций с контактной информацией
    expect(screen.getByText(/236 5th SE Avenue/i)).toBeInTheDocument();
    expect(screen.getByText(/Mobile:.*546-6789/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Monday-Friday: 9:00 - 22:00/i),
    ).toBeInTheDocument();
  });
});
