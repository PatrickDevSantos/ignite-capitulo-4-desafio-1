import {
  Box, Flex, HStack, Image, SimpleGrid, Text, Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import { Continent as ContinentType } from "../types";
import { GetStaticPaths, GetStaticProps } from "next";
import { api } from "../services/api";

export default function Continent({ continent }) {
  const [data, setData] = useState<ContinentType>(continent);

  return (
    <Flex direction="column" align="center">
      <Header backButton />

      <Box
        w="100%"
        h={[150, 150, 500]}
        position="relative"
        justifyContent="center"
        display="flex"
        _before={{
          content: '""',
          bgImage: `${data.image}`,
          bgPos: "center",
          pos: "absolute",
          bgRepeat: "no-repeat",
          bgSize: "cover",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          zIndex: -1,
        }}
        zIndex={1}
      >
        <Box bg="rgba(28, 20, 1, 0.35)" w="100%" h="100%" position="absolute">

        </Box>
        <Flex w="100%" maxW={1440} flexDir="column" px="36">
          <Text
            fontWeight={600}
            fontSize={["28px", "28px", "48px"]}
            lineHeight="72px"
            color="#F5F8FA"
            bottom="14"
            position="absolute"
          >
            {data.name}
          </Text>
        </Flex>
      </Box>

      <Flex w="100%" maxW={1440} px={["4", "4", "36"]} flexDir="column">
        <Flex my={["6", "6", "20"]} gap={["6", "6", "16"]} flexDir={["column", "column", "row"]}>
          <Text fontWeight={400} fontSize={["14px", "14px", "24px"]} lineHeight={["21px", "21px", "36px"]} color="#47585B">
            {data.description}
          </Text>
          <HStack spacing="8" justify="space-between">
            <Box textAlign="center">
              <Text textAlign={["left", "left", "center"]} fontWeight={600} fontSize={["24px", "24px", "48px"]} lineHeight={["36px", "36px", "72px"]} color="highlight.900">{data.countriesNumber}</Text>
              <Text fontWeight={[400, 600]} fontSize={["15px", "15px", "24px"]} lineHeight={["27px", "27px", "36px"]} color="#47585B">países</Text>
            </Box>
            <Box textAlign="center">
              <Text textAlign={["left", "left", "center"]} fontWeight={600} fontSize={["24px", "24px", "48px"]} lineHeight={["36px", "36px", "72px"]} color="highlight.900">{data.languages}</Text>
              <Text fontWeight={[400, 600]} fontSize={["15px", "15px", "24px"]} lineHeight={["27px", "27px", "36px"]} color="#47585B">línguas </Text>
            </Box>
            <Box textAlign="center">
              <Text textAlign={["left", "left", "center"]} fontWeight={600} fontSize={["24px", "24px", "48px"]} lineHeight={["36px", "36px", "72px"]} color="highlight.900">27</Text>
              <Flex align="center">
                <Text w={["auto", "auto", "195px"]} fontWeight={[400, 600]} fontSize={["15px", "15px", "24px"]} lineHeight={["27px", "27px", "36px"]} color="#47585B">
                  cidades +100
                </Text>
                <Popover>
                  <PopoverTrigger>
                    <Button bg="transparent" p="0" m="0" size="xs" _hover={{ bg: 'transparent' }}>
                      <FaInfoCircle size={14} color="rgba(153, 153, 153, 0.5)" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody color="gray.500">
                      {data.countries.map(country =>
                        country.cities.map(city => (
                          <Text>{city.name}</Text>
                        )))}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Flex>
            </Box>
          </HStack>
        </Flex>

        <Text fontWeight={500} fontSize={["24px", "24px", "36px"]} lineHeight={["36px", "36px", "54px"]} color="#47585B">Cidades +100</Text>

        <SimpleGrid columns={4} spacing="8" mt={["5", "5", "10"]} minChildWidth='256px' mb="10" alignSelf={["center", "center", "auto"]}>

          {data.countries.map(country =>
            country.cities.map(city => (
              <Flex flexDir="column" maxW="256px" w="100%" h="279px" bg="#ffffff" border="1px solid rgba(255, 186, 8, 0.5)" rounded="4px" >
                <Image h="44" w="100%" src={city.image} alt="" objectFit="cover" />
                <Flex flex={1} justify="space-between" align="center" mx="6">
                  <Box justifyContent="center">
                    <Text fontWeight={600} fontSize="20px" lineHeight="25px" color="#47585B">{city.name}</Text>
                    <Text fontWeight={500} fontSize="16px" lineHeight="26px" color="#999999" mt="3">{country.name}</Text>
                  </Box>
                  <Flex align="center">
                    <Image src={country.flag} w="30px" h="30px" borderRadius="15" objectFit="cover" />
                  </Flex>
                </Flex>
              </Flex>
            )))}
        </SimpleGrid>
      </Flex >
    </Flex >
  )
}

export const getStaticPaths: GetStaticPaths<{ continent: string }> = async () => {

  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await api.get(`/continents/${params.continent}`)

  return {
    props: {
      continent: data
    },
    redirect: 60 * 60 * 24, //1 day
  }
};