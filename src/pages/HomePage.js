import React, { useState } from 'react';
import { Box, VStack, Input, Button, Heading, Text, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const navigationButtons = [
  { name: 'Login', path: '/login' },
  { name: 'Forgot Password', path: '/forgot-password' },
  { name: 'OTP Verification', path: '/otp' },
  { name: 'New Password', path: '/new-password' },
  { name: 'Account', path: '/accounts' },
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredButtons = navigationButtons.filter(button =>
    button.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box maxWidth="500px" margin="auto" px={4} py={8}>
      <VStack spacing={8} align="stretch">
        <VStack spacing={6}>
          <Image 
            src="/Inspeqt-Logo.svg" 
            alt="Inspeqt Logo" 
            width="60px"
            height="60px"
            margin="0 auto"
            borderRadius="12px"
          />
          <Heading as="h1" size="lg" textAlign="center" color="gray.600">
            Inspeqt App Navigation
          </Heading>
        </VStack>
        <Text textAlign="center" color="gray.600" fontSize="sm">
          This page is for development purposes only.
        </Text>
        <Input 
          placeholder="Search pages..." 
          value={searchQuery}
          onChange={handleSearch}
          size="lg"
          focusBorderColor="brand.400"
        />
        <VStack spacing={4}>
          {filteredButtons.map((button, index) => (
            <Button
              key={index}
              colorScheme="brand"
              size="lg"
              width="100%"
              onClick={() => navigate(button.path)}
            >
              {button.name}
            </Button>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default HomePage;
