import React from "react";
import Image from "next/image";
import styles from "./scrollCompCard.module.scss";

interface IProps {
  id: number;
  image: string;
}
export function ScrollCompCard(props: IProps) {
  return (
    <article className={styles.scroll_comp_card}>
      <figure>
        <Image src={props.image} fill alt="" />
      </figure>
    </article>
  );
}
