import React from 'react';
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Textarea,
  Button,
  HStack,
  Icon,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronDownIcon, InfoIcon, BellIcon, HamburgerIcon } from '@chakra-ui/icons';

const CreateJobPage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box maxWidth="800px" margin="auto" px={4}>
      <Flex justifyContent="space-between" alignItems="center" py={4} borderBottom="1px" borderColor="gray.200">
        <Flex alignItems="center">
          <IconButton
            icon={<ChevronLeftIcon />}
            variant="outline"
            mr={2}
            aria-label="Go back"
            color="gray.600"
            borderColor="gray.300"
          />
          <Text fontSize="md" color="gray.600">Jobs / <Text as="span" color="gray.700">Create Job</Text></Text>
        </Flex>
        <Flex alignItems="center">
          <IconButton
            icon={<HamburgerIcon />}
            variant="ghost"
            mr={4}
            aria-label="More options"
            color="gray.500"
          />
          <IconButton
            icon={<BellIcon />}
            variant="ghost"
            mr={4}
            aria-label="Notifications"
            color="gray.500"
          />
          <Menu>
            <MenuButton as={Button} variant="ghost" p={0}>
              <Avatar size="sm" src="https://bit.ly/broken-link" />
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <VStack spacing={6} align="stretch" bg="white" p={6} borderRadius="md" boxShadow="sm" my={4}>
        <FormControl>
          <FormLabel fontWeight="medium" color="gray.700">Job Name</FormLabel>
          <Input placeholder="Enter job name" color="gray.700" focusBorderColor="teal.500" />
        </FormControl>

        <HStack spacing={4} align="flex-start" flexDirection={isMobile ? "column" : "row"}>
          <FormControl flex={1} mb={isMobile ? 4 : 0}>
            <FormLabel fontWeight="medium" color="gray.700">Client *</FormLabel>
            <Select placeholder="Select" icon={<ChevronDownIcon color="gray.500" />} color="gray.700" focusBorderColor="teal.500" />
          </FormControl>

          <FormControl flex={1}>
            <FormLabel fontWeight="medium" color="gray.700">Priority *</FormLabel>
            <Select placeholder="Select" icon={<ChevronDownIcon color="gray.500" />} color="gray.700" focusBorderColor="teal.500" />
          </FormControl>
        </HStack>

        <FormControl>
          <FormLabel fontWeight="medium" color="gray.700">Location *</FormLabel>
          <Select placeholder="Select" icon={<ChevronDownIcon color="gray.500" />} color="gray.700" focusBorderColor="teal.500" />
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="medium" color="gray.700">Recurrence *</FormLabel>
          <Select placeholder="Select" icon={<ChevronDownIcon color="gray.500" />} color="gray.700" focusBorderColor="teal.500" />
        </FormControl>

        <HStack spacing={4} align="flex-start" flexDirection={isMobile ? "column" : "row"}>
          <FormControl flex={1} mb={isMobile ? 4 : 0}>
            <FormLabel fontWeight="medium" color="gray.700">Start Date & Time *</FormLabel>
            <Input
              type="datetime-local"
              color="gray.700"
              focusBorderColor="teal.500"
            />
          </FormControl>

          <FormControl flex={1}>
            <FormLabel fontWeight="medium" color="gray.700">Due Date & Time *</FormLabel>
            <Input
              type="datetime-local"
              color="gray.700"
              focusBorderColor="teal.500"
            />
          </FormControl>
        </HStack>

        <HStack spacing={1} alignItems="center">
          <Checkbox colorScheme="teal">Allow jobs to be submitted after the due date</Checkbox>
          <IconButton
            icon={<InfoIcon />}
            variant="ghost"
            size="sm"
            aria-label="More information"
            color="gray.400"
          />
        </HStack>

        <FormControl>
          <FormLabel fontWeight="medium" color="gray.700">Description</FormLabel>
          <Textarea placeholder="Enter job description" color="gray.700" focusBorderColor="teal.500" />
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="medium" color="gray.700">Workflow *</FormLabel>
          <Select placeholder="Select" icon={<ChevronDownIcon color="gray.500" />} color="gray.700" focusBorderColor="teal.500" />
        </FormControl>

        <Flex justifyContent="flex-end" mt={6} flexDirection={isMobile ? "column" : "row"}>
          <Button variant="outline" mb={isMobile ? 2 : 0} mr={isMobile ? 0 : 3} color="gray.500" borderColor="gray.300" width={isMobile ? "100%" : "auto"}>
            Save as Draft
          </Button>
          <Button colorScheme="teal" width={isMobile ? "100%" : "auto"}>Create Job</Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default CreateJobPage;
