"use client";

import { useMemo } from "react";

import {
  Flex,
  Heading,
  Tabs,
  TabList,
  TabIndicator,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  GridItem,
  Grid,
} from "@chakra-ui/react";

import Image from "next/image";

import Button from "@/components/elements/Button";
import MainLayout from "@/components/layouts/MainLayout";

import PricingCard from "./_components/PricingCard";
import QuestionnairesTab from "./_components/QuestionnairesTab";
import RespondentsTab from "./_components/RespondentsTab";

import success from "./_assets/success.svg";

import useCreate from "./index.hook";

import Link from "next/link";

import { useRouter } from "next/navigation";
import BackButton from "@/components/elements/BackButton";

export default function CreateComponent() {
  const {
    submittedUrl,
    isFormShown,
    isURLSubmitted,
    onShowForm,
    onHideForm,
    onSubmitForm,
    onSubmitURL,
    onCancelSubmitURL,
    tabIndex,
    setTabIndex,
    handleTabsChange,
    respondentDetail,
    setRespondentDetail,
    handlePay,
    pricing,
    setPricing,
    disabledCheckoutButton,
    lastChangedAdvanced,
    setLastChangedAdvanced,
  } = useCreate();

  const router = useRouter();

  const contentTab = useMemo(
    () => (
      // isURLSubmitted ? (
      //   <>
      //     <Image alt="Successfully submit the link" src={success} width={169} />
      //     <Heading
      //       size="xl"
      //       color="main.blue2"
      //       textAlign="center"
      //       margin="20px 0 0"
      //     >
      //       Thank You
      //     </Heading>
      //     <Text width="70%" textAlign="center" marginBottom="20px">
      //       Our team will be in touch with you for further updates on your form.
      //       Additionally, you can monitor your progress by reviewing the responses
      //       in Google Forms.
      //     </Text>
      //     <Link href="/" rel="noopener noreferrer">
      //       <Button
      //         onClick={onHideForm}
      //         color="main.grey3"
      //         bg="white"
      //         border="1px solid var(--chakra-colors-main-grey2)"
      //       >
      //         Back to Home
      //       </Button>
      //     </Link>
      //   </>
      // ) : ()
      <Tabs
        index={tabIndex}
        onChange={handleTabsChange}
        variant="unstyled"
        w={["100vw", "100vw", "50vw", "50vw"]}
      >
        <TabList>
          <Tab>QUESTIONNAIRES</Tab>
          <Tab isDisabled={!submittedUrl}>RESPONDENTS</Tab>
        </TabList>
        <TabIndicator
          mt={["", "", "-2px", "-2px"]}
          height={["2px", "2px", "4px", "4px"]}
          bg="#1183D8"
          borderRadius="1px"
          w={["", "", "75%", "75%"]}
        />
        <TabPanels paddingTop="15px">
          <TabPanel>
            <QuestionnairesTab
              isFormShown={isFormShown}
              submittedUrl={submittedUrl}
              onSubmitForm={onSubmitForm}
              onHideForm={onHideForm}
              onShowForm={onShowForm}
            />
          </TabPanel>
          <TabPanel>
            <RespondentsTab
              respondentDetail={respondentDetail}
              setRespondentDetail={setRespondentDetail}
              setPricing={setPricing}
              handlePay={handlePay}
              lastChangedAdvanced={lastChangedAdvanced}
              setLastChangedAdvanced={setLastChangedAdvanced}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    ),
    [
      handlePay,
      handleTabsChange,
      isFormShown,
      lastChangedAdvanced,
      onHideForm,
      onShowForm,
      onSubmitForm,
      respondentDetail,
      setLastChangedAdvanced,
      setPricing,
      setRespondentDetail,
      submittedUrl,
      tabIndex,
    ]
  );

  const contentPricing = useMemo(
    () => (
      <PricingCard
        buttonAction={() => {
          tabIndex === 0 ? onSubmitURL() : handlePay(router);
        }}
        buttonTitle={tabIndex === 0 ? "Next" : "Checkout"}
        price={pricing}
        isOpen={!!submittedUrl}
        tabIndex={tabIndex}
        disabledCheckoutButton={disabledCheckoutButton ?? true}
      />
    ),
    [
      disabledCheckoutButton,
      handlePay,
      onSubmitURL,
      pricing,
      router,
      submittedUrl,
      tabIndex,
    ]
  );

  return (
    <MainLayout>
      <Flex justifyContent="center">
        <Flex w="100vw" justifyContent="center" alignItems="center">
          {contentTab}
        </Flex>
        <Flex
          position="absolute"
          right={["", "", "56px", "72px"]}
          bottom={["24px", "24px", 0, 0]}
          top={["", "", "180px", "180px"]}
        >
          {contentPricing}
        </Flex>
      </Flex>
    </MainLayout>
  );
}
