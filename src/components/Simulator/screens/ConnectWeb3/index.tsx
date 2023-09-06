import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react"
import React, { useMemo } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  RiPriceTag2Line,
  RiAuctionLine,
  RiFileTransferLine,
} from "react-icons/ri"
import { AnimatePresence, motion } from "framer-motion"
import { Slider } from "./Slider"
import { Web3App } from "./Web3App"
import { ProgressCta, WalletHome } from "../.."
import { defaultTokenBalances } from "../../data"
import type { PhoneScreenProps } from "../../interfaces"
import type { TokenBalance } from "../../Wallet/interfaces"
import { useEthPrice } from "../../hooks"

export const ConnectWeb3: React.FC<PhoneScreenProps> = ({ nav, ctaLabel }) => {
  const { progressStepper, step } = nav
  const { nftImage } = useStaticQuery(graphql`
    {
      nftImage: file(relativePath: { eq: "deep-panic.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 120
            height: 120
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
    }
  `)

  const ethPrice = useEthPrice()
  const tokensWithEthBalance = useMemo<Array<TokenBalance>>(
    () =>
      defaultTokenBalances.map((token) =>
        token.ticker === "ETH"
          ? {
              ...token,
              amount: 500 / ethPrice,
              usdConversion: ethPrice,
            }
          : token
      ),
    [ethPrice]
  )

  const fadeInProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  }
  return (
    <>
      {[0, 1, 2].includes(step) && (
        <Web3App>
          <Flex
            px={6}
            py={{ base: 8, md: 16 }}
            gap={{ base: 8, md: 16 }}
            bg="background.highlight"
            h="full"
            direction="column"
            textAlign="center"
          >
            <Text
              as={motion.p}
              fontSize={{ base: "xl", md: "2xl" }}
              m={0}
              {...fadeInProps}
              transitionDuration="0.75s"
              lineHeight={1.4}
            >
              Welcome to Web3
              <Text as="span" display="block" mt={2} fontWeight="bold">
                NFT Marketplace
              </Text>
            </Text>
            <Text
              as={motion.p}
              {...fadeInProps}
              transitionDuration="0.75s"
              transitionDelay="0.5s"
            >
              Connect your wallet to view your collection
            </Text>
          </Flex>
        </Web3App>
      )}
      <AnimatePresence>
        {[1, 2].includes(step) && <Slider isConnected={step === 2} />}
      </AnimatePresence>
      {[3].includes(step) && (
        <motion.div
          {...fadeInProps}
          exit={{ opacity: 0 }}
          style={{ height: "100%" }}
        >
          <Web3App bg="background.base">
            <Box px={6} py={{ base: 2, md: 6 }} fontSize="lg">
              <Text fontWeight="bold" mb={4}>
                Your collection
              </Text>
              <Flex gap={2} mb={6}>
                <GatsbyImage image={getImage(nftImage)!} alt="NFT Image" />
                <Flex
                  direction="column"
                  fontSize="sm"
                  alignItems="start"
                  gap={1}
                >
                  <Text fontWeight="bold" fontSize="md" mb="auto" ms={2}>
                    Cool art
                  </Text>
                  <Button
                    variant="link"
                    isDisabled
                    leftIcon={<Icon as={RiAuctionLine} fontSize="xs" />}
                  >
                    Set a price
                  </Button>
                  <Button
                    variant="link"
                    isDisabled
                    leftIcon={<Icon as={RiPriceTag2Line} fontSize="xs" />}
                  >
                    Auction item
                  </Button>
                  <Button
                    variant="link"
                    isDisabled
                    leftIcon={<Icon as={RiFileTransferLine} fontSize="xs" />}
                  >
                    Transfer item
                  </Button>
                </Flex>
              </Flex>
              <Button variant="outline" w="full" isDisabled>
                Browser other artwork
              </Button>
            </Box>
          </Web3App>
        </motion.div>
      )}
      {[0, 1, 2, 3].includes(step) && (
        <ProgressCta isAnimated={step === 0} progressStepper={progressStepper}>
          {ctaLabel}
        </ProgressCta>
      )}
      {[4].includes(step) && (
        <motion.div
          key="final-wallet-display"
          {...fadeInProps}
          transition={{ duration: 0.5 }}
          style={{ height: "100%" }}
        >
          <WalletHome tokenBalances={tokensWithEthBalance} />
        </motion.div>
      )}
    </>
  )
}
