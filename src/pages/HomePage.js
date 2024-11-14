import React, { useState } from 'react';
import { Box, VStack, Input, Button, Heading, Text, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';

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
        <Box position="relative">
          <IconButton
            icon={<ArrowBackIcon />}
            position="absolute"
            left={0}
            top={0}
            variant="ghost"
            onClick={() => navigate('/login')}
            aria-label="Back to login"
          />
          <Heading as="h1" size="lg" textAlign="center" color="brand.700">
            Development Navigation
          </Heading>
        </Box>
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
