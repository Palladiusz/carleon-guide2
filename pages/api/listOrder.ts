// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { child, get, ref, set } from "firebase/database";
import type { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  if (method === "GET") {
    const dbRef = ref(database);

    const dataQuery = await get(child(dbRef, `${query.name}` + "/listOrder"));
    const tempVal = await dataQuery.val();

    return res.status(200).json(tempVal);
  }

  if (method === "PUT") {
    const { newIdsOrder, uid } = await req.body;

    const postListRef = ref(database, uid + "/listOrder");

    set(postListRef, {
      ...newIdsOrder,
    });

    return res.status(201).json({
      savedListOrder: newIdsOrder,
      message: "Successfully changed order!",
    });
  }
}
