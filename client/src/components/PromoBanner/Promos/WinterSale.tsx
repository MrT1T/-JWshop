import React, { useMemo } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

import DiscountSticker from './Components/DiscountSticker';
import { useCountdown } from '../hooks/useCountdown';
import { formatNumberToDwoDigits } from '../utils';

type Props = {
  sticky?: boolean;
};

const TimeUnit: React.FC<{ timeUnit: string | number }> = ({ timeUnit }) => (
  <Text
    fontFamily="Inter"
    sx={{
      fontSize: { base: '20px', md: '24px' },
      lineHeight: { base: '28px', md: '32px' },
    }}
    fontWeight="700"
    color="white"
  >
    {timeUnit}
  </Text>
);

const Header: React.FC<Props> = ({ sticky }) => {
  const targetDate = useMemo(
    () => new Date(new Date().getTime() + 90000000),
    [],
  );

  const { hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <Box
      bgImage={{
        base: `url(/images/sale/winterSale/mobile.webp)`,
        md: `url(/images/sale/winterSale/default.webp)`,
      }}
      bgPosition="center"
      bgSize="cover"
      backgroundColor="blue"
      sx={{
        top: 0,
        height: { base: '4rem', md: '5rem' },
        display: 'flex',
        position: sticky ? 'sticky' : 'relative',
      }}
    >
      <Box
        padding="0"
        sx={{
          margin: { lg: '0 0 0 18%', '2xl': '0 0% 0 15%' },
          width: '100%',
        }}
      >
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: { base: 'space-between', md: 'space-around' },
          }}
          overflow="hidden"
        >
          <Text
            textStyle="paragraph4"
            sx={{
              display: { base: 'none', md: 'block' },
              fontSize: '2rem',
              lineHeight: '2.5rem',
              fontWeight: 700,
              color: 'white',
              zIndex: 100,
            }}
          >
            LIMITED WINTER SALE
          </Text>
          <Flex
            sx={{
              display: { base: 'none', md: 'flex' },
              h: '5rem',
            }}
          >
            <DiscountSticker textColor="white" bgColor="cyan.200" />
          </Flex>
          <Flex
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              m: { base: '2px 0 0 50px', md: '0' },
              minWidth: '190px',
            }}
          >
            <Text
              textStyle="paragraph4"
              sx={{
                display: { base: 'block', md: 'none' },
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 700,
                color: 'white',
                zIndex: 100,
              }}
            >
              LIMITED WINTER SALE
            </Text>
            <Flex>
              <TimeUnit timeUnit={formatNumberToDwoDigits(hours)} />
              <Text
                fontFamily="Larken"
                sx={{
                  fontSize: { base: '20px', md: '24px' },
                  lineHeight: { base: '28px', md: '32px' },
                }}
                fontWeight="medium"
                color="white"
              >
                :
              </Text>
              <TimeUnit timeUnit={formatNumberToDwoDigits(minutes)} />
              <Text
                fontFamily="Larken"
                sx={{
                  fontSize: { base: '20px', md: '24px' },
                  lineHeight: { base: '28px', md: '32px' },
                }}
                fontWeight="medium"
                color="white"
              >
                :
              </Text>
              <TimeUnit timeUnit={formatNumberToDwoDigits(seconds)} />
            </Flex>
          </Flex>
          <Flex
            sx={{
              display: { base: 'flex', md: 'none' },
              h: '64px',
              minWidth: '100px',
            }}
            mr="12px"
          >
            <DiscountSticker textColor="white" bgColor="cyan.200" />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
