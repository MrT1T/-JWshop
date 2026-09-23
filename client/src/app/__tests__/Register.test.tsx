import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import { ApiError, registerUser } from '@/lib/api';
import RegisterPage from '../register/page';

// Mock useCountdown to return fixed values
jest.mock('../../components/PromoBanner/hooks/useCountdown', () => ({
  useCountdown: () => ({
    hours: 1,
    minutes: 30,
    seconds: 45,
  }),
}));

// Mock the API client so tests never hit a real network/server
jest.mock('../../lib/api', () => {
  const actual = jest.requireActual('../../lib/api');
  return {
    ...actual,
    registerUser: jest.fn(),
  };
});

const mockedRegisterUser = registerUser as jest.MockedFunction<
  typeof registerUser
>;

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

const REGISTERED_USER = {
  createdAt: '2026-01-01T00:00:00.000Z',
  email: 'jane@example.com',
  id: 'user-1',
  name: 'Jane Doe',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

beforeEach(() => {
  mockedRegisterUser.mockReset();
});

const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText('Full name'), 'Jane Doe');
  await user.type(screen.getByLabelText('Email address'), 'jane@example.com');
  await user.type(screen.getByLabelText('Password'), 'Str0ng!Pass');
  await user.type(screen.getByLabelText('Confirm password'), 'Str0ng!Pass');
  await user.click(
    screen.getByRole('checkbox', { name: /i agree to the terms of service/i }),
  );
};

describe('RegisterPage component', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = renderWithChakra(<RegisterPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  // HEADER
  it('renders the header with navigation', () => {
    renderWithChakra(<RegisterPage />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    const jwShopHeadings = screen.getAllByText('JWShop');
    expect(jwShopHeadings.length).toBeGreaterThanOrEqual(1);
  });

  // PAGE TITLE
  it('renders page title and subtitle', () => {
    renderWithChakra(<RegisterPage />);
    expect(
      screen.getByRole('heading', { name: /create your account/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/join jwshop for early access/i),
    ).toBeInTheDocument();
  });

  // FORM FIELDS
  it('renders all required form fields', () => {
    renderWithChakra(<RegisterPage />);
    expect(screen.getByLabelText('Full name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', {
        name: /i agree to the terms of service/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    renderWithChakra(<RegisterPage />);
    expect(
      screen.getByRole('button', { name: /create account/i }),
    ).toBeInTheDocument();
  });

  it('password and confirm password fields are masked by default', () => {
    renderWithChakra(<RegisterPage />);
    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'type',
      'password',
    );
    expect(screen.getByLabelText('Confirm password')).toHaveAttribute(
      'type',
      'password',
    );
  });

  // FORM INTERACTIONS
  it('allows user to type in the full name field', async () => {
    const user = userEvent.setup();
    renderWithChakra(<RegisterPage />);
    const nameInput = screen.getByLabelText('Full name');
    await user.type(nameInput, 'Jane Doe');
    expect(nameInput).toHaveValue('Jane Doe');
  });

  it('allows user to type in the email field', async () => {
    const user = userEvent.setup();
    renderWithChakra(<RegisterPage />);
    const emailInput = screen.getByLabelText('Email address');
    await user.type(emailInput, 'jane@example.com');
    expect(emailInput).toHaveValue('jane@example.com');
  });

  it('toggles password visibility when clicking the show/hide icon', async () => {
    const user = userEvent.setup();
    renderWithChakra(<RegisterPage />);
    const passwordInput = screen.getByLabelText('Password');
    const passwordField = passwordInput.closest(
      '.chakra-form-control',
    ) as HTMLElement;
    const toggleButton = within(passwordField).getByRole('button', {
      name: /show password/i,
    });

    expect(passwordInput).toHaveAttribute('type', 'password');
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    expect(
      screen.getByRole('button', { name: /hide password/i }),
    ).toBeInTheDocument();
  });

  // VALIDATION
  it('shows an error when the name is left empty on blur', async () => {
    const user = userEvent.setup();
    renderWithChakra(<RegisterPage />);
    const nameInput = screen.getByLabelText('Full name');
    await user.click(nameInput);
    await user.tab();
    expect(
      await screen.findByText(/please enter your full name/i),
    ).toBeInTheDocument();
  });

  it('shows an error for an invalid email on blur', async () => {
    const user = userEvent.setup();
    renderWithChakra(<RegisterPage />);
    const emailInput = screen.getByLabelText('Email address');
    await user.type(emailInput, 'not-an-email');
    await user.tab();
    expect(
      await screen.findByText(/please enter a valid email address/i),
    ).toBeInTheDocument();
  });

  it('shows an error when passwords do not match', async () => {
    const user = userEvent.setup();
    renderWithChakra(<RegisterPage />);
    await user.type(screen.getByLabelText('Password'), 'Str0ng!Pass');
    await user.type(screen.getByLabelText('Confirm password'), 'Different1!');
    await user.tab();
    expect(
      await screen.findByText(/passwords do not match/i),
    ).toBeInTheDocument();
  });

  it('blocks submission and shows all validation errors when the form is empty', async () => {
    const user = userEvent.setup();
    renderWithChakra(<RegisterPage />);
    await user.click(screen.getByRole('button', { name: /create account/i }));

    expect(
      await screen.findByText(/please enter your full name/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/please enter your email address/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/please choose a password/i)).toBeInTheDocument();
    expect(
      screen.getByText(/you must accept the terms to continue/i),
    ).toBeInTheDocument();
  });

  // PASSWORD STRENGTH
  it('shows the password requirements checklist once typing starts', async () => {
    const user = userEvent.setup();
    renderWithChakra(<RegisterPage />);
    expect(
      screen.queryByText(/at least 8 characters/i),
    ).not.toBeInTheDocument();

    await user.type(screen.getByLabelText('Password'), 'a');
    expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/one uppercase letter/i)).toBeInTheDocument();
    expect(screen.getByText(/one number/i)).toBeInTheDocument();
    expect(screen.getByText(/one special character/i)).toBeInTheDocument();
  });

  it('labels a weak password as "Weak" and a strong password as "Strong"', async () => {
    const user = userEvent.setup();
    renderWithChakra(<RegisterPage />);
    const passwordInput = screen.getByLabelText('Password');

    await user.type(passwordInput, 'abc');
    expect(screen.getByText('Weak')).toBeInTheDocument();

    await user.clear(passwordInput);
    await user.type(passwordInput, 'Str0ng!Pass');
    expect(screen.getByText('Strong')).toBeInTheDocument();
  });

  // SUCCESSFUL SUBMISSION
  it('submits successfully with valid data and shows a success message', async () => {
    mockedRegisterUser.mockResolvedValueOnce(REGISTERED_USER);
    const user = userEvent.setup();
    renderWithChakra(<RegisterPage />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /create account/i }));

    expect(
      await screen.findByText(/welcome to jwshop, jane!/i),
    ).toBeInTheDocument();
    expect(mockedRegisterUser).toHaveBeenCalledWith({
      email: 'jane@example.com',
      name: 'Jane Doe',
      password: 'Str0ng!Pass',
    });
    expect(
      screen.getByText(/your account has been created for jane@example.com/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /start shopping/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /register another account/i }),
    ).toBeInTheDocument();
  }, 10000);

  it('resets the form when "Register another account" is clicked', async () => {
    mockedRegisterUser.mockResolvedValueOnce(REGISTERED_USER);
    const user = userEvent.setup();
    renderWithChakra(<RegisterPage />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /create account/i }));
    await screen.findByText(/welcome to jwshop, jane!/i);

    await user.click(
      screen.getByRole('button', { name: /register another account/i }),
    );

    expect(
      screen.getByRole('button', { name: /create account/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Full name')).toHaveValue('');
  }, 10000);

  // SERVER-SIDE ERRORS
  it('shows a field error when the email is already registered', async () => {
    mockedRegisterUser.mockRejectedValueOnce(
      new ApiError(
        'An account with email "jane@example.com" already exists.',
        409,
      ),
    );
    const user = userEvent.setup();
    renderWithChakra(<RegisterPage />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /create account/i }));

    expect(await screen.findByText(/already exists/i)).toBeInTheDocument();
    expect(screen.queryByText(/welcome to jwshop/i)).not.toBeInTheDocument();
  }, 10000);

  it('shows a general error banner when the server is unreachable', async () => {
    mockedRegisterUser.mockRejectedValueOnce(
      new ApiError(
        'Unable to reach the server. Please check your connection and try again.',
        0,
      ),
    );
    const user = userEvent.setup();
    renderWithChakra(<RegisterPage />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /create account/i }));

    expect(
      await screen.findByText(/unable to reach the server/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /create account/i }),
    ).toBeInTheDocument();
  }, 10000);

  // MEMBER BENEFITS PANEL
  it('renders the member benefits panel', () => {
    renderWithChakra(<RegisterPage />);
    const heading = screen.getByRole('heading', { name: /why join jwshop/i });
    const panel = heading.closest('div') as HTMLElement;
    expect(within(panel).getByText(/free shipping/i)).toBeInTheDocument();
    expect(within(panel).getByText(/early access/i)).toBeInTheDocument();
    expect(within(panel).getByText(/save your wishlist/i)).toBeInTheDocument();
    expect(within(panel).getByText(/faster checkout/i)).toBeInTheDocument();
  });

  it('renders a sign in link for existing users', () => {
    renderWithChakra(<RegisterPage />);
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
  });

  // FOOTER
  it('renders the footer', () => {
    renderWithChakra(<RegisterPage />);
    expect(
      screen.getByText(/© 2025 JWShop. All rights reserved./i),
    ).toBeInTheDocument();
  });
});
