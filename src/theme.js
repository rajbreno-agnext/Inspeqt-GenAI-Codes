import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      50: '#FAF5FF',
      100: '#E9D8FD',
      200: '#D6BCFA',
      300: '#B794F4',
      400: '#9F7AEA',
      500: '#805AD5',
      600: '#6B46C1',
      700: '#553C9A',
      800: '#44337A',
      900: '#322659',
    },
  },
  fonts: {
    heading: '"Avenir Next", sans-serif',
    body: '"Open Sans", sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      variants: {
        solid: (props) => ({
          bg: props.colorScheme === 'brand' ? 'brand.700' : undefined,
          color: props.colorScheme === 'brand' ? 'white' : undefined,
          _hover: {
            bg: props.colorScheme === 'brand' ? 'brand.800' : undefined,
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
  },
})

export default theme
