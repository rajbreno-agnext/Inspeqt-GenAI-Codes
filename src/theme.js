import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      50: '#E6FFFA',
      100: '#B2F5EA',
      200: '#81E6D9',
      300: '#4FD1C5',
      400: '#38B2AC',
      500: '#319795',
      600: '#2C7A7B',
      700: '#285E61',
      800: '#234E52',
      900: '#1D4044',
    },
  },
  fonts: {
    heading: '"Avenir Next", sans-serif',
    body: '"Open Sans", sans-serif',
  },
  components: {
    Button: {
      // Custom styles for Button
      baseStyle: {
        fontWeight: 'bold',
      },
      variants: {
        solid: (props) => ({
          bg: props.colorScheme === 'brand' ? 'brand.500' : undefined,
          _hover: {
            bg: props.colorScheme === 'brand' ? 'brand.600' : undefined,
          },
        }),
      },
    },
    IconButton: {
      variants: {
        ghost: {
          _hover: {
            bg: 'gray.100',
          },
        },
      },
    },
    Menu: {
      baseStyle: {
        list: {
          boxShadow: 'md',
          borderRadius: 'md',
        },
        item: {
          _focus: {
            bg: 'brand.50',
          },
          _hover: {
            bg: 'brand.50',
          },
        },
      },
    },
    // Add more component style overrides here
  },
  // Add more theme customizations here
})

export default theme
