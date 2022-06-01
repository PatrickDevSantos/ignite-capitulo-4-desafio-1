import { Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

interface HeaderProps {
  backButton?: boolean;
}

export function Header({ backButton = false }: HeaderProps) {
  return (
    <Flex as="header" w="100%" maxW={1480} h={[50, 50, 100]} mx="auto" align="center" justify="center" position="relative" px={["4", "4", "36"]}>
      {backButton &&
        <Link href="/">
          <Text position="absolute" left={[4, 4, 140]} cursor="pointer">
            <FaChevronLeft size={24} color="#47585B" />
          </Text>
        </Link>
      }
      <Image src="/images/logo.svg" alt="logo" w={[81, 81, 200]} />
    </Flex>
  )
}