'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Grid,
  GridItem,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Text,
  Divider,
} from '@chakra-ui/react';
import Header from '@/components/Header';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CheckoutPage: React.FC = () => {
  const [cartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Gold Necklace',
      price: 450,
      quantity: 1,
      image: '/images/product1.jpg',
    },
    {
      id: 2,
      name: 'Diamond Earrings',
      price: 650,
      quantity: 1,
      image: '/images/product2.jpg',
    },
    {
      id: 3,
      name: 'Pearl Bracelet',
      price: 280,
      quantity: 1,
      image: '/images/product3.jpg',
    },
  ]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <>
      <Header />
      <Box py={16}>
        <Container maxW="container.xl">
          <Heading size="lg" mb={2} fontWeight="normal">
            Billing details
          </Heading>
          <Text fontSize="sm" color="gray.600" mb={8}>
            Ship to different address?
          </Text>

          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={12}>
            {/* Billing Form */}
            <GridItem>
              <VStack spacing={6} align="stretch">
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <FormControl>
                    <FormLabel fontSize="sm">First Name*</FormLabel>
                    <Input placeholder="First name" />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">Last Name*</FormLabel>
                    <Input placeholder="Last name" />
                  </FormControl>
                </Grid>

                <FormControl>
                  <FormLabel fontSize="sm">Company Name (Optional)</FormLabel>
                  <Input placeholder="Company name" />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Country / Region*</FormLabel>
                  <Select placeholder="Select a country / region">
                    <option value="us">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="ca">Canada</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Street Address*</FormLabel>
                  <Input placeholder="House number and street name" mb={4} />
                  <Input placeholder="Apartment, suite, unit etc. (optional)" />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Town / City*</FormLabel>
                  <Input placeholder="Town / City" />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">State*</FormLabel>
                  <Select placeholder="Select a state">
                    <option value="ny">New York</option>
                    <option value="ca">California</option>
                    <option value="tx">Texas</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">ZIP Code*</FormLabel>
                  <Input placeholder="ZIP Code" />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Phone*</FormLabel>
                  <Input placeholder="Phone" type="tel" />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Email Address*</FormLabel>
                  <Input placeholder="Email address" type="email" />
                </FormControl>
              </VStack>
            </GridItem>

            {/* Your Order Summary */}
            <GridItem>
              <Box
                bg="gray.50"
                p={8}
                borderRadius="md"
                border="1px"
                borderColor="gray.200"
              >
                <Heading size="md" mb={6} fontWeight="normal">
                  Your order
                </Heading>

                <VStack spacing={4} align="stretch">
                  {/* Order Items */}
                  {cartItems.map((item) => (
                    <HStack key={item.id} justify="space-between">
                      <HStack spacing={3}>
                        <Box
                          w="50px"
                          h="50px"
                          bg="gray.200"
                          borderRadius="md"
                        />
                        <VStack align="start" spacing={0}>
                          <Text fontSize="sm" fontWeight="medium">
                            {item.name}
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            Qty: {item.quantity}
                          </Text>
                        </VStack>
                      </HStack>
                      <Text fontSize="sm" fontWeight="medium">
                        ${item.price}
                      </Text>
                    </HStack>
                  ))}

                  <Divider my={2} />

                  {/* Subtotal */}
                  <HStack justify="space-between">
                    <Text fontSize="sm">Subtotal</Text>
                    <Text fontSize="sm" fontWeight="medium">
                      ${subtotal}
                    </Text>
                  </HStack>

                  {/* Shipping */}
                  <HStack justify="space-between">
                    <Text fontSize="sm">Shipping</Text>
                    <Text fontSize="sm" fontWeight="medium" color="green.500">
                      Free
                    </Text>
                  </HStack>

                  <Divider my={2} />

                  {/* Total */}
                  <HStack justify="space-between">
                    <Text fontSize="md" fontWeight="bold">
                      Total
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color="salmon">
                      ${total}
                    </Text>
                  </HStack>

                  <Divider my={2} />

                  {/* Payment Method */}
                  <VStack align="stretch" spacing={3} mt={4}>
                    <Text fontSize="sm" fontWeight="medium">
                      Payment Method
                    </Text>
                    <Box
                      p={3}
                      borderRadius="md"
                      border="2px"
                      borderColor="salmon"
                      bg="white"
                    >
                      <Text fontSize="sm">Cash on delivery</Text>
                    </Box>
                    <Box
                      p={3}
                      borderRadius="md"
                      border="1px"
                      borderColor="gray.300"
                      bg="white"
                    >
                      <Text fontSize="sm">PayPal</Text>
                    </Box>
                  </VStack>

                  {/* Place Order Button */}
                  <Button
                    colorScheme="orange"
                    bg="salmon"
                    size="lg"
                    w="full"
                    mt={6}
                    _hover={{ bg: '#ff8866' }}
                  >
                    Place order
                  </Button>
                </VStack>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CheckoutPage;
