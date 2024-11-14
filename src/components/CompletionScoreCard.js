import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { PieChart, Pie, Cell } from 'recharts';

export const CompletionScoreCard = ({ score }) => {
  const data = [
    { value: score },
    { value: 100 - score }
  ];

  return (
    <Box
      w="full"
      p={5}
      bg="linear-gradient(135deg, #0A4E18 0%, #166D5D 100%)"
      borderRadius="16px"
      color="white"
      boxShadow="0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
    >
      <HStack justify="space-between" mb={6}>
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
        <Box h="240px" position="relative" w="full" display="flex" justifyContent="center">
          <PieChart width={340} height={240}>
            <Pie
              data={data}
              cx={165}
              cy={130}
              startAngle={180}
              endAngle={0}
              innerRadius={110}
              outerRadius={135}
              paddingAngle={0}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill="#FFFFFF" />
              <Cell fill="rgba(255, 255, 255, 0.1)" />
            </Pie>
          </PieChart>
          <VStack 
            position="absolute" 
            top="50%" 
            left="50%" 
            transform="translate(-50%, -50%)"
            spacing={0}
          >
            <Text fontSize="32px" fontWeight="700">
              {score}%
            </Text>
            <Text fontSize="18px" color="whiteAlpha.700">
              Score
            </Text>
          </VStack>
          <Text
            position="absolute"
            bottom={20}
            left={10}
            fontSize="14px"
            color="whiteAlpha.700"
          >
            0
          </Text>
          <Text
            position="absolute"
            bottom={20}
            right={8}
            fontSize="14px"
            color="whiteAlpha.700"
          >
            100
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}; 