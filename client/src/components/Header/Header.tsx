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
import { usePathname, useRouter } from 'next/navigation';
import { CartIcon, HeartIcon, SignInIcon, SignOutIcon } from '@/assets/icons';
import { logoutUser } from '@/lib/api';
import { useCurrentUser } from '@/lib/auth';

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { refresh, user: currentUser } = useCurrentUser();

  const handleLogout = async () => {
    await logoutUser();
    await refresh();
    router.push('/');
  };
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
              <ChakraLink
                fontSize="sm"
                fontWeight={pathname === '/' ? 'medium' : 'normal'}
                color={pathname === '/' ? 'salmon' : 'inherit'}
                _hover={{ color: 'salmon' }}
              >
                Home
              </ChakraLink>
            </Link>
            <Link href="/about" passHref legacyBehavior>
              <ChakraLink
                fontSize="sm"
                fontWeight={pathname === '/about' ? 'medium' : 'normal'}
                color={pathname === '/about' ? 'salmon' : 'inherit'}
                _hover={{ color: 'salmon' }}
              >
                About
              </ChakraLink>
            </Link>
            <Link href="/blog" passHref legacyBehavior>
              <ChakraLink
                fontSize="sm"
                fontWeight={pathname === '/blog' ? 'medium' : 'normal'}
                color={pathname === '/blog' ? 'salmon' : 'inherit'}
                _hover={{ color: 'salmon' }}
              >
                Blog
              </ChakraLink>
            </Link>
            <Link href="/features" passHref legacyBehavior>
              <ChakraLink
                fontSize="sm"
                fontWeight={pathname === '/features' ? 'medium' : 'normal'}
                color={pathname === '/features' ? 'salmon' : 'inherit'}
                _hover={{ color: 'salmon' }}
              >
                Features
              </ChakraLink>
            </Link>
            <Link href="/contacts" passHref legacyBehavior>
              <ChakraLink
                fontSize="sm"
                fontWeight={pathname === '/contacts' ? 'medium' : 'normal'}
                color={pathname === '/contacts' ? 'salmon' : 'inherit'}
                _hover={{ color: 'salmon' }}
              >
                Contacts
              </ChakraLink>
            </Link>
            <Link href="/shop" passHref legacyBehavior>
              <ChakraLink
                fontSize="sm"
                fontWeight={pathname === '/shop' ? 'medium' : 'normal'}
                color={pathname === '/shop' ? 'salmon' : 'inherit'}
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
              icon={<HeartIcon />}
              variant="ghost"
              size="sm"
            />

            {/* Cart Icon */}
            <Link href="/checkout" passHref legacyBehavior>
              <ChakraLink _hover={{ textDecoration: 'none' }}>
                <Box position="relative">
                  <IconButton
                    aria-label="Shopping cart"
                    icon={<CartIcon />}
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
              </ChakraLink>
            </Link>

            {/* User Icon */}
            {currentUser ? (
              <IconButton
                aria-label="Sign out"
                title={`Signed in as ${currentUser.name}. Click to sign out.`}
                icon={<SignOutIcon />}
                variant="ghost"
                size="sm"
                onClick={handleLogout}
              />
            ) : (
              <Link href="/login" passHref legacyBehavior>
                <ChakraLink _hover={{ textDecoration: 'none' }}>
                  <IconButton
                    aria-label="Sign in"
                    icon={<SignInIcon />}
                    variant="ghost"
                    size="sm"
                  />
                </ChakraLink>
              </Link>
            )}

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
