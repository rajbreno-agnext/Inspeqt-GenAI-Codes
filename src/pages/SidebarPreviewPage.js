import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';

const SidebarPreviewPage = () => {
  return (
    <Box>
      <Sidebar />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Text fontSize="2xl" fontWeight="bold">
          Sidebar Preview
        </Text>
        <Text mt="4">
          This page showcases the Sidebar component. On desktop, you'll see the full sidebar. 
          On mobile devices, use the hamburger menu to open the sidebar.
        </Text>
      </Box>
    </Box>
  );
};

export default SidebarPreviewPage;
