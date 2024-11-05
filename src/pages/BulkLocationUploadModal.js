import React from 'react';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text,
  Flex,
  Avatar,
  Button,
  Icon,
  VStack,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { FiEdit, FiUpload, FiDownloadCloud, FiExternalLink } from 'react-icons/fi';

const BulkLocationUploadModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const steps = [
    {
      step: 'Step 1',
      title: 'Copy Template',
      description: 'Copy Template in Google Sheets',
      icon: FiDownloadCloud,
      bgColor: 'purple.100',
    },
    {
      step: 'Step 2',
      title: 'Add details',
      description: 'Add locations in the template',
      icon: FiEdit,
      bgColor: 'orange.100',
    },
    {
      step: 'Step 3',
      title: 'Upload',
      description: 'Download and upload CSV file.',
      icon: FiUpload,
      bgColor: 'teal.100',
    },
  ];

  const importantPoints = [
    'Use the provided template to enter locations details.',
    "Don't add new columns or edit column headers.",
    'Only CSV files will be accepted.',
    'Location Name, Location Type, Address Line 1, State, City and Pin Code are required fields.',
  ];

  return (
    <Box position="fixed" top={0} left={0} right={0} bottom={0} zIndex="modal">
      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        size={{ base: "full", md: "4xl" }} 
        isCentered={{ base: false, md: true }}
        motionPreset={{ base: "slideInBottom", md: "scale" }}
      >
        <ModalOverlay />
        <ModalContent 
          maxW={{ base: "100%", md: "900px" }} 
          my={{ base: 0, md: "auto" }}
          minH={{ base: "100vh", md: "auto" }}
          borderRadius={{ base: 0, md: "lg" }}
          position={{ base: "absolute", md: "relative" }}
          top={{ base: 0, md: "auto" }}
          mb={{ base: 0, md: "auto" }}
        >
          <ModalHeader borderBottomWidth="1px" py={4}>
            <Flex direction="column" gap={1}>
              <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
                Bulk Location Upload
              </Text>
              <Flex align="center" gap={2}>
                <Text color="gray.500" fontSize="sm">
                  Client:
                </Text>
                <Flex align="center" gap={2}>
                  <Avatar size="sm" src="https://via.placeholder.com/24x24" name="Butter Bank" />
                  <Text color="gray.600" fontSize="sm" fontWeight="medium">
                    Butter Bank
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody py={6}>
            <VStack spacing={{ base: 6, md: 9 }} align="stretch">
              <Flex 
                bg="gray.50" 
                p={{ base: 4, md: 6 }} 
                borderRadius="lg" 
                gap={{ base: 4, md: 6 }}
                direction={{ base: "column", md: "row" }}
              >
                {steps.map((step, index) => (
                  <Flex 
                    key={index} 
                    flex={1} 
                    gap={4}
                    mb={{ base: index !== steps.length - 1 ? 4 : 0, md: 0 }}
                  >
                    <Box p={2} bg={step.bgColor} borderRadius="lg" height="40px" width="40px" display="flex" alignItems="center" justifyContent="center">
                      <Icon as={step.icon} boxSize={5} color="gray.600" />
                    </Box>
                    <Box>
                      <Text color="gray.500" fontSize="xs" mb={2}>
                        {step.step}
                      </Text>
                      <Text color="gray.700" fontSize="md" fontWeight="medium" mb={1}>
                        {step.title}
                      </Text>
                      <Text color="gray.600" fontSize="sm">
                        {step.description}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </Flex>

              <Box>
                <Text color="gray.700" fontSize="md" fontWeight="medium" mb={4}>
                  Important!
                </Text>
                <VStack align="stretch" spacing={3}>
                  {importantPoints.map((point, index) => (
                    <HStack 
                      key={index} 
                      spacing={3}
                      alignItems="flex-start"
                    >
                      <Box w="2px" h="2px" bg="gray.600" borderRadius="full" mt={2} />
                      <Text color="gray.600" fontSize="sm">
                        {point}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              <Button
                variant="outline"
                leftIcon={<Icon as={FiExternalLink} />}
                size={{ base: "md", md: "md" }}
                width="fit-content"
                px={{ base: 4, md: 6 }}
              >
                Copy Template in Google Sheets
              </Button>
            </VStack>
          </ModalBody>

          <ModalFooter 
            borderTopWidth="1px"
            flexDirection={{ base: "column", sm: "row" }}
            gap={{ base: 2, sm: 0 }}
          >
            <Button 
              colorScheme="teal" 
              size={{ base: "md", md: "md" }}
              px={8}
              w={{ base: "100%", sm: "auto" }}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BulkLocationUploadModal; 