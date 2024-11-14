import React from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  IconButton,
  Avatar,
  Divider,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft02Icon,
  UserIcon,
  Mail01Icon,
  SmartPhone01Icon,
  Location01Icon,
  Calendar02Icon
} from 'hugeicons-react';

const AccountPage = () => {
  const navigate = useNavigate();

  const userInfo = {
    name: "Amit Singh",
    role: "Senior Inspector, CSC",
    userId: "AGU0001",
    email: "amitsingh@agnext.in",
    phone: "+91 698 654 3654",
    address: "C-184, Industrial Area, Sector 75, Sahibzada Ajit Singh Nagar, Punjab 140308",
    joiningDate: "23 May 2023"
  };

  const InfoItem = ({ icon, title, value, noDivider }) => (
    <Box w="full">
      <HStack px={4} py={4} spacing={4} alignItems="flex-start">
        <Box color="brand.700" w="24px">
          {icon}
        </Box>
        <VStack align="start" spacing={2} flex={1}>
          <Text
            color="#191C1A"
            fontSize="16px"
            fontFamily="Roboto"
            letterSpacing="0.5px"
          >
            {title}
          </Text>
          <Text
            color="#414942"
            fontSize="14px"
            fontFamily="Roboto"
            fontWeight="400"
            lineHeight="24px"
            letterSpacing="0.25px"
          >
            {value}
          </Text>
        </VStack>
      </HStack>
      {!noDivider && <Divider borderColor="#C0C9C0" />}
    </Box>
  );

  return (
    <Container maxW="400px" p={0} bg="white" minH="100vh">
      {/* Top Bar */}
      <Box 
        h="56px" 
        borderBottom="1px solid" 
        borderColor="gray.200"
        display="flex"
        alignItems="center"
        px={2}
      >
        <IconButton
          icon={<ArrowBackIcon />}
          variant="ghost"
          color="gray.600"
          onClick={() => navigate(-1)}
        />
        <Text
          ml={2}
          fontSize="20px"
          fontWeight="500"
          color="gray.700"
        >
          Account
        </Text>
      </Box>

      {/* Profile Section */}
      <HStack px={4} py={6} spacing={4}>
        <Avatar
          size="xl"
          name={userInfo.name}
          src="https://via.placeholder.com/90x90"
        />
        <VStack align="start" spacing={1}>
          <Text
            fontSize="22px"
            fontWeight="500"
            color="#464A51"
          >
            {userInfo.name}
          </Text>
          <Text
            fontSize="14px"
            color="#464A51"
            letterSpacing="0.25px"
          >
            {userInfo.role}
          </Text>
        </VStack>
      </HStack>

      {/* Info Items */}
      <VStack spacing={0} align="stretch">
        <InfoItem
          icon={<UserIcon size={24} />}
          title="User ID"
          value={userInfo.userId}
        />
        <InfoItem
          icon={<Mail01Icon size={24} />}
          title="Email"
          value={userInfo.email}
        />
        <InfoItem
          icon={<SmartPhone01Icon size={24} />}
          title="Phone number"
          value={userInfo.phone}
        />
        <InfoItem
          icon={<Location01Icon size={24} />}
          title="Address"
          value={userInfo.address}
        />
        <InfoItem
          icon={<Calendar02Icon size={24} />}
          title="Date of joining"
          value={userInfo.joiningDate}
          noDivider
        />
      </VStack>

      {/* Bottom Handle */}
      <Box 
        position="fixed" 
        bottom={0} 
        left={0} 
        right={0} 
        h="24px"
        bg="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
        maxW="400px"
        mx="auto"
      >
        <Box w="108px" h="4px" bg="gray.500" borderRadius="12px" />
      </Box>
    </Container>
  );
};

export default AccountPage; 