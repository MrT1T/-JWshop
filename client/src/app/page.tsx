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
  IconButton,
  Spacer,
  useBreakpointValue,
} from '@chakra-ui/react';

const Nav: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      px={{ base: 4, md: 12 }}
      py={6}
    >
      <Heading size="md">JWShop</Heading>

      {!isMobile ? (
        <HStack spacing={6}>
          <Link>Home</Link>
          <Link>About</Link>
          <Link>Blog</Link>
          <Link>Shop</Link>
          <Link>Features</Link>
          <Link>Contacts</Link>
          <Link>Instant Quote</Link>
        </HStack>
      ) : (
        <IconButton
          aria-label="menu"
          icon={<Box as="span" bg="black" w="18px" h="2px" />}
        />
      )}
    </Flex>
  );
};

const Hero: React.FC = () => {
  return (
    <Flex
      as="section"
      direction={{ base: 'column', md: 'row' }}
      align="center"
      justify="space-between"
      px={{ base: 6, md: 12 }}
      py={12}
      gap={8}
    >
      <VStack align="start" spacing={6} maxW={{ base: '100%', md: '48%' }}>
        <Heading size="2xl">A Unique Watch That Fits Your Style</Heading>
        <Text fontSize="lg" color="gray.600">
          The new Lawson collection is already here! This quartz Lawson Franklin
          38 model, designed with simplicity and elegance, is truly a cherry on
          the cake. Comes in different sizes and band colors, has a stainless
          steel back for a personalized engraving.
        </Text>
        <HStack spacing={4}>
          <Button colorScheme="blackAlpha" bg="black" color="white">
            Learn More
          </Button>
          <Button variant="outline">View</Button>
        </HStack>
      </VStack>

      {/* Black square placeholder for image */}
      <Box w={{ base: '100%', md: '44%' }} h="320px" bg="black" />
    </Flex>
  );
};

const SplitSection: React.FC<{ title: string; text: string; cta?: string }> = ({
  title,
  text,
  cta,
}) => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      px={{ base: 6, md: 12 }}
      py={10}
      gap={8}
      align="center"
    >
      <Box flex="1">
        <Heading size="lg">{title}</Heading>
        <Text mt={4} color="gray.600">
          {text}
        </Text>
        <Button mt={4} colorScheme="blackAlpha" bg="black" color="white">
          {cta ?? 'Learn More'}
        </Button>
      </Box>
      <Box w={{ base: '100%', md: '420px' }} h="240px" bg="black" />
    </Flex>
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
    <Box px={{ base: 6, md: 12 }} py={8}>
      <Heading size="lg" mb={6}>
        Our Bestsellers
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
        {products.map((p, i) => (
          <Box key={i} borderWidth="1px" borderRadius="md" p={4}>
            <Box bg="black" w="100%" h="160px" mb={4} />
            <Text fontWeight="semibold">{p.title}</Text>
            <Text color="gray.600" mt={2}>
              {p.old ? (
                <span>
                  <Text
                    as="span"
                    textDecoration="line-through"
                    color="gray.400"
                  >
                    {p.old}
                  </Text>{' '}
                  <Text as="span" color="red.500">
                    {p.discount}
                  </Text>
                </span>
              ) : (
                p.price
              )}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      <HStack mt={6} spacing={4}>
        <Button variant="outline">Show all</Button>
        <Button colorScheme="blackAlpha" bg="black" color="white">
          View
        </Button>
      </HStack>
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
    <Box px={{ base: 6, md: 12 }} py={8}>
      <Heading size="lg" mb={4}>
        Journal & Blog
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {posts.map((p, i) => (
          <Box key={i} borderWidth="1px" borderRadius="md" overflow="hidden">
            <Box bg="black" h="150px" />
            <Box p={4}>
              <Text fontSize="sm" color="gray.500">
                {p.date}
              </Text>
              <Text mt={2} fontWeight="semibold">
                {p.title}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <Button mt={6} variant="link" colorScheme="blackAlpha">
        Read more
      </Button>
    </Box>
  );
};

const Footer: React.FC = () => {
  return (
    <Box
      as="footer"
      borderTopWidth={1}
      borderColor="gray.200"
      mt={12}
      py={8}
      px={{ base: 6, md: 12 }}
    >
      <Flex direction={{ base: 'column', md: 'row' }} align="center" gap={6}>
        <Heading size="sm">JWShop</Heading>

        <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
          <Link>Home</Link>
          <Link>About</Link>
          <Link>Blog</Link>
          <Link>Shop</Link>
          <Link>Features</Link>
          <Link>Contacts</Link>
          <Link>Instant Quote</Link>
        </HStack>

        <Spacer />

        <Box maxW="420px" w="100%">
          <Text mb={2}>Lorem ipsum dolor sit amet</Text>
          <InputGroup size="md">
            <Input placeholder="Email" />
            <InputRightElement width="6.5rem">
              <Button h="1.75rem" size="sm" bg="black" color="white">
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Flex>

      <Divider my={6} />

      <Flex
        justify="space-between"
        align="center"
        fontSize="sm"
        color="gray.600"
      >
        <Text>©2025 JWShop</Text>
        <Text>
          Home · About · Blog · Shop · Features · Contacts · Instant Quote
        </Text>
      </Flex>
    </Box>
  );
};

const Home: React.FC = () => {
  return (
    <Box>
      <Nav />
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
      />

      <Journal />

      <Footer />
    </Box>
  );
};

export default Home;
