import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  Text,
  VStack,
  IconButton,
  InputGroup,
  InputRightElement,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { ArrowBackIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { BsCheckCircle } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

const NewPasswordPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validations = {
    length: password.length >= 8,
    letter: /[a-zA-Z]/.test(password),
    digit: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

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
          icon={<ArrowBackIcon />}
          variant="ghost"
          position="absolute"
          left={0}
          top={0}
          color="gray.600"
          aria-label="Go back"
          onClick={() => navigate('/otp')}
        />
      </Box>

      <VStack w="full" spacing={6} mt={16}>
        <VStack spacing={4}>
          <Text
            fontSize="32px"
            fontWeight="500"
            color="gray.700"
            fontFamily="Roboto"
            lineHeight="40px"
            textAlign="center"
          >
            Set New Password
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
            Please create new password to login to your account
          </Text>
        </VStack>

        <FormControl>
          <InputGroup size="lg">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="New Password"
              size="lg"
              borderRadius="12px"
              borderColor="gray.300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              _focus={{
                borderColor: "teal.500",
                boxShadow: "0 0 0 1px #319795"
              }}
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                onClick={() => setShowPassword(!showPassword)}
                icon={showPassword ? <ViewIcon color="gray.600" /> : <ViewOffIcon color="gray.600" />}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl>
          <InputGroup size="lg">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              size="lg"
              borderRadius="12px"
              borderColor="gray.300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              _focus={{
                borderColor: "teal.500",
                boxShadow: "0 0 0 1px #319795"
              }}
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                icon={showConfirmPassword ? <ViewIcon color="gray.600" /> : <ViewOffIcon color="gray.600" />}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          w="full"
          h="48px"
          bg="#157F63"
          color="white"
          borderRadius="12px"
          _hover={{
            bg: "#106952"
          }}
          fontSize="16px"
          fontWeight="600"
        >
          Save Password
        </Button>

        <VStack align="stretch" w="full" spacing={2}>
          <HStack spacing={2}>
            <Icon 
              as={validations.length ? BsCheckCircle : IoMdClose} 
              color={validations.length ? "#157F63" : "gray.400"} 
              boxSize={3.5}
            />
            <Text color="gray.600" fontSize="14px" fontFamily="Roboto" lineHeight="23px">
              At least 8 characters
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Icon 
              as={validations.letter ? BsCheckCircle : IoMdClose} 
              color={validations.letter ? "#157F63" : "gray.400"} 
              boxSize={3.5}
            />
            <Text color="gray.600" fontSize="14px" fontFamily="Roboto" lineHeight="23px">
              At least one letter
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Icon 
              as={validations.digit ? BsCheckCircle : IoMdClose} 
              color={validations.digit ? "#157F63" : "gray.400"} 
              boxSize={3.5}
            />
            <Text color="gray.600" fontSize="14px" fontFamily="Roboto" lineHeight="23px">
              At least one digit
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Icon 
              as={validations.special ? BsCheckCircle : IoMdClose} 
              color={validations.special ? "#157F63" : "gray.400"} 
              boxSize={3.5}
            />
            <Text color="gray.600" fontSize="14px" fontFamily="Roboto" lineHeight="23px">
              At least one special character
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Container>
  );
};

export default NewPasswordPage; 