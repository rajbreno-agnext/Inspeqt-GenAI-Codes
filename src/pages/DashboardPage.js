import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Flex,
  Icon,
  IconButton,
  Spacer,
} from '@chakra-ui/react';
import { FiBell, FiSearch, FiCalendar, FiClock, FiCheckCircle, FiInfo, FiChevronRight } from 'react-icons/fi';
import { RiHome5Line, RiFileList3Line, RiUser3Line } from 'react-icons/ri';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const completionScore = 80.3;

  const chartData = {
    datasets: [
      {
        data: [completionScore, 100 - completionScore],
        backgroundColor: ['#38A169', '#E2E8F0'],
        borderWidth: 0,
        cutout: '80%',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const navigate = useNavigate();

  return (
    <Box bg="gray.50" minHeight="100vh" maxWidth="400px" margin="0 auto">
      <VStack spacing={4} align="stretch" p={4}>
        {/* Header */}
        <Flex justifyContent="space-between" alignItems="center">
          <HStack spacing={3}>
            <IconButton
              icon={<HamburgerIcon />}
              variant="ghost"
              colorScheme="gray"
              aria-label="Menu"
            />
            <Text fontSize="xl" fontWeight="bold" color="gray.700">Home</Text>
          </HStack>
          <HStack spacing={3}>
            <IconButton
              icon={<FiSearch />}
              variant="ghost"
              colorScheme="gray"
              aria-label="Search"
            />
            <IconButton
              icon={<FiBell />}
              variant="ghost"
              colorScheme="gray"
              aria-label="Notifications"
            />
          </HStack>
        </Flex>

        {/* Greeting */}
        <VStack align="center" spacing={1} my={6}>
          <Text fontSize="2xl" fontWeight="bold" color="gray.700">
            Hi, Amit 👋
          </Text>
          <Text color="gray.500">Welcome back!</Text>
        </VStack>

        {/* Completion Score */}
        <Box bg="green.600" borderRadius="lg" p={4} color="white">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontWeight="bold">Completion Score</Text>
            <Icon as={FiInfo} />
          </Flex>
          <Box height="164px" position="relative">
            <Doughnut data={chartData} options={chartOptions} />
            <Flex
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Text fontSize="2xl" fontWeight="bold">
                {completionScore}%
              </Text>
              <Text fontSize="sm">Score</Text>
            </Flex>
          </Box>
        </Box>

        {/* Status Cards */}
        <VStack spacing={3} align="stretch">
          {[
            { icon: FiClock, label: 'Overdue', count: 2, color: 'red.500' },
            { icon: FiClock, label: 'In Progress', count: 6, color: 'blue.500' },
            { icon: FiCalendar, label: 'Scheduled', count: 10, color: 'orange.500' },
            { icon: FiCheckCircle, label: 'Completed', count: 103, color: 'green.500' },
          ].map((item, index) => (
            <Flex
              key={index}
              bg="white"
              p={3}
              borderRadius="xl"
              alignItems="center"
              boxShadow="sm"
            >
              <Icon as={item.icon} color={item.color} boxSize={5} mr={3} />
              <Text fontWeight="normal" color="gray.700">{item.label}</Text>
              <Spacer />
              <Text fontWeight="bold" color="gray.700">{item.count}</Text>
              <Icon as={FiChevronRight} ml={2} color="gray.400" />
            </Flex>
          ))}
        </VStack>
      </VStack>

      {/* Bottom Navigation */}
      <Flex
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bg="white"
        justifyContent="space-around"
        py={2}
        borderTopWidth={1}
        borderTopColor="gray.200"
        maxWidth="400px"
        margin="0 auto"
      >
        <VStack>
          <IconButton
            icon={<RiHome5Line />}
            variant="ghost"
            aria-label="Home"
            color="blue.500"
          />
          <Text fontSize="xs" color="blue.500">Home</Text>
        </VStack>
        <VStack>
          <IconButton
            icon={<RiFileList3Line />}
            variant="ghost"
            aria-label="Inspections"
            color="gray.500"
          />
          <Text fontSize="xs" color="gray.500">Inspections</Text>
        </VStack>
        <VStack>
          <IconButton
            icon={<RiUser3Line />}
            variant="ghost"
            aria-label="Account"
            color="gray.500"
            onClick={() => navigate('/accounts')}
          />
          <Text 
            fontSize="xs" 
            color="gray.500"
            onClick={() => navigate('/accounts')}
            cursor="pointer"
          >
            Account
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default DashboardPage;
