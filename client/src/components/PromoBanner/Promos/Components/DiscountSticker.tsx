import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

interface Props {
  discountPerc?: number;
  bgColor?: string;
  textColor?: string;
  boxShadow?: string;
}

const DiscountSticker: React.FC<Props> = ({
  discountPerc,
  bgColor,
  textColor,
  boxShadow,
}) => {
  const discount = (() => {
    if (discountPerc === 0) return null;

    if (discountPerc) {
      return discountPerc;
    }

    return 50;
  })();

  return (
    <Flex
      position="relative"
      margin="0 auto"
      width={{ base: '100px', md: '160px' }}
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bgColor={bgColor || '#FF0000'}
        position="absolute"
        width={{ base: '100px', md: '160px' }}
        height={{ base: '100px', md: '160px' }}
        borderRadius="100%"
        boxShadow={boxShadow}
        sx={{
          transform: {
            base: 'translate(0px, -50%)',
            md: 'translate(0px, -50%)',
          },
          top: '50%',
          left: '0%',
        }}
      />

      <Flex
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        justifyContent="center"
      >
        <Text
          color={textColor || 'sale.dark_blue'}
          zIndex={10}
          fontSize={{ base: '12px', md: '16px' }}
          lineHeight={{ base: '16px', md: '20px' }}
          fontWeight="600"
        >
          SAVE UP TO
        </Text>
        <Text
          zIndex={10}
          color={textColor || 'sale.dark_blue'}
          fontSize={{ base: '32px', md: '56px' }}
          lineHeight={{ base: '32px', md: '60px' }}
          fontWeight="700"
          fontFamily="Inter"
          opacity={!discount ? 0 : 100}
          transition="opacity 0.5s ease-in-out"
        >
          {discount}%
        </Text>
      </Flex>
    </Flex>
  );
};

export default DiscountSticker;
