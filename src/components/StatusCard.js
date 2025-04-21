import React from 'react';
import {
  Box,
  HStack,
  Text,
  Icon,
  Circle,
} from '@chakra-ui/react';
import { ArrowDown01Icon } from 'hugeicons-react';

export const StatusCard = ({ title, count, icon, bgColor, iconColor }) => {
  return (
    <Box
      w="full"
      p={3}
      bg="white"
      borderRadius="12px"
      borderWidth="1px"
      borderColor="gray.100"
      boxShadow="0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
    >
      <HStack justify="space-between">
        <HStack spacing={4}>
          <Circle size="40px" bg={bgColor}>
            <Icon as={icon} color={iconColor} boxSize={5} />
          </Circle>
          <Text fontSize="14px" fontWeight="500" color="gray.600">
            {title}
          </Text>
        </HStack>
        <HStack spacing={4}>
          <Text fontSize="16px" fontWeight="600" color="gray.800">
            {count}
          </Text>
          <Icon as={ArrowDown01Icon} color="gray.600" transform="rotate(-90deg)" />
        </HStack>
      </HStack>
    </Box>
  );
}; 