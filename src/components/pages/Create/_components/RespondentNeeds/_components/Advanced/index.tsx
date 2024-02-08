import { Flex } from "@chakra-ui/react";

import { RespondentDetailAdvancedComponentProps } from "./index.types";

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

export default function RespondentDetailAdvancedComponent({
  watch,
  setValue,
  lastChangedAdvanced,
  setLastChangedAdvanced,
}: RespondentDetailAdvancedComponentProps) {
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
      <NeedsCard title={"Kesibukan"}>
        <CheckboxButtonGroup
          name={"busyness"}
          options={busynessList?.data?.map((val: dataUI) => val.name) ?? []}
          value={watch("segmented_advanced_detail.busyness")}
          onChange={(val) => {
            setLastChangedAdvanced("busyness");
            setValue("segmented_advanced_detail.busyness", val);
          }}
        />
      </NeedsCard>
      <NeedsCard title={"Tingkat Pendidikan"}>
        <CheckboxButtonGroup
          name={"education"}
          options={educationList?.data?.map((val: dataUI) => val.name) ?? []}
          value={watch("segmented_advanced_detail.education")}
          onChange={(val) => {
            setLastChangedAdvanced("education");
            setValue("segmented_advanced_detail.education", val);
          }}
        />
      </NeedsCard>
      <NeedsCard title={"Pengeluaran per bulan"}>
        <CheckboxButtonGroup
          name={"expenditure"}
          options={expenditureList?.data?.map((val: dataUI) => val.name) ?? []}
          value={watch("segmented_advanced_detail.expenditure")}
          onChange={(val) => {
            setLastChangedAdvanced("expenditure");
            setValue("segmented_advanced_detail.expenditure", val);
          }}
        />
      </NeedsCard>
      <NeedsCard title={"Kebiasan Merokok"}>
        <CheckboxButtonGroup
          name={"smoking"}
          options={["merokok", "tidak merokok"]}
          value={watch("segmented_advanced_detail.smoking")}
          onChange={(val) => {
            setLastChangedAdvanced("smoking");
            setValue("segmented_advanced_detail.smoking", val);
          }}
        />
      </NeedsCard>
      <NeedsCard title={"Kebiasaan Minum Alkohol"}>
        <CheckboxButtonGroup
          name={"alcoholic"}
          options={["tidak pernah", "jarang", "sering"]}
          value={watch("segmented_advanced_detail.alcoholic")}
          onChange={(val) => {
            setLastChangedAdvanced("alcoholic");
            setValue("segmented_advanced_detail.alcoholic", val);
          }}
        />
      </NeedsCard>
      <NeedsCard title={"Kebiasaan Berolahraga"}>
        <CheckboxButtonGroup
          name={"workout"}
          options={["tidak pernah", "jarang", "sering", "rutin"]}
          value={watch("segmented_advanced_detail.workout")}
          onChange={(val) => {
            setLastChangedAdvanced("workout");
            setValue("segmented_advanced_detail.workout", val);
          }}
        />
      </NeedsCard>
      <NeedsCard title={"Pengguna Social Media"}>
        <CheckboxButtonGroup
          name={"socmed"}
          options={socialMediaList?.data?.map((val: dataUI) => val.name) ?? []}
          value={watch("segmented_advanced_detail.social_media")}
          onChange={(val) => {
            setLastChangedAdvanced("social_media");
            setValue("segmented_advanced_detail.social_media", val);
          }}
        />
      </NeedsCard>
      <NeedsCard title={"Pengguna e-commerce"}>
        <CheckboxButtonGroup
          name={"ecommerce"}
          options={eCommerceList?.data?.map((val: dataUI) => val.name) ?? []}
          value={watch("segmented_advanced_detail.ecommerce")}
          onChange={(val) => {
            setLastChangedAdvanced("ecommerce");
            setValue("segmented_advanced_detail.ecommerce", val);
          }}
        />
      </NeedsCard>
      <NeedsCard title={"Olahraga"}>
        <CheckboxButtonGroup
          name={"sports"}
          options={sportList?.data?.map((val: dataUI) => val.name) ?? []}
          value={watch("segmented_advanced_detail.sport")}
          onChange={(val) => {
            setLastChangedAdvanced("sport");
            setValue("segmented_advanced_detail.sport", val);
          }}
        />
      </NeedsCard>
      <NeedsCard title={"Hobi"}>
        <CheckboxButtonGroup
          name={"hobby"}
          options={hobbyList?.data?.map((val: dataUI) => val.name) ?? []}
          value={watch("segmented_advanced_detail.hobby")}
          onChange={(val) => {
            setLastChangedAdvanced("hobby");
            setValue("segmented_advanced_detail.hobby", val);
          }}
        />
      </NeedsCard>
      <NeedsCard title={"Genre film / buku"}>
        <CheckboxButtonGroup
          name={"genre"}
          options={genreList?.data?.map((val: dataUI) => val.name) ?? []}
          value={watch("segmented_advanced_detail.genre")}
          onChange={(val) => {
            setLastChangedAdvanced("genre");
            setValue("segmented_advanced_detail.genre", val);
          }}
        />
      </NeedsCard>
      <NeedsCard title={"Genre musik"}>
        <CheckboxButtonGroup
          name={"music-genre"}
          options={musicGenreList?.data?.map((val: dataUI) => val.name) ?? []}
          value={watch("segmented_advanced_detail.music_genre")}
          onChange={(val) => {
            setLastChangedAdvanced("music_genre");
            setValue("segmented_advanced_detail.music_genre", val);
          }}
        />
      </NeedsCard>
      <NeedsCard title={"Makanan / Minuman"}>
        <CheckboxButtonGroup
          name={"food"}
          options={foodList?.data?.map((val: dataUI) => val.name) ?? []}
          value={watch("segmented_advanced_detail.food")}
          onChange={(val) => {
            setLastChangedAdvanced("food");
            setValue("segmented_advanced_detail.food", val);
          }}
        />
      </NeedsCard>
      <NeedsCard title={"Hewan peliharaan"}>
        <CheckboxButtonGroup
          name={"pet"}
          options={petList?.data?.map((val: dataUI) => val.name) ?? []}
          value={watch("segmented_advanced_detail.pet")}
          onChange={(val) => {
            setLastChangedAdvanced("pet");
            setValue("segmented_advanced_detail.pet", val);
          }}
        />
      </NeedsCard>
    </Flex>
  );
}
