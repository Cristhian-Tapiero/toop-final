'use client'
import { Container } from "@chakra-ui/react";

export const MainContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container
            maxW={'none'}
            pos={'relative'}
            m={0}
            p={0}
            boxSizing="border-box"
            w={'100vw'}
            h={'100dvh'}
            display={'flex'}
            flexDir={'column'}
        >
            {children}
        </Container>
    )
}