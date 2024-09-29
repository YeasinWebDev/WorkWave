import { connectdb } from "@/lib/connectdb";
import { ObjectId } from "mongodb";

export const POST = async (req, res) => {
  try {
    const { editedCompliance, id } = await req.json();
    const db = await connectdb();
    const complianceCollection = await db.collection("compliance");
    delete editedCompliance._id;
    const result = await complianceCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: editedCompliance }
    );

    return new Response({ message: "Compliance Updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response({ message: "Can not update the compliance" });
  }
};
