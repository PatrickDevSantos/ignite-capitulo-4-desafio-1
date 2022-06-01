import { Box, Flex, HStack, Image, Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './styles.module.css';

import { api } from "../services/api";
import Link from "next/link";
import { GetStaticProps } from "next";
import { Continent } from "../types";

interface HomeProps {
  continents: Continent[];
}

export default function Home({ continents }: HomeProps) {

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  }, 'lg')

  return (
    <Flex direction="column" align="center">
      <Header />

      <Box
        w="100%"
        h={[163, 163, 335]}
        position="relative"
        mt={["0", "0", "14"]}
        _before={{
          content: '""',
          bgImage: "/images/background.jpg",
          bgPos: "0 -1150px",
          pos: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          zIndex: -1,
        }}
        zIndex={1}
      >
        <Flex w="100%" h="100%" maxW={1480} alignItems="center" mx="auto" flexDir="row" zIndex={99}>
          <Flex flex="1" flexDir="column">
            <Text fontWeight={500} fontSize={["20px", "20px", "36px"]} lineHeight={["30px", "30px", "54px"]} color="#F5F8FA" pl={["4", "10", "36"]} >
              5 Continentes,<br />
              infinitas possibilidades.
            </Text>
            <Text fontWeight={400} fontSize={["14px", "14px", "20px"]} lineHeight={["21px", "21px", "30px"]} pt="4" color="#DADADA" pl={["4", "10", "36"]}>
              Chegou a hora de tirar do papel a viagem que você sempre sonhou.
            </Text>
          </Flex>
          {isWideVersion &&
            <Flex flex="1" pl="140px">
              <Image src="/images/airplane.svg" mt="28" />
            </Flex>
          }
        </Flex>
      </Box >

      <Flex w="100%" maxW={1480} mx="auto" mt={["4", "4", "14"]} pt="10">
        < HStack w="100%" gap="12" mx={["auto", "auto", "36"]} flexWrap="wrap" justify="center" justifyContent={["center", "center", "space-between"]} >
          <Flex flexDir={["row", "row", "column"]} align="center" h={["0", "0", "36"]} justify="center">
            {isWideVersion ? <Image src="/images/cocktail.svg" /> : <Box w="4" h="4" rounded="100%" bg="highlight.900" mr="2" />}
            <Text mt={["0", "0", "6"]} fontWeight="600" fontSize={["18px", "18px", "24px"]} color="#47585B" lineHeight="36px">Vida noturna</Text>
          </Flex>

          <Flex flexDir={["row", "row", "column"]} align="center" h={["0", "0", "36"]} justify="center">
            {isWideVersion ? <Image src="/images/surf.svg" /> : <Box w="4" h="4" rounded="100%" bg="highlight.900" mr="2" />}
            <Text mt={["0", "0", "6"]} fontWeight="600" fontSize={["18px", "18px", "24px"]} color="#47585B" lineHeight="36px">praia</Text>
          </Flex>

          <Flex flexDir={["row", "row", "column"]} align="center" h={["0", "0", "36"]} justify="center">
            {isWideVersion ? <Image src="/images/building.svg" /> : <Box w="4" h="4" rounded="100%" bg="highlight.900" mr="2" />}
            <Text mt={["0", "0", "6"]} fontWeight="600" fontSize={["18px", "18px", "24px"]} color="#47585B" lineHeight="36px">moderno</Text>
          </Flex>

          <Flex flexDir={["row", "row", "column"]} align="center" h={["0", "0", "36"]} justify="center">
            {isWideVersion ? <Image src="/images/museum.svg" /> : <Box w="4" h="4" rounded="100%" bg="highlight.900" mr="2" />}
            <Text mt={["0", "0", "6"]} fontWeight="600" fontSize={["18px", "18px", "24px"]} color="#47585B" lineHeight="36px">clássico</Text>
          </Flex>

          <Flex flexDir={["row", "row", "column"]} align="center" h={["0", "0", "36"]} justify="center">
            {isWideVersion ? <Image src="/images/earth.svg" /> : <Box w="4" h="4" rounded="100%" bg="highlight.900" mr="2" />}
            <Text mt={["0", "0", "6"]} fontWeight="600" fontSize={["18px", "18px", "24px"]} color="#47585B" lineHeight="36px">e mais...</Text>
          </Flex>
        </HStack>
      </Flex >

      <Flex w="100%" maxW={1480} justify="center" mt={["9", "9", "14"]}>
        <VStack w="90px" h="2px" bg="#47585B"></VStack>
      </Flex>

      <Flex w="100%" maxW={1480} justify="center" mt={["5", "5", "14"]}>
        <Text fontWeight={500} fontSize={["20px", "20px", "36px"]} lineHeight={["30px", "30px", "54px"]} color="#47585B" textAlign="center">
          Vamos nessa?<br />
          Então escolha seu continente
        </Text>
      </Flex>

      <Flex w="100%" maxW={1480} my={["5", "5", "14"]} h={["250", "250", "450"]} mx="24" position="relative">

        <Swiper
          navigation={{
            nextEl: `.swiper-button-next`,
            prevEl: `.swiper-button-prev`
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            type: 'bullets',
          }}
          modules={[Autoplay, Navigation, Pagination]}
          loop={true}
          autoplay={{
            delay: 50000,
            disableOnInteraction: false,
          }}
        >
          {continents.map(item => (
            <SwiperSlide key={item.id}>
              <Flex w="100%" h="100%" pos="relative" justify="center" align="center" flexDir="column" cursor="pointer">
                <Image src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <Link href={`/${item.id}`} passHref>
                  <Flex position="absolute" zIndex="10" justify="center" align="center" flexDir="column" bg="rgba(0, 0, 0, .3)" w="100%" h="100%">
                    <Text fontWeight="bold" fontSize={["24", "48"]}>{item.name}</Text>
                    <Text fontWeight="bold" fontSize={["14", "24"]}>O continente mais antigo</Text>
                  </Flex>
                </Link>
              </Flex>
              <div className={`swiper-button-next ${styles.custom_navigation}`}></div>
              <div className={`swiper-button-prev ${styles.custom_navigation}`}></div>
              <div className={`swiper-pagination ${styles.custom_pagination}`}></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Flex >
    </Flex >
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get<Continent[]>('/continents')

  return {
    props: {
      continents: data
    },
    redirect: 60 * 60 * 24, //1 day
  }
};
