import React from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  Text,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import { ArrowLeft02Icon } from 'hugeicons-react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  return (
    <Container 
      maxW="400px" 
      minH="100vh"
      p={4}
      centerContent
      bg="white"
    >
      <Box w="full" position="relative" mt={4}>
        <IconButton
          icon={<ArrowLeft02Icon />}
          variant="ghost"
          position="absolute"
          left={0}
          top={0}
          color="gray.600"
          aria-label="Go back"
          onClick={() => navigate('/login')}
        />
      </Box>

      <VStack w="full" spacing={6} mt={16}>
        <VStack spacing={4}>
          <Text
            fontSize="28px"
            fontWeight="500"
            color="gray.700"
            fontFamily="Roboto"
            lineHeight="40px"
            textAlign="center"
          >
            Forgot Password?
          </Text>
          <Text
            color="gray.600"
            fontSize="16px"
            fontFamily="Roboto"
            fontWeight="400"
            lineHeight="24px"
            letterSpacing="0.5px"
            textAlign="center"
            maxW="286px"
          >
            Just confirm your email and we'll send you an OTP to create a brand new password.
          </Text>
        </VStack>

        <FormControl mt={6}>
          <Input
            placeholder="Email"
            size="lg"
            borderRadius="12px"
            borderColor="gray.300"
            _focus={{
              borderColor: "brand.700",
              boxShadow: "0 0 0 1px"
            }}
          />
        </FormControl>

        <Button
          w="full"
          h="48px"
          bg="brand.700"
          color="white"
          borderRadius="12px"
          _hover={{
            bg: "brand.800"
          }}
          fontSize="16px"
          fontWeight="600"
        >
          Send OTP
        </Button>
      </VStack>
    </Container>
  );
};

export default ForgotPasswordPage; 