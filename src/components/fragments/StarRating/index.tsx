import React, { useState, Dispatch, SetStateAction } from "react";
import { StarIcon } from "@chakra-ui/icons";
import { Radio, HStack, Box } from "@chakra-ui/react";

export default function StarRating({
  rating,
  setRating,
  count,
  size,
  isDisabled,
}: {
  rating: number;
  setRating?: Dispatch<SetStateAction<number>>;
  count?: number;
  size?: number;
  isDisabled?: boolean;
}) {
  // count:  number of stars you want, pass as props
  //size: size of star that you want

  const [hover, setHover] = useState(0);
  return (
    <HStack spacing={"2px"}>
      {[...Array(count || 5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <Box
            as="label"
            cursor="pointer"
            key={index}
            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            onMouseEnter={() => (!isDisabled ? setHover(ratingValue) : null)}
            onMouseLeave={() => (!isDisabled ? setHover(0) : null)}
          >
            <Radio
              name="rating"
              onChange={() => setRating?.(ratingValue)}
              value={ratingValue.toString()}
              display="none"
            ></Radio>
            <StarIcon boxSize={size || 20} transition="color 200ms" />
          </Box>
        );
      })}
    </HStack>
  );
}
