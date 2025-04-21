import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  Text,
  VStack,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { ArrowLeft02Icon } from 'hugeicons-react';
import { useNavigate } from 'react-router-dom';

const OtpPage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(29);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (time) => {
    return `00:${time.toString().padStart(2, '0')}`;
  };

  const handleResend = () => {
    setTimeLeft(29);
    setIsActive(true);
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
          icon={<ArrowLeft02Icon />}
          variant="ghost"
          position="absolute"
          left={0}
          top={0}
          color="gray.600"
          aria-label="Go back"
          onClick={() => navigate('/forgot-password')}
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
            Enter OTP
          </Text>
          <Text
            color="gray.600"
            fontSize="16px"
            fontFamily="Roboto"
            fontWeight="400"
            lineHeight="24px"
            letterSpacing="0.5px"
            textAlign="center"
          >
            A verification code has been sent to{' '}
            <Text as="span" display="block">
              amit@gmail.com.{' '}
              <Text
                as="span"
                color="brand.700"
                cursor="pointer"
                _hover={{ textDecoration: 'underline' }}
                onClick={() => navigate('/forgot-password')}
              >
                Change
              </Text>
            </Text>
          </Text>
        </VStack>

        <FormControl>
          <Input
            placeholder="Enter OTP"
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
          Continue
        </Button>

        <Text
          color="gray.600"
          fontSize="16px"
          fontFamily="Roboto"
          fontWeight="400"
          lineHeight="24px"
          letterSpacing="0.5px"
          textAlign="center"
        >
          Resend code in{' '}
          <Text as="span" color="brand.700">
            {formatTime(timeLeft)}
          </Text>
        </Text>

        <Text
          color="gray.600"
          fontSize="14px"
          fontFamily="Roboto"
          fontWeight="400"
          lineHeight="23px"
          letterSpacing="0.5px"
          textAlign="center"
          mt={8}
          maxW="300px"
        >
          Didn't get the email? Check your spam/junk or resend it.
        </Text>
      </VStack>
    </Container>
  );
};

export default OtpPage; 