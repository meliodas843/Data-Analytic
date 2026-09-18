const API_URL =
  "http://localhost:5000/api";

const DEFAULT_SUBSCRIPTION = {
  subscribed: false,
  status: "none",
  plan: null,
  started_at: null,
  expires_at: null,
};

export function getStoredSubscription() {
  try {
    const value =
      localStorage.getItem(
        "subscription"
      );

    if (!value) {
      return {
        ...DEFAULT_SUBSCRIPTION,
      };
    }

    const subscription =
      JSON.parse(value);

    return {
      subscribed:
        subscription?.subscribed ===
        true,

      status:
        subscription?.status ||
        "none",

      plan:
        subscription?.plan ||
        null,

      started_at:
        subscription?.started_at ||
        null,

      expires_at:
        subscription?.expires_at ||
        null,
    };
  } catch {
    return {
      ...DEFAULT_SUBSCRIPTION,
    };
  }
}

export function hasActiveSubscription() {
  const subscription =
    getStoredSubscription();

  return (
    subscription.subscribed ===
      true &&
    subscription.status ===
      "active"
  );
}

export async function refreshSubscription() {
  const token =
    localStorage.getItem(
      "token"
    );

  if (!token) {
    localStorage.removeItem(
      "subscription"
    );

    return {
      ...DEFAULT_SUBSCRIPTION,
    };
  }

  try {
    const response =
      await fetch(
        `${API_URL}/auth/me`,
        {
          method: "GET",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    if (!response.ok) {
      if (
        response.status ===
        401
      ) {
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "currentUser"
        );

        localStorage.removeItem(
          "isLoggedIn"
        );

        localStorage.removeItem(
          "subscription"
        );
      }

      throw new Error(
        "Subscription refresh failed"
      );
    }

    const data =
      await response.json();

    const subscription =
      data.subscription || {
        ...DEFAULT_SUBSCRIPTION,
      };

    localStorage.setItem(
      "subscription",
      JSON.stringify(
        subscription
      )
    );

    if (data.user) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(
          data.user
        )
      );
    }

    window.dispatchEvent(
      new Event(
        "subscriptionChanged"
      )
    );

    return subscription;
  } catch (error) {
    console.error(
      "REFRESH SUBSCRIPTION ERROR:",
      error
    );

    return getStoredSubscription();
  }
}