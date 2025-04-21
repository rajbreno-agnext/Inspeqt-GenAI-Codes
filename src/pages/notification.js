import React from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import NotificationDrawer from '../components/notifications/NotificationDrawer';

const NotificationPage = () => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    <Box 
      minH="100vh" 
      bg="gray.50" 
      position="relative"
    >
      <Box
        position="fixed"
        right="0"
        top="0"
        height="100vh"
        zIndex={1000}
      >
        {isOpen && <NotificationDrawer onClose={onClose} />}
      </Box>
    </Box>
  );
};

export default NotificationPage;
