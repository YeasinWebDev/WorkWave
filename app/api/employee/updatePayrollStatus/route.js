import { connectdb } from "@/lib/connectdb";

export const POST = async (req, res) => {
  const { email, status } = await req.json();
  console.log(email, status);
  try {
    const db = await connectdb();
    const userCollection = await db.collection("users");
    const result = await userCollection.updateOne(
      { email },
      { $set: { status } }
    );
    return new Response({ message: "Status updated", result });
  } catch (error) {
    console.log(error);
    return new Response({ message: "Error Updating status" }, { status: 500 });
  }
};
