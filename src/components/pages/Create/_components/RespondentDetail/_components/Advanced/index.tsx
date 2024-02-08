import { useState } from "react";

import {
  Flex,
  Text,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";

import CheckboxButtonGroup from "@/components/elements/CheckboxCard";
import NeedsCard from "@/components/fragments/NeedsCard";
import LoaderOverlay from "@/components/elements/LoaderOverlay";

// Calling React Query And All Data in Needs
import { dataUI } from "@/types/api.types";
import { useBusynessList } from "@/services/busyness";
import { useEducationList } from "@/services/education";
import { useExpenditureList } from "@/services/expenditure";
import { useSocialMediaList } from "@/services/social-media";
import { useEcommerceList } from "@/services/ecommerce";
import { useSportList } from "@/services/sport";
import { useHobbyList } from "@/services/hobby";
import { useGenreList } from "@/services/genre";
import { useMusicGenreList } from "@/services/music-genre";
import { useFoodList } from "@/services/food";
import { usePetList } from "@/services/pet";

export default function RespondentDetailAdvancedComponent() {
  const [show, setShow] = useState(false);

  const { isLoading: isLoadingBusyness, data: busynessList } =
    useBusynessList();
  const { isLoading: isLoadingEducation, data: educationList } =
    useEducationList();
  const { isLoading: isLoadingExpenditure, data: expenditureList } =
    useExpenditureList();
  const { isLoading: isLoadingSocialMedia, data: socialMediaList } =
    useSocialMediaList();
  const { isLoading: isLoadingECommerce, data: eCommerceList } =
    useEcommerceList();
  const { isLoading: isLoadingSport, data: sportList } = useSportList();
  const { isLoading: isLoadingHobby, data: hobbyList } = useHobbyList();
  const { isLoading: isLoadingGenre, data: genreList } = useGenreList();
  const { isLoading: isLoadingMusicGenre, data: musicGenreList } =
    useMusicGenreList();
  const { isLoading: isLoadingFood, data: foodList } = useFoodList();
  const { isLoading: isLoadingPet, data: petList } = usePetList();

  const handleToggle = () => setShow(!show);

  const isLoading =
    isLoadingBusyness ||
    isLoadingEducation ||
    isLoadingExpenditure ||
    isLoadingSocialMedia ||
    isLoadingECommerce ||
    isLoadingSport ||
    isLoadingHobby ||
    isLoadingGenre ||
    isLoadingMusicGenre ||
    isLoadingFood ||
    isLoadingPet;

  return (
    <Flex direction="column" gap="23px">
      <LoaderOverlay isLoading={isLoading} />
      <NeedsCard title={"Kesibukan"} show={show} handleToggle={handleToggle}>
        <CheckboxButtonGroup
          name={"busyness"}
          defaultValue={[""]}
          options={busynessList?.data?.map((val: dataUI) => val.name) ?? []}
          onChange={function (value: any): void {
            throw new Error("Function not implemented.");
          }}
        />
      </NeedsCard>
      <NeedsCard
        title={"Tingkat Pendidikan"}
        show={show}
        handleToggle={handleToggle}
      >
        <CheckboxButtonGroup
          name={"education"}
          defaultValue={[""]}
          options={educationList?.data?.map((val: dataUI) => val.name) ?? []}
          onChange={function (value: any): void {
            throw new Error("Function not implemented.");
          }}
        />
      </NeedsCard>
      <NeedsCard
        title={"Pengeluaran per bulan"}
        show={show}
        handleToggle={handleToggle}
      >
        <CheckboxButtonGroup
          name={"expenditure"}
          defaultValue={[""]}
          options={expenditureList?.data?.map((val: dataUI) => val.name) ?? []}
          onChange={function (value: any): void {
            throw new Error("Function not implemented.");
          }}
        />
      </NeedsCard>
      <NeedsCard
        title={"Kebiasan Merokok"}
        show={show}
        handleToggle={handleToggle}
      >
        <CheckboxButtonGroup
          name={"smoking"}
          defaultValue={[]}
          options={["merokok", "tidak merokok"]}
          onChange={function (value: any): void {
            throw new Error("Function not implemented.");
          }}
        />
      </NeedsCard>
      <NeedsCard
        title={"Kebiasaan Minum Alkohol"}
        show={show}
        handleToggle={handleToggle}
      >
        <CheckboxButtonGroup
          name={"alcoholic"}
          defaultValue={[]}
          options={["tidak pernah", "jarang", "sering"]}
          onChange={function (value: any): void {
            throw new Error("Function not implemented.");
          }}
        />
      </NeedsCard>
      <NeedsCard
        title={"Kebiasaan Berolahraga"}
        show={show}
        handleToggle={handleToggle}
      >
        <CheckboxButtonGroup
          name={"workout"}
          defaultValue={[""]}
          options={["tidak pernah", "jarang", "sering", "rutin"]}
          onChange={function (value: any): void {
            throw new Error("Function not implemented.");
          }}
        />
      </NeedsCard>
      <NeedsCard
        title={"Pengguna Social Media"}
        show={show}
        handleToggle={handleToggle}
      >
        <CheckboxButtonGroup
          name={"socmed"}
          defaultValue={[""]}
          options={socialMediaList?.data?.map((val: dataUI) => val.name) ?? []}
          onChange={function (value: any): void {
            throw new Error("Function not implemented.");
          }}
        />
      </NeedsCard>
      <NeedsCard
        title={"Pengguna e-commerce"}
        show={show}
        handleToggle={handleToggle}
      >
        <CheckboxButtonGroup
          name={"ecommerce"}
          defaultValue={[""]}
          options={eCommerceList?.data?.map((val: dataUI) => val.name) ?? []}
          onChange={function (value: any): void {
            throw new Error("Function not implemented.");
          }}
        />
      </NeedsCard>
      <NeedsCard title={"Olahraga"} show={show} handleToggle={handleToggle}>
        <CheckboxButtonGroup
          name={"sports"}
          defaultValue={[""]}
          options={sportList?.data?.map((val: dataUI) => val.name) ?? []}
          onChange={function (value: any): void {
            throw new Error("Function not implemented.");
          }}
        />
      </NeedsCard>
      <NeedsCard
        title={"Hobi"}
        show={show}
        handleToggle={handleToggle}
      >
        <CheckboxButtonGroup
          name={"hobby"}
          defaultValue={[""]}
          options={hobbyList?.data?.map((val: dataUI) => val.name) ?? []}
          onChange={function (value: any): void {
            throw new Error("Function not implemented.");
          }}
        />
      </NeedsCard>
      <NeedsCard
        title={"Genre film / buku"}
        show={show}
        handleToggle={handleToggle}
      >
        <CheckboxButtonGroup
          name={"genre"}
          defaultValue={[""]}
          options={genreList?.data?.map((val: dataUI) => val.name) ?? []}
          onChange={function (value: any): void {
            throw new Error("Function not implemented.");
          }}
        />
      </NeedsCard>
      <NeedsCard
        title={"Genre musik"}
        show={show}
        handleToggle={handleToggle}
      >
        <CheckboxButtonGroup
          name={"music-genre"}
          defaultValue={[""]}
          options={musicGenreList?.data?.map((val: dataUI) => val.name) ?? []}
          onChange={function (value: any): void {
            throw new Error("Function not implemented.");
          }}
        />
      </NeedsCard>
      <NeedsCard
        title={"Makanan / Minuman"}
        show={show}
        handleToggle={handleToggle}
      >
        <CheckboxButtonGroup
          name={"food"}
          defaultValue={[""]}
          options={foodList?.data?.map((val: dataUI) => val.name) ?? []}
          onChange={function (value: any): void {
            throw new Error("Function not implemented.");
          }}
        />
      </NeedsCard>
      <NeedsCard
        title={"Hewan peliharaan"}
        show={show}
        handleToggle={handleToggle}
      >
        <CheckboxButtonGroup
          name={"pet"}
          defaultValue={[""]}
          options={petList?.data?.map((val: dataUI) => val.name) ?? []}
          onChange={function (value: any): void {
            throw new Error("Function not implemented.");
          }}
        />
      </NeedsCard>
    </Flex>
  );
}
