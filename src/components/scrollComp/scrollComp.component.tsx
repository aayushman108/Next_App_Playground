"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { SCROLL_COMP } from "@/constants/scrollComp.contants";
import styles from "./scrollComp.module.scss";
import { ScrollCompCard } from "./scrollCompCard/scrollCompCard.component";

export function ScrollComp() {
  useEffect(() => {
    const boxItems = document.querySelectorAll(`.${styles.box_item}`);

    const options = {
      root: document.querySelector("#interaction_observer_box"),
      threshold: 0,
      // rootMargin: "100px",
    };
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(styles.in_view, entry.isIntersecting);
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    boxItems.forEach((box) => observer.observe(box));

    return () => {
      boxItems.forEach((box) => observer.unobserve(box));
    };
  }, []);

  return (
    <section id="scroll_comp" className={styles.scroll_comp}>
      <div className={styles.scroll_comp__box}>
        <h1>Hello world</h1>
        <Link href="">Checking the reset</Link>
        <ul className={styles.infinite_scroll} id="interaction_observer_box">
          {SCROLL_COMP.map((image, index) => {
            return (
              <li key={index} className={styles.box_item}>
                <ScrollCompCard id={index} image={image.image} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
