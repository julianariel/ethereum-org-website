import React, { useState } from "react"
import type { PhoneScreenProps } from "../../interfaces"
import { generateInvalidSafeSeed } from "../../../../utils/generateSeed"
import { WalletHome, ProgressCta } from "../.."

import { GeneratingKeys } from "./GeneratingKeys"
import { HomeScreen } from "./HomeScreen"
import { InitialWordDisplay } from "./InitialWordDisplay"
import { InteractiveWordSelector } from "./InteractiveWordSelector"
import { RecoveryPhraseNotice } from "./RecoveryPhraseNotice"
import { WelcomeScreen } from "./WelcomeScreen"

export const CreateAccount: React.FC<PhoneScreenProps> = ({
  nav,
  ctaLabel,
}) => {
  const { progressStepper, step } = nav
  const [words, setWords] = useState<Array<string>>(generateInvalidSafeSeed())
  const generateNewWords = () => {
    setWords(generateInvalidSafeSeed())
  }
  return (
    <>
      {[0, 1].includes(step) && <HomeScreen nav={nav} />}
      {[2].includes(step) && <WelcomeScreen />}
      {[3].includes(step) && (
        <GeneratingKeys
          nav={nav}
          generateNewWords={generateNewWords}
          ctaLabel={ctaLabel}
        />
      )}
      {[4].includes(step) && <RecoveryPhraseNotice />}
      {[5].includes(step) && <InitialWordDisplay words={words} />}
      {[6].includes(step) && (
        <InteractiveWordSelector nav={nav} words={words} ctaLabel={ctaLabel} />
      )}
      {[7].includes(step) && <WalletHome />}
      {[0, 1, 2, 4, 5].includes(step) && (
        <ProgressCta
          isAnimated={step === 0}
          progressStepper={progressStepper}
          bg={[5].includes(step) ? "background.base" : "background.highlight"}
        >
          {ctaLabel}
        </ProgressCta>
      )}
    </>
  )
}
