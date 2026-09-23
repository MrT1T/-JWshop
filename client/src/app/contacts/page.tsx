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
} from '@chakra-ui/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PromoBannerManager } from '@/components/PromoBanner';
import { ClockIcon, LocationIcon, PhoneIcon } from '@/assets/icons';

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
                <Box boxSize={6} mt={1}>
                  <LocationIcon />
                </Box>
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
                <Box boxSize={6} mt={1}>
                  <PhoneIcon />
                </Box>
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
                <Box boxSize={6} mt={1}>
                  <ClockIcon />
                </Box>
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
