import { type User } from "firebase/auth";
import { phone_number } from "./index.constants";
import { constructWAChat } from "@/utils/helper";

export default function useNavigation() {
  const createSupportLink = (currentUser: User | null) => {
    return constructWAChat({
      head: "Halo+Ka%2C+saya+memerlukan+bantuan+seputar+survey.in",
      body: `username+%3A+${currentUser?.displayName}%0D%0Aemail+%3A+${currentUser?.email}`,
      phone_number,
    });
  };

  return {
    createSupportLink,
  };
}
