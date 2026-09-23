import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import { ApiError, loginUser } from '@/lib/api';
import LoginPage from '../login/page';

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
    loginUser: jest.fn(),
  };
});

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  usePathname: () => '/login',
  useRouter: () => ({ push: pushMock }),
}));

// The Header hits /api/users/me on mount; stub it so tests stay hermetic and
// default to a logged-out Header (this file asserts on the login form itself).
jest.mock('../../lib/auth', () => ({
  useCurrentUser: () => ({ isLoading: false, refresh: jest.fn(), user: null }),
}));

const mockedLoginUser = loginUser as jest.MockedFunction<typeof loginUser>;

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

const LOGGED_IN_USER = {
  createdAt: '2026-01-01T00:00:00.000Z',
  email: 'jane@example.com',
  id: 'user-1',
  name: 'Jane Doe',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText('Email address'), 'jane@example.com');
  await user.type(screen.getByLabelText('Password'), 'Str0ng!Pass');
};

// The Header's logged-out state icon also has the accessible name "Sign in",
// so the submit button is disambiguated by its native submit type instead.
const getSubmitButton = () =>
  document.querySelector('button[type="submit"]') as HTMLButtonElement;

beforeEach(() => {
  mockedLoginUser.mockReset();
  pushMock.mockReset();
});

describe('LoginPage component', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = renderWithChakra(<LoginPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  // HEADER
  it('renders the header with navigation', () => {
    renderWithChakra(<LoginPage />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    const jwShopHeadings = screen.getAllByText('JWShop');
    expect(jwShopHeadings.length).toBeGreaterThanOrEqual(1);
  });

  // PAGE TITLE
  it('renders page title and subtitle', () => {
    renderWithChakra(<LoginPage />);
    expect(
      screen.getByRole('heading', { name: /sign in/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
  });

  // FORM FIELDS
  it('renders all required form fields', () => {
    renderWithChakra(<LoginPage />);
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    renderWithChakra(<LoginPage />);
    expect(getSubmitButton()).toBeInTheDocument();
  });

  it('password field is masked by default and can be revealed', async () => {
    const user = userEvent.setup();
    renderWithChakra(<LoginPage />);
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');

    await user.click(screen.getByRole('button', { name: /show password/i }));
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  // VALIDATION
  it('shows an error for an invalid email on blur', async () => {
    const user = userEvent.setup();
    renderWithChakra(<LoginPage />);
    await user.type(screen.getByLabelText('Email address'), 'not-an-email');
    await user.tab();
    expect(
      await screen.findByText(/please enter a valid email address/i),
    ).toBeInTheDocument();
  });

  it('blocks submission and shows validation errors when the form is empty', async () => {
    const user = userEvent.setup();
    renderWithChakra(<LoginPage />);
    await user.click(getSubmitButton());

    expect(
      await screen.findByText(/please enter your email address/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/please enter your password/i)).toBeInTheDocument();
    expect(mockedLoginUser).not.toHaveBeenCalled();
  });

  // SUCCESSFUL LOGIN
  it('logs in with valid credentials and redirects home', async () => {
    mockedLoginUser.mockResolvedValueOnce(LOGGED_IN_USER);
    const user = userEvent.setup();
    renderWithChakra(<LoginPage />);

    await fillValidForm(user);
    await user.click(getSubmitButton());

    expect(pushMock).toHaveBeenCalledWith('/');
    expect(mockedLoginUser).toHaveBeenCalledWith({
      email: 'jane@example.com',
      password: 'Str0ng!Pass',
    });
  }, 10000);

  // SERVER-SIDE ERRORS
  it('shows an error banner for invalid credentials and does not redirect', async () => {
    mockedLoginUser.mockRejectedValueOnce(
      new ApiError('Invalid email or password.', 401),
    );
    const user = userEvent.setup();
    renderWithChakra(<LoginPage />);

    await fillValidForm(user);
    await user.click(getSubmitButton());

    expect(
      await screen.findByText(/invalid email or password/i),
    ).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  }, 10000);

  it('shows a general error banner when the server is unreachable', async () => {
    mockedLoginUser.mockRejectedValueOnce(
      new ApiError(
        'Unable to reach the server. Please check your connection and try again.',
        0,
      ),
    );
    const user = userEvent.setup();
    renderWithChakra(<LoginPage />);

    await fillValidForm(user);
    await user.click(getSubmitButton());

    expect(
      await screen.findByText(/unable to reach the server/i),
    ).toBeInTheDocument();
  }, 10000);

  // REGISTER CROSS-LINK
  it('offers a sign-up link and a register button for new users', () => {
    renderWithChakra(<LoginPage />);
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /^register$/i }),
    ).toBeInTheDocument();
  });

  // FOOTER
  it('renders the footer', () => {
    renderWithChakra(<LoginPage />);
    expect(
      screen.getByText(/© 2025 JWShop. All rights reserved./i),
    ).toBeInTheDocument();
  });
});
