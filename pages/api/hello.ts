// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { child, get, onValue, push, ref, set } from "firebase/database";
import type { NextApiRequest, NextApiResponse } from "next";
import { ItemEntity } from "../../interfaces";
import { auth, database } from "../../server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  if (method === "GET") {
    const dbRef = ref(database);

    const dataQuery = await get(child(dbRef, `${query.name}`));
    const data = await dataQuery.val().items;
    const values = Object.keys(data).map((key) => data[key]);
    const items = values.map((element: ItemEntity) => element);
    return res.status(200).json(items);
  }
  if (method === "POST") {
    const body = await req.body;

    const userId = body.uid;

    if (userId != null) {
      const postListRef = ref(database, userId + "/items");
      const newPostRef = push(postListRef, body);
      set(newPostRef, {
        ...body,
        quantity: 0,
        id: newPostRef.key,
      });

      return res.status(201).json({
        newItem: {
          ...body,
          quantity: 0,
          id: newPostRef.key,
        },
        message: "Added item successfully!",
      });
    } else {
      return res.status(500).json({ message: "Adding item failed" });
    }
  }
  if (method === "PUT") {
    // const body = await req.body;
    const { modifiedItem, uid } = await req.body;

    // const { item } = JSON.parse(body);
    const postListRef = ref(database, uid + "/items" + `/${modifiedItem.id}`);
    console.log(modifiedItem);

    set(postListRef, {
      ...modifiedItem,
    });

    return res.status(201).json({
      editedItem: modifiedItem,
      message: "Successfully edited item!",
    });
  }
}
