import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import Rating from "react-rating";
import cn from "classnames";

import { ReactComponent as StarIcon } from "./icons/star.svg";
import styles from "./StarRating.module.scss";

interface StarRatingProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const StarRating: FC<StarRatingProps> = ({ className, ...props }) => {
  return (
    <div className={cn(styles.rating, className)} {...props}>
      <Rating
        emptySymbol={<StarIcon className={styles.icon} />}
        fullSymbol={<StarIcon className={cn(styles.icon, styles.checked)} />}
      />
    </div>
  );
};
