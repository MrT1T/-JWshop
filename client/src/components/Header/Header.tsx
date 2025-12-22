'use client';

import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Badge,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <Box borderBottom="1px" borderColor="gray.200" bg="white">
      <Container maxW="container.xl">
        <Flex as="nav" align="center" justify="space-between" py={4}>
          {/* Logo */}
          <Link href="/" passHref legacyBehavior>
            <ChakraLink _hover={{ textDecoration: 'none' }}>
              <Heading size="md" fontWeight="bold">
                JWShop
              </Heading>
            </ChakraLink>
          </Link>

          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            <Link href="/" passHref legacyBehavior>
              <ChakraLink fontSize="sm" _hover={{ color: 'salmon' }}>
                Home
              </ChakraLink>
            </Link>
            <Link href="/about" passHref legacyBehavior>
              <ChakraLink fontSize="sm" _hover={{ color: 'salmon' }}>
                About
              </ChakraLink>
            </Link>
            <Link href="/blog" passHref legacyBehavior>
              <ChakraLink fontSize="sm" _hover={{ color: 'salmon' }}>
                Blog
              </ChakraLink>
            </Link>
            <Link href="/features" passHref legacyBehavior>
              <ChakraLink fontSize="sm" _hover={{ color: 'salmon' }}>
                Features
              </ChakraLink>
            </Link>
            <Link href="/contacts" passHref legacyBehavior>
              <ChakraLink fontSize="sm" _hover={{ color: 'salmon' }}>
                Contacts
              </ChakraLink>
            </Link>
            <Link href="/shop" passHref legacyBehavior>
              <ChakraLink
                fontSize="sm"
                fontWeight="medium"
                color="salmon"
                _hover={{ color: 'salmon' }}
              >
                Shop
              </ChakraLink>
            </Link>
          </HStack>

          {/* Right side icons */}
          <HStack spacing={4}>
            {/* Heart Icon */}
            <IconButton
              aria-label="Favorites"
              icon={
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M15.34 3.15C14.17 2.08 12.63 2.08 11.45 3.15L11 3.58L10.55 3.15C9.37 2.08 7.83 2.08 6.66 3.15C5.59 4.17 5 5.52 5 6.95C5 8.38 5.59 9.73 6.66 10.74L11 14.21L15.34 10.74C16.41 9.73 17 8.38 17 6.95C17 5.52 16.41 4.17 15.34 3.15Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              }
              variant="ghost"
              size="sm"
            />

            {/* Cart Icon */}
            <Box position="relative">
              <IconButton
                aria-label="Shopping cart"
                icon={
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M14.45 9.03L13.56 2.39C13.53 2.03 13.22 1.76 12.86 1.76H5.16C4.8 1.76 4.5 2.03 4.46 2.39L3.55 9.03C3.47 9.78 3.72 10.54 4.24 11.11C4.75 11.67 5.48 12 6.24 12H11.79C12.54 12 13.26 11.68 13.77 11.12C14.28 10.56 14.53 9.8 14.45 9.03Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      d="M7.13 1V3.03C7.13 3.58 6.68 4.03 6.13 4.03C5.58 4.03 5.13 3.58 5.13 3.03V1M12.85 1V3.03C12.85 3.58 12.4 4.03 11.85 4.03C11.3 4.03 10.85 3.58 10.85 3.03V1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                }
                variant="ghost"
                size="sm"
              />
              <Badge
                position="absolute"
                top="-4px"
                right="-4px"
                borderRadius="full"
                bg="salmon"
                color="white"
                fontSize="10px"
                minW="18px"
                h="18px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                3
              </Badge>
            </Box>

            {/* User Icon */}
            <IconButton
              aria-label="User account"
              icon={
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M13.36 10.93C12.37 9.93 11.18 9.2 9.88 8.76C11.08 7.88 11.85 6.45 11.85 4.85C11.85 2.18 9.68 0 7 0C4.32 0 2.15 2.18 2.15 4.85C2.15 6.45 2.92 7.88 4.12 8.76C2.82 9.2 1.63 9.93 0.64 10.93C-1.06 12.63 -0.71 14.89 0.29 16.29L6.52 17.21C6.65 17.33 6.83 17.4 7 17.4C7.17 17.4 7.35 17.33 7.48 17.21L13.71 16.29C14.71 14.89 15.06 12.63 13.36 10.93Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              }
              variant="ghost"
              size="sm"
            />

            {/* Mobile Menu */}
            <IconButton
              aria-label="Menu"
              icon={<HamburgerIcon />}
              variant="ghost"
              display={{ base: 'flex', md: 'none' }}
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
