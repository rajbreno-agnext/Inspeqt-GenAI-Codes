import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const NotificationMessage = ({
  image,
  icon: Icon,
  iconColor,
  message,
  timestamp,
  ctaText,
  onCtaClick,
  isRead,
  highlightedText,
}) => {
  const bgColorLight = isRead ? 'white' : 'gray.50';
  const bgColorDark = 'gray.800';
  const iconBgColorLight = 'white';
  const iconBgColorDark = 'gray.700';
  const iconFinalColorLight = iconColor;
  const iconFinalColorDark = `${iconColor}.300`;
  const textColorLight = 'gray.700';
  const textColorDark = 'gray.200';
  const timestampColorLight = 'gray.500';
  const timestampColorDark = 'gray.400';

  const bgColor = useColorModeValue(bgColorLight, bgColorDark);
  const iconBgColor = useColorModeValue(iconBgColorLight, iconBgColorDark);
  const iconFinalColor = useColorModeValue(iconFinalColorLight, iconFinalColorDark);
  const textColor = useColorModeValue(textColorLight, textColorDark);
  const timestampColor = useColorModeValue(timestampColorLight, timestampColorDark);

  return (
    <Flex
      p={3}
      bg={bgColor}
      borderRadius="8px"
      gap={3}
      align="flex-start"
      w="100%"
    >
      <Box
        w="40px"
        h="40px"
        borderRadius="8px"
        overflow="hidden"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg={Icon ? iconBgColor : 'transparent'}
      >
        {image ? (
          <Image
            src={image}
            alt="notification"
            w="100%"
            h="100%"
            objectFit="cover"
            borderRadius="6px"
          />
        ) : Icon ? (
          <Icon size={24} color={iconColor ? iconFinalColor : undefined} />
        ) : null}
      </Box>

      <Flex direction="column" flex={1} gap={3}>
        <Box>
          <Text
            fontSize="16px"
            fontWeight={isRead ? "400" : "500"}
            lineHeight="24px"
            color={textColor}
            mb={1.5}
          >
            {message.split(highlightedText).map((part, index, array) => (
              <React.Fragment key={index}>
                {part}
                {index < array.length - 1 && (
                  <Text as="span" color="teal.500">
                    {highlightedText}
                  </Text>
                )}
              </React.Fragment>
            ))}
          </Text>
          <Text
            fontSize="14px"
            color={timestampColor}
            lineHeight="21px"
          >
            {timestamp}
          </Text>
        </Box>

        {ctaText && (
          <Box>
            <Button
              size="sm"
              colorScheme="teal"
              onClick={onCtaClick}
              px={3}
              height="32px"
              fontSize="14px"
              fontWeight="600"
            >
              {ctaText}
            </Button>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

NotificationMessage.propTypes = {
  image: PropTypes.string,
  icon: PropTypes.elementType,
  iconColor: PropTypes.string,
  message: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  ctaText: PropTypes.string,
  onCtaClick: PropTypes.func,
  isRead: PropTypes.bool,
  highlightedText: PropTypes.string,
};

NotificationMessage.defaultProps = {
  isRead: false,
  highlightedText: '',
};

export default NotificationMessage;
