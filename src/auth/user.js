import { useState, useEffect } from "react";
import { prisma } from "@/backend/utils/prisma";

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
  const [loading, setLoading] = useState(
    () => !(typeof window !== "undefined" && window.__user)
  );
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return window.__user || null;
  });

  useEffect(
    () => {
      if (!loading && user) {
        return;
      }
      setLoading(true);
      let isMounted = true;

      fetchUser().then((user) => {
        console.log("user!");
        console.log(user);
        prisma.user
          .findUnique({
            where: {
              email: user.name,
            },
          })
          .then((userFromDb) => {
            if (!userFromDb) {
              console.log("no user from db...");
              prisma.user.create({
                data: {
                  name: user.nickname,
                  email: user.name,
                  decks: {
                    create: [
                      {
                        type: "concept",
                        name: "Starter Deck",
                        cards: {
                          create: [
                            {
                              front: "Front",
                              back: "Back",
                              source: "Source",
                              xp: 0.0,
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              });
            }
          });
        // Only set the user if the component is still mounted
        if (isMounted) {
          // When the user is not logged in but login is required
          if (required && !user) {
            window.location.href = "/api/login";
            return;
          }
          setUser(user);
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

  return { user, loading };
}
