import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { HiOutlineInformationCircle } from 'react-icons/hi';

export const CompletionScoreCard = ({ score }) => {
  const radius = 135;
  const circumference = Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  
  return (
    <Box
      w="full"
      p={5}
      bgGradient="linear(135deg, brand.800, brand.600)"
      borderRadius="16px"
      color="white"
      boxShadow="0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
    >
      <HStack justify="space-between" mb={5}>
        <Text fontSize="16px" fontWeight="600">
          Completion Score
        </Text>
        <IconButton
          icon={<HiOutlineInformationCircle />}
          variant="ghost"
          color="whiteAlpha.800"
          size="sm"
        />
      </HStack>

      <VStack spacing={2} align="center">
        <Box h="190px" position="relative" w="full" display="flex" justifyContent="center">
          <Box position="relative" w="340px" h="190px">
            <svg
              width="340"
              height="190"
              viewBox="0 0 340 240"
            >
              {/* Background arc */}
              <path
                d="M 35,160 A 135,135 0 0,1 305,160"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="30"
                strokeLinecap="round"
                fill="none"
              />
              
              {/* Progress arc with gradient */}
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.8)" />
                </linearGradient>
              </defs>
              <path
                d="M 35,160 A 135,135 0 0,1 305,160"
                stroke="url(#progressGradient)"
                strokeWidth="30"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: offset,
                  transition: 'stroke-dashoffset 0.5s ease',
                  filter: 'drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.2))',
                }}
              />
            </svg>
          </Box>
          <VStack 
            position="absolute" 
            top="60%"
            left="50%" 
            transform="translate(-50%, -50%)"
            spacing={1}
          >
            <Text 
              fontSize="30px"
              fontWeight="700"
              letterSpacing="0.5px"
            >
              {score}%
            </Text>
            <Text 
              fontSize="16px"
              color="whiteAlpha.800"
              letterSpacing="0.5px"
            >
              Score
            </Text>
          </VStack>
          <Text
            position="absolute"
            bottom={2}
            left={12}
            fontSize="16px"
            color="whiteAlpha.800"
          >
            0
          </Text>
          <Text
            position="absolute"
            bottom={2}
            right={10}
            fontSize="16px"
            color="whiteAlpha.800"
          >
            100
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}; 