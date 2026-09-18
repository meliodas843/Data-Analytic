import {
  useEffect,
  useState,
} from "react";

import {
  getStoredSubscription,
  refreshSubscription,
} from "../utils/subscription";

export default function useSubscription() {
  const [
    subscription,
    setSubscription,
  ] = useState(
    getStoredSubscription
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    let mounted = true;

    const updateFromStorage =
      () => {
        if (!mounted) {
          return;
        }

        setSubscription(
          getStoredSubscription()
        );
      };

    const load =
      async () => {
        const result =
          await refreshSubscription();

        if (!mounted) {
          return;
        }

        setSubscription(
          result
        );

        setLoading(false);
      };

    load();

    window.addEventListener(
      "subscriptionChanged",
      updateFromStorage
    );

    window.addEventListener(
      "storage",
      updateFromStorage
    );

    return () => {
      mounted = false;

      window.removeEventListener(
        "subscriptionChanged",
        updateFromStorage
      );

      window.removeEventListener(
        "storage",
        updateFromStorage
      );
    };
  }, []);

  const active =
    subscription?.subscribed ===
      true &&
    subscription?.status ===
      "active";

  return {
    subscription,
    active,
    loading,
  };
}