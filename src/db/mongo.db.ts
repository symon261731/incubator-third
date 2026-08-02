import { Db, MongoClient } from "mongodb";
import { SETTINGS } from "../settings/index";
import { initCollections } from "./collections";

export let client: MongoClient;

export async function runDB(url: string): Promise<void> {
  client = new MongoClient(url);
  const db: Db = client.db(SETTINGS.MONGO_DB_NAME || "");

  initCollections(db);

  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log("linked to database");
  } catch (e) {
    await client.close();
    throw new Error(`problem with database ${e}`);
  }
}
