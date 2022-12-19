import { trpc } from "@/utils/trpc";
import React from "react";
import { useRouter } from "next/router";
import NextError from "next/error";

export default function DeckEditor() {
  const id = useRouter().query.id as string;
  const cardQuery = trpc.useQuery(["get-cards-from-deck", { id }], {
    refetchOnWindowFocus: false,
  });

  if (cardQuery.error) {
    return (
      <NextError
        title={cardQuery.error.message}
        statusCode={cardQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (cardQuery.status !== "success") {
    return <>Loading...</>;
  }
  const { data } = cardQuery;

  if (data) {
    return (
      <div>
        { data.cards.length } Cards
      </div>
  )

  }
}
