'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
  VStack,
  Image,
  Select,
  Button,
  Divider,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PromoBannerManager } from '@/components/PromoBanner';

// Mock data for products
const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 99.99,
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 149.99,
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 3,
    name: 'Product 3',
    price: 79.99,
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 4,
    name: 'Product 4',
    price: 199.99,
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 5,
    name: 'Product 5',
    price: 89.99,
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 6,
    name: 'Product 6',
    price: 129.99,
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 7,
    name: 'Product 7',
    price: 159.99,
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 8,
    name: 'Product 8',
    price: 119.99,
    image: 'https://via.placeholder.com/300',
  },
];

const categories = [
  { name: 'All', count: 2411 },
  { name: 'Necklaces', count: 423 },
  { name: 'Earrings', count: 0 },
];

const ShopPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Box bg="white" minH="100vh">
      {/* Promo Banner */}
      <PromoBannerManager />

      {/* Header */}
      <Header />

      {/* Shop Header */}
      <Container maxW="container.xl" py={8}>
        <Heading size="2xl" mb={2}>
          Shop
        </Heading>
        <Text color="gray.500" mb={8}>
          Home
        </Text>

        {/* Search and Filters */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'stretch', md: 'center' }}
          mb={8}
          gap={4}
        >
          {/* Search */}
          <InputGroup maxW={{ base: '100%', md: '400px' }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              borderColor="gray.300"
              _focus={{
                borderColor: 'black',
                boxShadow: 'none',
              }}
            />
          </InputGroup>

          {/* Sort */}
          <Select
            maxW={{ base: '100%', md: '200px' }}
            borderColor="gray.300"
            _focus={{
              borderColor: 'black',
              boxShadow: 'none',
            }}
          >
            <option value="latest">Sort by latest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </Select>
        </Flex>

        <Divider mb={8} />

        {/* Category Filters */}
        <HStack spacing={6} mb={8} flexWrap="wrap">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant="ghost"
              onClick={() => setActiveCategory(category.name)}
              color={activeCategory === category.name ? 'salmon' : 'black'}
              fontWeight={activeCategory === category.name ? 'bold' : 'normal'}
              px={0}
              _hover={{ color: 'salmon' }}
              _after={
                activeCategory === category.name
                  ? {
                      content: '""',
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      bg: 'salmon',
                    }
                  : undefined
              }
              position="relative"
            >
              {category.name}
              {category.count > 0 && (
                <Text as="span" color="gray.400" ml={2}>
                  ({category.count})
                </Text>
              )}
            </Button>
          ))}
        </HStack>

        <Divider mb={8} borderColor="black" />

        {/* Product Grid */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8}>
          {products.map((product) => (
            <VStack
              key={product.id}
              align="stretch"
              spacing={3}
              cursor="pointer"
              _hover={{ transform: 'translateY(-4px)' }}
              transition="transform 0.2s"
            >
              <Box
                position="relative"
                paddingTop="100%"
                bg="gray.100"
                borderRadius="md"
                overflow="hidden"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  position="absolute"
                  top={0}
                  left={0}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
              </Box>
              <VStack align="start" spacing={1}>
                <Text fontWeight="medium">{product.name}</Text>
                <Text fontSize="lg" fontWeight="bold">
                  ${product.price}
                </Text>
              </VStack>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>

      <Footer />
    </Box>
  );
};

export default ShopPage;
