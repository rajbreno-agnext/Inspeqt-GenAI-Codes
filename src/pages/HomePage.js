import React, { useState } from 'react';
import { Box, VStack, Input, Button, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const navigationButtons = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Create Job', path: '/create-job' },
  // Add more navigation buttons here as needed
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
    <Box maxWidth="400px" margin="auto" px={4} py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Navigate Inspeqt Page
        </Heading>
        <Input 
          placeholder="Search pages..." 
          value={searchQuery}
          onChange={handleSearch}
          size="lg"
        />
        <Text textAlign="center" color="gray.500">
          Search for pages or select from the options below
        </Text>
        <VStack spacing={4}>
          {filteredButtons.map((button, index) => (
            <Button
              key={index}
              colorScheme="teal"
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
