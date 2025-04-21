import React from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { BsClock } from 'react-icons/bs';
import { BiErrorCircle } from 'react-icons/bi';
import NotificationMessage from './NotificationMessage';

const NotificationDrawer = ({ onClose }) => {
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const notifications = [
    {
      image: 'https://via.placeholder.com/40x40',
      message: 'Electrical Inspection for ABC Bank is ready for review.',
      timestamp: '2h ago',
      ctaText: 'Review',
      onCtaClick: () => console.log('Review clicked'),
      isRead: false,
      highlightedText: 'ABC Bank',
    },
    {
      icon: BiErrorCircle,
      iconColor: 'red.500',
      message: 'Your account was logged in on a different device. If this wasn\'t you, please secure your account.',
      timestamp: '2h ago',
      ctaText: 'Change Password',
      onCtaClick: () => console.log('Change Password clicked'),
      isRead: false,
    },
    {
      icon: BsClock,
      iconColor: 'blue.500',
      message: 'The Electrical Inspection for ABC Bank is still pending for review.',
      timestamp: '2h ago',
      ctaText: 'Review',
      onCtaClick: () => console.log('Review clicked'),
      isRead: true,
      highlightedText: 'ABC Bank',
    },
    {
      image: 'https://via.placeholder.com/40x40',
      message: 'A new auditor, Jane Smith, has been successfully onboarded to your team.',
      timestamp: '2h ago',
      isRead: true,
      highlightedText: 'Jane Smith',
    },
  ];

  return (
    <Box
      w={{ base: 'full', md: '686px' }}
      h="1231px"
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
      borderTopLeftRadius="15px"
      borderTopRightRadius="15px"
      overflow="hidden"
      display="flex"
      flexDirection="column"
    >
      <Flex
        px={6}
        py={4}
        borderBottom="1px"
        borderColor={borderColor}
        justify="space-between"
        align="center"
      >
        <Text
          fontSize="18px"
          fontWeight="700"
          lineHeight="28px"
          color={useColorModeValue('gray.700', 'white')}
        >
          Your Notifications
        </Text>
        <Flex align="center" gap={9}>
          <Text
            fontSize="14px"
            color={useColorModeValue('gray.600', 'gray.400')}
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
            onClick={() => console.log('Mark all as read')}
          >
            Mark all as read
          </Text>
          <IconButton
            icon={<CloseIcon w={3} h={3} />}
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close notifications"
          />
        </Flex>
      </Flex>

      <Box flex="1" overflowY="auto" px={6} py={6}>
        <VStack spacing={6} align="stretch">
          {notifications.map((notification, index) => (
            <NotificationMessage
              key={index}
              {...notification}
            />
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default NotificationDrawer;
