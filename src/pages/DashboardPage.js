import React from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  IconButton,
  Flex,
  Circle,
} from '@chakra-ui/react';
import { 
  Menu02Icon,
  Search01Icon,
  Home01Icon,
  Note01Icon,
  Notification01Icon,
  UserIcon,
  Alert01Icon,
  Clock04Icon,
  Calendar03Icon,
  CheckmarkCircle02Icon
} from 'hugeicons-react';
import { CompletionScoreCard } from '../components/CompletionScoreCard';
import { StatusCard } from '../components/StatusCard';
import { useStatusBarColor } from '../hooks/useStatusBarColor';

const DashboardPage = () => {
  const [score, setScore] = React.useState(0);
  
  React.useEffect(() => {
    // Increased initial delay slightly for better visual effect
    const timer = setTimeout(() => {
      setScore(70.3);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  useStatusBarColor("#f4f4f669");

  const statusItems = [
    { 
      title: 'Overdue', 
      count: 2, 
      icon: Alert01Icon,
      bgColor: '#FFF5F5',
      iconColor: '#C53030' 
    },
    { 
      title: 'In Progress', 
      count: 6, 
      icon: Clock04Icon,
      bgColor: '#EBF8FF',
      iconColor: '#2B6CB0'
    },
    { 
      title: 'Scheduled', 
      count: 10, 
      icon: Calendar03Icon,
      bgColor: '#FFFAF0',
      iconColor: '#C05621'
    },
    { 
      title: 'Completed', 
      count: 103, 
      icon: CheckmarkCircle02Icon,
      bgColor: '#F0FFF4',
      iconColor: '#25855A'
    },
  ];

  return (
    <Container maxW="400px" p={0} bg="#f4f4f669" minH="100vh">
      {/* Top Bar - No border */}
      <Box 
        h="56px" 
        px={2}
        display="flex"
        alignItems="center"
        zIndex={10}
      >
        <Flex align="center" flex={1}>
          <IconButton
            icon={<Menu02Icon size={24} />}
            variant="ghost"
            color="gray.600"
            mr={1}
          />
          <Text
            fontSize="20px"
            fontWeight="500"
            color="gray.700"
          >
            Home
          </Text>
        </Flex>
        <HStack spacing={2}>
          <IconButton
            icon={<Search01Icon size={24} />}
            variant="ghost"
            color="gray.600"
          />
          <Box position="relative">
            <IconButton
              icon={<Notification01Icon size={24} />}
              variant="ghost"
              color="gray.600"
            />
            <Circle 
              size="6px" 
              bg="red.400" 
              position="absolute" 
              top={2} 
              right={2}
            />
          </Box>
        </HStack>
      </Box>

      {/* Content no longer needs top padding since header isn't fixed */}
      <Box>
        {/* Welcome Section */}
        <VStack px={4} pt={8} pb={8} align="center" spacing={1}>
          <Text
            fontSize="28px"
            fontWeight="600"
            color="gray.700"
            lineHeight="36px"
          >
            Hi, Amit 👋
          </Text>
          <Text
            fontSize="16px"
            color="gray.600"
            letterSpacing="0.5px"
          >
            Welcome back!
          </Text>
        </VStack>

        {/* Main Content */}
        <VStack px={4} spacing={6} pb="80px"> {/* Added bottom padding for navigation bar */}
          <CompletionScoreCard score={score} />
          <VStack spacing={3} width="100%" mb={4}>
            {statusItems.map((item, index) => (
              <StatusCard key={index} {...item} />
            ))}
          </VStack>
        </VStack>
      </Box>

      {/* Navigation Bar - remains unchanged */}
      <Box 
        position="fixed" 
        bottom={0} 
        left={0} 
        right={0}
        maxW="400px"
        mx="auto"
        borderTop="1px solid"
        borderColor="gray.200"
        bg="white"
        px={2}
        py={3}
      >
        <Flex justify="space-between">
          <VStack flex={1} spacing={1}>
            <Home01Icon size={24} color="#2D3748" />
            <Text fontSize="12px" color="gray.700" fontWeight="500">Home</Text>
          </VStack>
          <VStack flex={1} spacing={1}>
            <Note01Icon size={24} color="#2D3748" />
            <Text fontSize="12px" color="gray.600" fontWeight="500">Inspections</Text>
          </VStack>
          <VStack flex={1} spacing={1}>
            <UserIcon size={24} color="#4A5568" />
            <Text fontSize="12px" color="gray.600" fontWeight="500">Account</Text>
          </VStack>
        </Flex>
      </Box>
    </Container>
  );
};

export default DashboardPage; 