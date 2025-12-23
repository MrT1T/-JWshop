'use client';

import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Divider,
  Link,
} from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Box
      as="footer"
      borderTopWidth={1}
      borderColor="gray.200"
      bg="white"
      py={12}
    >
      <Container maxW="container.xl">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="start"
          gap={8}
          mb={8}
        >
          <Box flex="1">
            <Heading size="lg" mb={4} fontWeight="bold">
              JWShop
            </Heading>
          </Box>

          <HStack spacing={6} display={{ base: 'none', md: 'flex' }} flex="2">
            <Link fontSize="sm" _hover={{ color: 'gray.600' }}>
              Home
            </Link>
            <Link fontSize="sm" _hover={{ color: 'gray.600' }}>
              About
            </Link>
            <Link fontSize="sm" _hover={{ color: 'gray.600' }}>
              Blog
            </Link>
            <Link fontSize="sm" _hover={{ color: 'gray.600' }}>
              Shop
            </Link>
            <Link fontSize="sm" _hover={{ color: 'gray.600' }}>
              Features
            </Link>
            <Link fontSize="sm" _hover={{ color: 'gray.600' }}>
              Contacts
            </Link>
            <Link fontSize="sm" _hover={{ color: 'gray.600' }}>
              Instant Quote
            </Link>
          </HStack>

          <Box maxW={{ base: '100%', md: '360px' }} w="100%" flex="1">
            <Text mb={3} fontSize="sm" fontWeight="medium">
              Subscribe to our newsletter
            </Text>
            <InputGroup size="md">
              <Input
                placeholder="Enter your email"
                borderColor="gray.300"
                _hover={{ borderColor: 'gray.400' }}
                _focus={{ borderColor: 'black', boxShadow: 'none' }}
              />
              <InputRightElement width="5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  bg="black"
                  color="white"
                  _hover={{ bg: 'gray.800' }}
                  fontSize="xs"
                >
                  Subscribe
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Flex>

        <Divider mb={6} />

        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'start', md: 'center' }}
          gap={4}
          fontSize="sm"
          color="gray.600"
        >
          <Text>© 2025 JWShop. All rights reserved.</Text>
          <HStack spacing={3} display={{ base: 'none', md: 'flex' }}>
            <Link fontSize="xs" _hover={{ color: 'gray.800' }}>
              Privacy Policy
            </Link>
            <Text>·</Text>
            <Link fontSize="xs" _hover={{ color: 'gray.800' }}>
              Terms of Service
            </Link>
            <Text>·</Text>
            <Link fontSize="xs" _hover={{ color: 'gray.800' }}>
              Contact Us
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
