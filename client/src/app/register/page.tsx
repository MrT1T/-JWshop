'use client';

import React, { useMemo, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  List,
  ListIcon,
  ListItem,
  Progress,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { CheckCircleIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PromoBannerManager } from '@/components/PromoBanner';
import { ApiError, registerUser } from '@/lib/api';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

type RegisterFormField = keyof RegisterFormValues;

type RegisterFormErrors = Partial<Record<RegisterFormField, string>>;

type RegisterFormTouched = Record<RegisterFormField, boolean>;

interface MemberBenefit {
  title: string;
  description: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_NAME_LENGTH = 2;
const MIN_PASSWORD_LENGTH = 8;

const PASSWORD_REQUIREMENTS = [
  {
    label: 'At least 8 characters',
    test: (value: string) => value.length >= MIN_PASSWORD_LENGTH,
  },
  {
    label: 'One uppercase letter',
    test: (value: string) => /[A-Z]/.test(value),
  },
  { label: 'One number', test: (value: string) => /\d/.test(value) },
  {
    label: 'One special character',
    test: (value: string) => /[^A-Za-z0-9]/.test(value),
  },
];

const MEMBER_BENEFITS: MemberBenefit[] = [
  {
    title: 'Free shipping',
    description: 'On every order over $75, no promo code needed.',
  },
  {
    title: 'Early access',
    description: 'Shop new arrivals and seasonal sales before anyone else.',
  },
  {
    title: 'Save your wishlist',
    description: 'Keep track of the pieces you love across every visit.',
  },
  {
    title: 'Faster checkout',
    description:
      'Store your details once and breeze through checkout next time.',
  },
];

const INITIAL_VALUES: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
};

const INITIAL_TOUCHED: RegisterFormTouched = {
  name: false,
  email: false,
  password: false,
  confirmPassword: false,
  agreeToTerms: false,
};

const inputStyles = {
  size: 'lg' as const,
  borderColor: 'gray.300',
  _hover: { borderColor: 'gray.400' },
  _focus: { borderColor: 'black', boxShadow: 'none' },
};

function validateField(
  field: RegisterFormField,
  values: RegisterFormValues,
): string | undefined {
  switch (field) {
    case 'name': {
      const trimmed = values.name.trim();
      if (!trimmed) return 'Please enter your full name.';
      if (trimmed.length < MIN_NAME_LENGTH)
        return `Name must be at least ${MIN_NAME_LENGTH} characters.`;
      return undefined;
    }
    case 'email': {
      const trimmed = values.email.trim();
      if (!trimmed) return 'Please enter your email address.';
      if (!EMAIL_REGEX.test(trimmed))
        return 'Please enter a valid email address.';
      return undefined;
    }
    case 'password': {
      if (!values.password) return 'Please choose a password.';
      if (values.password.length < MIN_PASSWORD_LENGTH) {
        return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
      }
      return undefined;
    }
    case 'confirmPassword': {
      if (!values.confirmPassword) return 'Please confirm your password.';
      if (values.confirmPassword !== values.password)
        return 'Passwords do not match.';
      return undefined;
    }
    case 'agreeToTerms': {
      if (!values.agreeToTerms) return 'You must accept the terms to continue.';
      return undefined;
    }
    default:
      return undefined;
  }
}

function validateAll(values: RegisterFormValues): RegisterFormErrors {
  const fields: RegisterFormField[] = [
    'name',
    'email',
    'password',
    'confirmPassword',
    'agreeToTerms',
  ];
  const nextErrors: RegisterFormErrors = {};
  fields.forEach((field) => {
    const message = validateField(field, values);
    if (message) nextErrors[field] = message;
  });
  return nextErrors;
}

const RegisterPage: React.FC = () => {
  const [values, setValues] = useState<RegisterFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [touched, setTouched] = useState<RegisterFormTouched>(INITIAL_TOUCHED);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const passwordScore = useMemo(
    () =>
      PASSWORD_REQUIREMENTS.filter((requirement) =>
        requirement.test(values.password),
      ).length,
    [values.password],
  );

  const passwordStrength = useMemo(() => {
    if (values.password.length === 0) {
      return { label: '', color: 'gray' };
    }
    if (passwordScore <= 1) return { label: 'Weak', color: 'red' };
    if (passwordScore === 2) return { label: 'Fair', color: 'orange' };
    if (passwordScore === 3) return { label: 'Good', color: 'yellow' };
    return { label: 'Strong', color: 'green' };
  }, [passwordScore, values.password.length]);

  const handleChange =
    (field: RegisterFormField) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue =
        field === 'agreeToTerms' ? event.target.checked : event.target.value;
      const nextValues = { ...values, [field]: nextValue };
      setValues(nextValues);

      if (touched[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: validateField(field, nextValues),
        }));
      }

      if (field === 'password' && touched.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: validateField('confirmPassword', nextValues),
        }));
      }
    };

  const handleBlur = (field: RegisterFormField) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values) }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const nextErrors = validateAll(values);
    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
      agreeToTerms: true,
    });

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await registerUser({
        email: values.email.trim(),
        name: values.name.trim(),
        password: values.password,
      });
      setIsSubmitted(true);
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        setTouched((prev) => ({ ...prev, email: true }));
        setErrors((prev) => ({ ...prev, email: error.message }));
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

  const handleStartOver = () => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setTouched(INITIAL_TOUCHED);
    setSubmitError(null);
    setIsSubmitted(false);
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
                Create your account
              </Heading>
              <Text fontSize="md" color="gray.600">
                Join JWShop for early access to new arrivals and member-only
                pricing.
              </Text>
            </VStack>

            {isSubmitted ? (
              <VStack spacing={6} align="stretch">
                <Alert
                  status="success"
                  variant="subtle"
                  flexDirection="column"
                  alignItems="start"
                  borderRadius="lg"
                  py={6}
                  px={6}
                >
                  <HStack spacing={2} mb={1}>
                    <AlertIcon />
                    <AlertTitle>
                      Welcome to JWShop, {values.name.trim().split(' ')[0]}!
                    </AlertTitle>
                  </HStack>
                  <AlertDescription>
                    Your account has been created for {values.email}. You can
                    now sign in and start shopping.
                  </AlertDescription>
                </Alert>
                <HStack spacing={4}>
                  <NextLink href="/shop" passHref legacyBehavior>
                    <Button
                      as="a"
                      size="lg"
                      bg="salmon"
                      color="white"
                      _hover={{ bg: 'tomato' }}
                      flex={1}
                    >
                      Start shopping
                    </Button>
                  </NextLink>
                  <Button
                    size="lg"
                    variant="outline"
                    borderColor="gray.300"
                    flex={1}
                    onClick={handleStartOver}
                  >
                    Register another account
                  </Button>
                </HStack>
              </VStack>
            ) : (
              <VStack spacing={6} align="stretch">
                {submitError && (
                  <Alert status="error" borderRadius="md">
                    <AlertIcon />
                    {submitError}
                  </Alert>
                )}

                <FormControl isInvalid={Boolean(errors.name && touched.name)}>
                  <FormLabel fontSize="sm">Full name</FormLabel>
                  <Input
                    {...inputStyles}
                    placeholder="Jane Doe"
                    value={values.name}
                    onChange={handleChange('name')}
                    onBlur={handleBlur('name')}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>

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
                      placeholder="Create a password"
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

                  {values.password.length > 0 && (
                    <Box mt={3}>
                      <HStack justify="space-between" mb={1}>
                        <Text fontSize="xs" color="gray.500">
                          Password strength
                        </Text>
                        <Text
                          fontSize="xs"
                          color={`${passwordStrength.color}.500`}
                          fontWeight="medium"
                        >
                          {passwordStrength.label}
                        </Text>
                      </HStack>
                      <Progress
                        value={
                          (passwordScore / PASSWORD_REQUIREMENTS.length) * 100
                        }
                        size="xs"
                        colorScheme={passwordStrength.color}
                        borderRadius="full"
                      />
                      <List spacing={1} mt={3}>
                        {PASSWORD_REQUIREMENTS.map((requirement) => {
                          const met = requirement.test(values.password);
                          return (
                            <ListItem
                              key={requirement.label}
                              fontSize="xs"
                              color={met ? 'green.600' : 'gray.500'}
                            >
                              <ListIcon
                                as={CheckCircleIcon}
                                color={met ? 'green.500' : 'gray.300'}
                              />
                              {requirement.label}
                            </ListItem>
                          );
                        })}
                      </List>
                    </Box>
                  )}
                </FormControl>

                <FormControl
                  isInvalid={Boolean(
                    errors.confirmPassword && touched.confirmPassword,
                  )}
                >
                  <FormLabel fontSize="sm">Confirm password</FormLabel>
                  <InputGroup>
                    <Input
                      {...inputStyles}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Re-enter your password"
                      value={values.confirmPassword}
                      onChange={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                    />
                    <InputRightElement h="full">
                      <IconButton
                        aria-label={
                          showConfirmPassword
                            ? 'Hide password'
                            : 'Show password'
                        }
                        icon={
                          showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />
                        }
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={Boolean(
                    errors.agreeToTerms && touched.agreeToTerms,
                  )}
                >
                  <Checkbox
                    colorScheme="orange"
                    isChecked={values.agreeToTerms}
                    onChange={handleChange('agreeToTerms')}
                    onBlur={handleBlur('agreeToTerms')}
                    alignItems="start"
                  >
                    <Text fontSize="sm" color="gray.700">
                      I agree to the Terms of Service and Privacy Policy.
                    </Text>
                  </Checkbox>
                  <FormErrorMessage>{errors.agreeToTerms}</FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  size="lg"
                  w="full"
                  bg="salmon"
                  color="white"
                  _hover={{ bg: 'tomato' }}
                  isLoading={isSubmitting}
                  loadingText="Creating account..."
                >
                  Create account
                </Button>

                <Text fontSize="sm" color="gray.600" textAlign="center">
                  Already have an account?{' '}
                  <NextLink href="/" passHref legacyBehavior>
                    <ChakraLink color="salmon" fontWeight="semibold">
                      Sign in
                    </ChakraLink>
                  </NextLink>
                </Text>
              </VStack>
            )}
          </Box>

          <Box bg="gray.50" borderRadius="xl" p={{ base: 6, md: 8 }}>
            <Heading size="md" fontWeight="semibold" mb={6}>
              Why join JWShop?
            </Heading>
            <Stack spacing={6}>
              {MEMBER_BENEFITS.map((benefit) => (
                <HStack key={benefit.title} align="start" spacing={4}>
                  <Box mt={1} color="salmon">
                    <CheckCircleIcon boxSize={5} />
                  </Box>
                  <Box>
                    <Text fontWeight="semibold">{benefit.title}</Text>
                    <Text fontSize="sm" color="gray.600">
                      {benefit.description}
                    </Text>
                  </Box>
                </HStack>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default RegisterPage;
