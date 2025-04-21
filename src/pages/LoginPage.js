import React from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from 'hugeicons-react';
import { useNavigate } from 'react-router-dom';
import { useStatusBarColor } from '../hooks/useStatusBarColor';

const LoginPage = () => {
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();

  useStatusBarColor("#ffffff");

  const handleClick = () => setShow(!show);

  return (
    <Container 
      maxW="400px" 
      minH="100vh"
      p={4}
      centerContent
      bg="white"
    >
      <VStack w="full" spacing={6} mt={20}>
        <VStack spacing={2} mb={4}>
          <Text
            fontSize="28px"
            fontWeight="500"
            color="gray.700"
            fontFamily="Roboto"
            lineHeight="40px"
          >
            Login
          </Text>
          <Text
            color="gray.600"
            fontSize="16px"
            fontFamily="Roboto"
            fontWeight="400"
            lineHeight="24px"
            letterSpacing="0.5px"
          >
            Enter credentials to login
          </Text>
        </VStack>

        <FormControl>
          <Input
            placeholder="Email address"
            size="lg"
            borderRadius="12px"
            borderColor="gray.300"
            _focus={{
              borderColor: "brand.700",
              boxShadow: "0 0 0 1px"
            }}
          />
        </FormControl>

        <FormControl>
          <InputGroup size="lg">
            <Input
              type={show ? 'text' : 'password'}
              placeholder="Password"
              borderRadius="12px"
              borderColor="gray.300"
              _focus={{
                borderColor: "brand.700",
                boxShadow: "0 0 0 1px"
              }}
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                onClick={handleClick}
                icon={show ? <ViewIcon color="gray.600" /> : <ViewOffIcon color="gray.600" />}
                aria-label={show ? 'Hide password' : 'Show password'}
              />
            </InputRightElement>
          </InputGroup>
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
          Log in
        </Button>

        <Text
          color="brand.700"
          fontSize="16px"
          fontFamily="Roboto"
          fontWeight="400"
          lineHeight="24px"
          letterSpacing="0.5px"
          cursor="pointer"
          _hover={{
            textDecoration: "underline"
          }}
          onClick={() => navigate('/forgot-password')}
        >
          Forgot password?
        </Text>
      </VStack>
    </Container>
  );
};

export default LoginPage; 