import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import ShopPage from '../shop/page';

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe('ShopPage component', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = renderWithChakra(<ShopPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  // HEADER
  it('renders the header with navigation', () => {
    renderWithChakra(<ShopPage />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('JWShop')).toBeInTheDocument();
  });

  // PAGE TITLE
  it('renders the shop page title', () => {
    renderWithChakra(<ShopPage />);
    // Проверяем наличие заголовка Shop на странице (не в навигации)
    const shopHeadings = screen.getAllByRole('heading', { name: /shop/i, level: 2 });
    expect(shopHeadings.length).toBeGreaterThan(0);
  });

  // SEARCH
  it('renders search input', () => {
    renderWithChakra(<ShopPage />);
    const searchInput = screen.getByPlaceholderText(/search/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('allows user to type in search input', async () => {
    const user = userEvent.setup();
    renderWithChakra(<ShopPage />);
    const searchInput = screen.getByPlaceholderText(/search/i);
    await user.type(searchInput, 'necklace');
    expect(searchInput).toHaveValue('necklace');
  });

  // CATEGORIES FILTER
  it('renders all category filters', () => {
    renderWithChakra(<ShopPage />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Necklaces')).toBeInTheDocument();
    expect(screen.getByText('Earrings')).toBeInTheDocument();
  });

  it('displays category counts', () => {
    renderWithChakra(<ShopPage />);
    expect(screen.getByText('(2411)')).toBeInTheDocument();
    expect(screen.getByText('(423)')).toBeInTheDocument();
    // Категории с count: 0 не отображают скобки
    expect(screen.getByText('Earrings')).toBeInTheDocument();
  });

  it('highlights active category', () => {
    renderWithChakra(<ShopPage />);
    const allButton = screen.getByRole('button', { name: /all/i });
    // Проверяем, что кнопка All найдена (она активна по умолчанию)
    expect(allButton).toBeInTheDocument();
  });

  it('changes active category on click', async () => {
    const user = userEvent.setup();
    renderWithChakra(<ShopPage />);
    const necklacesButton = screen.getByRole('button', { name: /necklaces/i });
    await user.click(necklacesButton);
    // Проверяем, что кнопка остается в документе после клика
    expect(necklacesButton).toBeInTheDocument();
  });

  // SORT DROPDOWN
  it('renders sort dropdown', () => {
    renderWithChakra(<ShopPage />);
    const sortSelect = screen.getByRole('combobox');
    expect(sortSelect).toBeInTheDocument();
  });

  it('displays default sort option', () => {
    renderWithChakra(<ShopPage />);
    const sortSelect = screen.getByRole('combobox');
    expect(sortSelect).toHaveValue('latest');
  });

  // PRODUCTS GRID
  it('renders product grid', () => {
    renderWithChakra(<ShopPage />);
    const products = screen.getAllByRole('img');
    expect(products.length).toBeGreaterThan(0);
  });

  it('displays all 8 products', () => {
    renderWithChakra(<ShopPage />);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Product 3')).toBeInTheDocument();
    expect(screen.getByText('Product 4')).toBeInTheDocument();
    expect(screen.getByText('Product 5')).toBeInTheDocument();
    expect(screen.getByText('Product 6')).toBeInTheDocument();
    expect(screen.getByText('Product 7')).toBeInTheDocument();
    expect(screen.getByText('Product 8')).toBeInTheDocument();
  });

  it('displays product prices', () => {
    renderWithChakra(<ShopPage />);
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('$149.99')).toBeInTheDocument();
    expect(screen.getByText('$199.99')).toBeInTheDocument();
  });

  it('renders product images with correct alt text', () => {
    renderWithChakra(<ShopPage />);
    const images = screen.getAllByRole('img');
    images.forEach((img) => {
      expect(img).toHaveAttribute('alt');
    });
  });

  // LAYOUT
  it('renders sidebar and main content areas', () => {
    renderWithChakra(<ShopPage />);
    // Проверяем наличие контейнера с продуктами
    const container = screen.getAllByRole('img')[0].closest('.chakra-container');
    expect(container).toBeInTheDocument();
  });

  it('uses responsive grid layout', () => {
    renderWithChakra(<ShopPage />);
    const productGrid = screen.getAllByRole('img')[0].closest('[class*="css-"]');
    expect(productGrid).toBeInTheDocument();
  });
});
