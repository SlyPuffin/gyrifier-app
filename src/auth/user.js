import { useState, useEffect } from "react";

export async function fetchUser(cookie = "") {
  if (typeof window !== "undefined" && window.__user) {
    return window.__user;
  }

  const res = await fetch(
    "/api/me",
    cookie
      ? {
          headers: {
            cookie,
          },
        }
      : {}
  );

  if (!res.ok) {
    delete window.__user;
    return null;
  }

  const json = await res.json();
  if (typeof window !== "undefined") {
    window.__user = json;
  }
  return json;
}

export function useFetchUser({ required } = {}) {
  const [isAuthUserLoading, setLoading] = useState(
    () => !(typeof window !== "undefined" && window.__user)
  );
  const [authUser, setUser] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return window.__user || null;
  });

  useEffect(
    () => {
      if (!isAuthUserLoading && authUser) {
        return;
      }
      setLoading(true);
      let isMounted = true;

      fetchUser().then((authUser) => {
        // Only set the user if the component is still mounted
        if (isMounted) {
          // When the user is not logged in but login is required
          if (required && !authUser) {
            window.location.href = "/api/login";
            return;
          }
          setUser(authUser);
          setLoading(false);
        }
      });

      return () => {
        isMounted = false;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { authUser, isAuthUserLoading };
}
