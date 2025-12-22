'use client';

import React from 'react';
import {
  Box,
  Flex,
  HStack,
  VStack,
  Heading,
  Text,
  Button,
  Link,
  SimpleGrid,
  Input,
  InputGroup,
  InputRightElement,
  Divider,
  Container,
} from '@chakra-ui/react';
import Header from '@/components/Header';
import { PromoBannerManager } from '@/components/PromoBanner';

const Hero: React.FC = () => {
  return (
    <Box bg="gray.50" py={{ base: 12, md: 20 }}>
      <Container maxW="container.xl">
        <Flex
          as="section"
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
          gap={12}
        >
          <VStack align="start" spacing={6} maxW={{ base: '100%', md: '52%' }}>
            <Heading size="3xl" lineHeight="1.2" fontWeight="bold">
              A Unique Watch That Fits Your Style
            </Heading>
            <Text fontSize="lg" color="gray.600" lineHeight="1.7">
              The new Lawson collection is already here! This quartz Lawson
              Franklin 38 model, designed with simplicity and elegance, is truly
              a cherry on the cake. Comes in different sizes and band colors,
              has a stainless steel back for a personalized engraving.
            </Text>
            <HStack spacing={4} pt={2}>
              <Button
                size="lg"
                colorScheme="blackAlpha"
                bg="black"
                color="white"
                px={8}
                _hover={{ bg: 'gray.800' }}
              >
                Learn More
              </Button>
              <Button
                size="lg"
                variant="outline"
                borderColor="black"
                color="black"
                px={8}
                _hover={{ bg: 'gray.100' }}
              >
                View
              </Button>
            </HStack>
          </VStack>

          <Box
            w={{ base: '100%', md: '42%' }}
            h={{ base: '280px', md: '400px' }}
            bg="black"
            borderRadius="lg"
            boxShadow="xl"
          />
        </Flex>
      </Container>
    </Box>
  );
};

const SplitSection: React.FC<{
  title: string;
  text: string;
  cta?: string;
  reverse?: boolean;
}> = ({ title, text, cta, reverse = false }) => {
  return (
    <Box py={{ base: 12, md: 16 }}>
      <Container maxW="container.xl">
        <Flex
          direction={{ base: 'column', md: reverse ? 'row-reverse' : 'row' }}
          gap={12}
          align="center"
        >
          <VStack flex="1" align="start" spacing={5}>
            <Heading size="xl" fontWeight="bold">
              {title}
            </Heading>
            <Text color="gray.600" lineHeight="1.7" fontSize="md">
              {text}
            </Text>
            <Button
              mt={2}
              size="lg"
              colorScheme="blackAlpha"
              bg="black"
              color="white"
              px={8}
              _hover={{ bg: 'gray.800' }}
            >
              {cta ?? 'Learn More'}
            </Button>
          </VStack>
          <Box
            w={{ base: '100%', md: '48%' }}
            h={{ base: '240px', md: '320px' }}
            bg="black"
            borderRadius="lg"
            boxShadow="lg"
          />
        </Flex>
      </Container>
    </Box>
  );
};

const Bestsellers: React.FC = () => {
  const products = [
    { title: 'Gold chunky paperclip link chain', price: '19,00 £' },
    { title: 'Sterling silver criss cross ring', price: '23,00 £' },
    { title: 'Ear cuff with cubic zirconias', price: '8,00 £' },
    {
      title: 'Set of two gold stacking layering necklaces',
      price: '26,00 £',
      old: '28,00 £',
      discount: '-10%',
    },
  ];

  return (
    <Box bg="white" py={{ base: 12, md: 16 }}>
      <Container maxW="container.xl">
        <Heading size="xl" mb={8} fontWeight="bold">
          Our Bestsellers
        </Heading>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6}>
          {products.map((p, i) => (
            <Box
              key={i}
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="lg"
              overflow="hidden"
              _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              <Box bg="gray.100" w="100%" h="200px" />
              <Box p={5}>
                <Text fontWeight="semibold" fontSize="sm" mb={3} minH="40px">
                  {p.title}
                </Text>
                <Text fontWeight="bold" fontSize="lg">
                  {p.old ? (
                    <Flex align="center" gap={2}>
                      <Text
                        as="span"
                        textDecoration="line-through"
                        color="gray.400"
                        fontSize="md"
                      >
                        {p.old}
                      </Text>
                      <Text as="span" color="red.500" fontSize="sm">
                        {p.discount}
                      </Text>
                      <Text as="span" color="black">
                        {p.price}
                      </Text>
                    </Flex>
                  ) : (
                    p.price
                  )}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        <HStack mt={8} spacing={4}>
          <Button
            variant="outline"
            size="lg"
            borderColor="black"
            color="black"
            px={8}
            _hover={{ bg: 'gray.50' }}
          >
            Show all
          </Button>
          <Button
            size="lg"
            colorScheme="blackAlpha"
            bg="black"
            color="white"
            px={8}
            _hover={{ bg: 'gray.800' }}
          >
            View
          </Button>
        </HStack>
      </Container>
    </Box>
  );
};

const Journal: React.FC = () => {
  const posts = [
    { date: '26.08.2020', title: 'What Are the Types of Watch Movements?' },
    { date: '26.08.2020', title: 'What Are the Types of Watch Movements?' },
    { date: '26.08.2020', title: 'What Are the Types of Watch Movements?' },
  ];

  return (
    <Box bg="gray.50" py={{ base: 12, md: 16 }}>
      <Container maxW="container.xl">
        <Heading size="xl" mb={8} fontWeight="bold">
          Journal & Blog
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          {posts.map((p, i) => (
            <Box
              key={i}
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="lg"
              overflow="hidden"
              bg="white"
              _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              <Box bg="gray.200" h="200px" />
              <Box p={6}>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  {p.date}
                </Text>
                <Text fontWeight="semibold" fontSize="md" lineHeight="1.5">
                  {p.title}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
        <Button
          mt={8}
          variant="link"
          colorScheme="blackAlpha"
          fontSize="md"
          fontWeight="semibold"
        >
          Read more →
        </Button>
      </Container>
    </Box>
  );
};

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

const Home: React.FC = () => {
  return (
    <Box minH="100vh" bg="white">
      <PromoBannerManager />
      <Header />
      <Hero />

      <SplitSection
        title="Ideal Has Never Been Closer"
        text="Have you ever come across a thing that is impossible to resist? Meet the Lawson Jefferson 38!
              Run by the vibration of a quartz crystal (32,786 times per second) under current to keep possibly accurate time.
              You will feel absolutely over the moon with it, we guarantee!"
        cta="Learn More"
      />

      <Bestsellers />

      <SplitSection
        title="Swiss Essence"
        text="The first association that comes to one’s mind with the phrase “a good wristwatch” is naturally a one made somewhere in Switzerland. Do you want to know what makes Swiss watches stand out?"
        cta="Learn More"
        reverse={true}
      />

      <Journal />

      <Footer />
    </Box>
  );
};

export default Home;
