// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { child, get, onValue, ref } from "firebase/database";
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
    console.log(query.name);
    const test = await get(child(dbRef, `${query.name}`));
    const data = await test.val().items;
    const values = Object.keys(data).map((key) => data[key]);
    const items = values.map((element: ItemEntity) => element);
    return res.status(200).json(items);

    // get(child(dbRef, `${query.name}`))
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       const data = snapshot.val().items;
    //       const values = Object.keys(data).map((key) => data[key]);
    //       const items = values.map((element: ItemEntity) => element);
    //       return res.status(200).send({ items: "" });
    //     } else {
    //       console.log("No data available");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // return res.status(200).json({ message: `Hello, ${query.name}` });
  }
  // res.status(405).json({ message: "Method not allowed" });
}
