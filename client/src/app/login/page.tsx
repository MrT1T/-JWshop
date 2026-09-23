'use client';

import React, { useState } from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PromoBannerManager } from '@/components/PromoBanner';
import { ApiError, loginUser } from '@/lib/api';
import { storeUser } from '@/lib/auth';

interface LoginFormValues {
  email: string;
  password: string;
}

type LoginFormField = keyof LoginFormValues;

type LoginFormErrors = Partial<Record<LoginFormField, string>>;

type LoginFormTouched = Record<LoginFormField, boolean>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_VALUES: LoginFormValues = {
  email: '',
  password: '',
};

const INITIAL_TOUCHED: LoginFormTouched = {
  email: false,
  password: false,
};

const inputStyles = {
  size: 'lg' as const,
  borderColor: 'gray.300',
  _hover: { borderColor: 'gray.400' },
  _focus: { borderColor: 'black', boxShadow: 'none' },
};

function validateField(
  field: LoginFormField,
  values: LoginFormValues,
): string | undefined {
  switch (field) {
    case 'email': {
      const trimmed = values.email.trim();
      if (!trimmed) return 'Please enter your email address.';
      if (!EMAIL_REGEX.test(trimmed))
        return 'Please enter a valid email address.';
      return undefined;
    }
    case 'password': {
      if (!values.password) return 'Please enter your password.';
      return undefined;
    }
    default:
      return undefined;
  }
}

function validateAll(values: LoginFormValues): LoginFormErrors {
  const fields: LoginFormField[] = ['email', 'password'];
  const nextErrors: LoginFormErrors = {};
  fields.forEach((field) => {
    const message = validateField(field, values);
    if (message) nextErrors[field] = message;
  });
  return nextErrors;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [values, setValues] = useState<LoginFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [touched, setTouched] = useState<LoginFormTouched>(INITIAL_TOUCHED);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange =
    (field: LoginFormField) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValues = { ...values, [field]: event.target.value };
      setValues(nextValues);

      if (touched[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: validateField(field, nextValues),
        }));
      }
    };

  const handleBlur = (field: LoginFormField) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values) }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const nextErrors = validateAll(values);
    setErrors(nextErrors);
    setTouched({ email: true, password: true });

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const user = await loginUser({
        email: values.email.trim(),
        password: values.password,
      });
      storeUser(user);
      router.push('/');
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setSubmitError(error.message);
      } else {
        setSubmitError(
          error instanceof ApiError
            ? error.message
            : 'Something went wrong. Please try again.',
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box bg="white" minH="100vh">
      <PromoBannerManager />
      <Header />

      <Container maxW="container.xl" py={{ base: 12, md: 20 }}>
        <Grid
          templateColumns={{ base: '1fr', lg: '3fr 2fr' }}
          gap={{ base: 10, lg: 16 }}
          alignItems="start"
        >
          <Box
            as="form"
            onSubmit={handleSubmit}
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="xl"
            shadow="sm"
            p={{ base: 6, md: 10 }}
          >
            <VStack spacing={2} align="start" mb={8}>
              <Heading size={{ base: 'xl', md: '2xl' }} fontWeight="bold">
                Sign in
              </Heading>
              <Text fontSize="md" color="gray.600">
                Welcome back. Sign in to continue shopping at JWShop.
              </Text>
            </VStack>

            <VStack spacing={6} align="stretch">
              {submitError && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  {submitError}
                </Alert>
              )}

              <FormControl isInvalid={Boolean(errors.email && touched.email)}>
                <FormLabel fontSize="sm">Email address</FormLabel>
                <Input
                  {...inputStyles}
                  type="email"
                  placeholder="jane@example.com"
                  value={values.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={Boolean(errors.password && touched.password)}
              >
                <FormLabel fontSize="sm">Password</FormLabel>
                <InputGroup>
                  <Input
                    {...inputStyles}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                  />
                  <InputRightElement h="full">
                    <IconButton
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                size="lg"
                w="full"
                bg="salmon"
                color="white"
                _hover={{ bg: 'tomato' }}
                isLoading={isSubmitting}
                loadingText="Signing in..."
              >
                Sign in
              </Button>

              <Text fontSize="sm" color="gray.600" textAlign="center">
                Don&apos;t have an account?{' '}
                <NextLink href="/register" passHref legacyBehavior>
                  <ChakraLink color="salmon" fontWeight="semibold">
                    Sign up
                  </ChakraLink>
                </NextLink>
              </Text>
            </VStack>
          </Box>

          <Box bg="gray.50" borderRadius="xl" p={{ base: 6, md: 8 }}>
            <Heading size="md" fontWeight="semibold" mb={3}>
              New to JWShop?
            </Heading>
            <Text fontSize="sm" color="gray.600" mb={6}>
              Create a free account to save your wishlist, get early access to
              seasonal sales, and check out faster.
            </Text>
            <NextLink href="/register" passHref legacyBehavior>
              <Button
                as="a"
                size="lg"
                w="full"
                variant="outline"
                borderColor="salmon"
                color="salmon"
                _hover={{ bg: 'salmon', color: 'white' }}
              >
                Register
              </Button>
            </NextLink>
          </Box>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default LoginPage;
