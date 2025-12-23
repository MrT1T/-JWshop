'use client';

import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Input,
  Textarea,
  Button,
  HStack,
  Icon,
} from '@chakra-ui/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PromoBannerManager } from '@/components/PromoBanner';

const ContactsPage: React.FC = () => {
  return (
    <Box bg="white" minH="100vh">
      <PromoBannerManager />
      <Header />

      <Container maxW="container.xl" py={{ base: 12, md: 20 }}>
        <VStack spacing={12} align="stretch">
          <VStack spacing={4} textAlign="center" maxW="600px" mx="auto">
            <Heading size="2xl" fontWeight="bold">
              Get In Touch With Us
            </Heading>
            <Text fontSize="md" color="gray.600" lineHeight="1.7">
              For more information about our products & services, please feel
              free to drop us an email. Our staff is always there to help you
              out. Do not hesitate!
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12}>
            <VStack align="stretch" spacing={8}>
              <HStack align="start" spacing={4}>
                <Icon viewBox="0 0 24 24" boxSize={6} mt={1}>
                  <path
                    fill="currentColor"
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  />
                </Icon>
                <VStack align="start" spacing={1}>
                  <Text fontWeight="semibold" fontSize="lg">
                    Address
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    236 5th SE Avenue, New York NY10000, United States
                  </Text>
                </VStack>
              </HStack>

              <HStack align="start" spacing={4}>
                <Icon viewBox="0 0 24 24" boxSize={6} mt={1}>
                  <path
                    fill="currentColor"
                    d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                  />
                </Icon>
                <VStack align="start" spacing={1}>
                  <Text fontWeight="semibold" fontSize="lg">
                    Phone
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    Mobile: +(84) 546-6789
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    Hotline: +(84) 456-6789
                  </Text>
                </VStack>
              </HStack>

              <HStack align="start" spacing={4}>
                <Icon viewBox="0 0 24 24" boxSize={6} mt={1}>
                  <path
                    fill="currentColor"
                    d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"
                  />
                </Icon>
                <VStack align="start" spacing={1}>
                  <Text fontWeight="semibold" fontSize="lg">
                    Working Time
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    Monday-Friday: 9:00 - 22:00
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    Saturday-Sunday: 9:00 - 21:00
                  </Text>
                </VStack>
              </HStack>
            </VStack>

            <Box>
              <VStack as="form" spacing={6} align="stretch">
                <Box>
                  <Text mb={2} fontWeight="medium">
                    Your name
                  </Text>
                  <Input
                    placeholder="Abc"
                    size="lg"
                    borderColor="gray.300"
                    _hover={{ borderColor: 'gray.400' }}
                    _focus={{ borderColor: 'black', boxShadow: 'none' }}
                  />
                </Box>

                <Box>
                  <Text mb={2} fontWeight="medium">
                    Email address
                  </Text>
                  <Input
                    type="email"
                    placeholder="Abc@def.com"
                    size="lg"
                    borderColor="gray.300"
                    _hover={{ borderColor: 'gray.400' }}
                    _focus={{ borderColor: 'black', boxShadow: 'none' }}
                  />
                </Box>

                <Box>
                  <Text mb={2} fontWeight="medium">
                    Subject
                  </Text>
                  <Input
                    placeholder="This is an optional"
                    size="lg"
                    borderColor="gray.300"
                    _hover={{ borderColor: 'gray.400' }}
                    _focus={{ borderColor: 'black', boxShadow: 'none' }}
                  />
                </Box>

                <Box>
                  <Text mb={2} fontWeight="medium">
                    Message
                  </Text>
                  <Textarea
                    placeholder="Hi! I'd like to ask about"
                    rows={4}
                    size="lg"
                    borderColor="gray.300"
                    _hover={{ borderColor: 'gray.400' }}
                    _focus={{ borderColor: 'black', boxShadow: 'none' }}
                    resize="vertical"
                  />
                </Box>

                <Button
                  size="lg"
                  bg="salmon"
                  color="white"
                  _hover={{ bg: 'tomato' }}
                  px={12}
                  alignSelf="start"
                >
                  Submit
                </Button>
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>

      <Footer />
    </Box>
  );
};

export default ContactsPage;
