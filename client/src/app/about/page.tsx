'use client';

import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PromoBannerManager } from '@/components/PromoBanner';

interface StatItem {
  label: string;
  value: string;
}

interface ValueItem {
  description: string;
  title: string;
}

const STATS: StatItem[] = [
  { label: 'Years of craftsmanship', value: '15+' },
  { label: 'Happy customers', value: '50k+' },
  { label: 'Countries shipped to', value: '30+' },
  { label: 'Pieces handcrafted', value: '200k+' },
];

const VALUES: ValueItem[] = [
  {
    description:
      'Every ring, chain, and watch is finished by hand and checked piece by piece before it ships — no shortcuts, no exceptions.',
    title: 'Uncompromising craftsmanship',
  },
  {
    description:
      'We work directly with certified suppliers and use responsibly sourced metals and stones, from raw material to finished piece.',
    title: 'Honest, traceable materials',
  },
  {
    description:
      'Classic silhouettes built to be worn for decades, not seasons — jewelry and watches you pass down, not throw away.',
    title: 'Timeless design',
  },
  {
    description:
      "If something isn't right, we make it right. Free resizing, a real warranty, and a team that actually answers.",
    title: 'Care after the purchase',
  },
];

const StatsSection: React.FC = () => (
  <Box bg="gray.50" py={{ base: 12, md: 16 }}>
    <Container maxW="container.xl">
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
        {STATS.map((stat) => (
          <VStack key={stat.label} spacing={1}>
            <Text
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight="bold"
              color="salmon"
            >
              {stat.value}
            </Text>
            <Text fontSize="sm" color="gray.600" textAlign="center">
              {stat.label}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Container>
  </Box>
);

const StorySection: React.FC = () => (
  <Box py={{ base: 12, md: 16 }}>
    <Container maxW="container.xl">
      <Flex direction={{ base: 'column', md: 'row' }} gap={12} align="center">
        <VStack flex="1" align="start" spacing={5}>
          <Heading size="xl" fontWeight="bold">
            Our Story
          </Heading>
          <Text color="gray.600" lineHeight="1.7" fontSize="md">
            JWShop started in 2010 as a small workbench above a watch repair
            shop, fixing heirloom pieces that other stores had given up on. Word
            spread, the workbench became a studio, and the studio became the
            jewelry and watch shop you&apos;re browsing today.
          </Text>
          <Text color="gray.600" lineHeight="1.7" fontSize="md">
            We still design and finish every collection ourselves — rings,
            chains, ear cuffs, and the Lawson watch line — because a piece
            you&apos;ll wear every day deserves more than a factory catalog.
            Simplicity, elegance, and materials built to outlast the trend
            cycle: that&apos;s the whole philosophy.
          </Text>
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

const ValuesSection: React.FC = () => (
  <Box bg="white" py={{ base: 12, md: 16 }}>
    <Container maxW="container.xl">
      <VStack spacing={4} textAlign="center" maxW="600px" mx="auto" mb={12}>
        <Heading size="xl" fontWeight="bold">
          What We Stand For
        </Heading>
        <Text color="gray.600" lineHeight="1.7">
          Four principles that haven&apos;t changed since the workbench days.
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {VALUES.map((value) => (
          <Flex
            key={value.title}
            align="start"
            gap={4}
            p={6}
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
          >
            <List spacing={0}>
              <ListItem display="flex" alignItems="start">
                <ListIcon
                  as={CheckCircleIcon}
                  color="salmon"
                  boxSize={5}
                  mt={1}
                />
                <Box>
                  <Text fontWeight="semibold" fontSize="lg" mb={1}>
                    {value.title}
                  </Text>
                  <Text color="gray.600" fontSize="sm" lineHeight="1.6">
                    {value.description}
                  </Text>
                </Box>
              </ListItem>
            </List>
          </Flex>
        ))}
      </SimpleGrid>
    </Container>
  </Box>
);

const CtaSection: React.FC = () => (
  <Box bg="gray.50" py={{ base: 12, md: 16 }}>
    <Container maxW="container.xl">
      <VStack spacing={5} textAlign="center" maxW="600px" mx="auto">
        <Heading size="xl" fontWeight="bold">
          See the Collection
        </Heading>
        <Text color="gray.600" lineHeight="1.7">
          Rings, chains, and watches — handcrafted by the same team that started
          it all.
        </Text>
        <NextLink href="/shop" passHref legacyBehavior>
          <Box
            as="a"
            display="inline-block"
            bg="salmon"
            color="white"
            fontWeight="semibold"
            px={8}
            py={3}
            borderRadius="md"
            _hover={{ bg: 'tomato' }}
          >
            Shop now
          </Box>
        </NextLink>
      </VStack>
    </Container>
  </Box>
);

const AboutPage: React.FC = () => {
  return (
    <Box bg="white" minH="100vh">
      <PromoBannerManager />
      <Header />

      <Container maxW="container.xl" py={{ base: 12, md: 20 }}>
        <VStack spacing={4} textAlign="center" maxW="700px" mx="auto">
          <Heading size="2xl" fontWeight="bold">
            About JWShop
          </Heading>
          <Text fontSize="md" color="gray.600" lineHeight="1.7">
            We&apos;re a jewelry and watch shop built on one idea: pieces worth
            wearing every day should be made to last every day.
          </Text>
        </VStack>
      </Container>

      <StorySection />
      <StatsSection />
      <ValuesSection />
      <CtaSection />

      <Footer />
    </Box>
  );
};

export default AboutPage;
