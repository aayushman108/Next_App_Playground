"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./scrollCompAsync.module.scss";

export function ScrollCompAsync() {
  const [items, setItems] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const ulRef = useRef<HTMLUListElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasInitialLoadRef = useRef<boolean>(false);

  const loadMoreItems = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setItems((prev) => {
        return [
          ...prev,
          ...Array.from({ length: 10 }, (_, index) => index + prev.length + 1),
        ];
      });
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (!hasInitialLoadRef.current) {
      loadMoreItems();
      hasInitialLoadRef.current = true;
    }
  }, [loadMoreItems]);

  useEffect(() => {
    const options = {
      root: ulRef.current,
      threshold: 0,
      rootMargin: "30px",
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      const lastElement = entries[0];
      if (lastElement.isIntersecting) {
        loadMoreItems();
      }
    };

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(callback, options);
    }
  }, [loadMoreItems]);

  useEffect(() => {
    const lastLiElement = ulRef.current
      ?.lastElementChild as HTMLLIElement | null;

    if (lastLiElement && observerRef.current) {
      observerRef.current?.observe(lastLiElement);
    }

    return () => {
      if (lastLiElement) {
        observerRef.current?.unobserve(lastLiElement);
      }
    };
  }, [items]);

  return (
    <section className={styles.scroll_comp_async}>
      <header className={styles.header}>Async scroll fade in</header>
      <ul className={styles.list} ref={ulRef}>
        {items.map((_, index) => {
          return (
            <li key={index} className={styles.li}>{`This is item ${
              index + 1
            }`}</li>
          );
        })}
        {isLoading && <li className={styles.li}>Loading...</li>}
      </ul>
    </section>
  );
}
