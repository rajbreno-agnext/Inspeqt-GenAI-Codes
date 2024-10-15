import React from 'react';
import {
  Box,
  Flex,
  VStack,
  IconButton,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useBreakpointValue,
  Icon,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FiGrid, FiSearch, FiUsers, FiUser, FiShare2, FiHelpCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SidebarContent = ({ onClose }) => {
  const menuItems = [
    { icon: FiGrid, text: 'Dashboard', path: '/dashboard' },
    { icon: FiSearch, text: 'Inspections', path: '/inspections' },
    { icon: FiUsers, text: 'Clients', path: '/clients' },
    { icon: FiUser, text: 'Users', path: '/users' },
    { icon: FiShare2, text: 'Workflow', path: '/workflow' },
    { icon: FiHelpCircle, text: 'Support', path: '/support' },
  ];

  return (
    <VStack align="stretch" spacing={2}>
      {menuItems.map((item, index) => (
        <Flex
          key={index}
          align="center"
          p={3}
          mx={3}
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'brand.500',
            color: 'white',
          }}
          onClick={onClose}
        >
          <Icon as={item.icon} mr={4} fontSize="16" />
          <Text>{item.text}</Text>
        </Flex>
      ))}
    </VStack>
  );
};

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<HamburgerIcon />}
      />

      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" color="brand.700">Inspeqt</DrawerHeader>
          <DrawerBody>
            <SidebarContent onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Box
        display={{ base: 'none', md: 'block' }}
        w="240px"
        bg="white"
        borderRight="1px"
        borderRightColor="gray.200"
        h="100vh"
        position="fixed"
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Inspeqt
          </Text>
        </Flex>
        <SidebarContent />
      </Box>
    </Box>
  );
};

export default Sidebar;
