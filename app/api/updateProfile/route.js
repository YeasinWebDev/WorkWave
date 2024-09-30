import { connectdb } from "@/lib/connectdb";
import { ObjectId } from "mongodb";

export const POST = async (req, res) => {
  try {
    const db = await connectdb();
    const formData = await req.json();
    const userCollection = db.collection("users");
    const user = await userCollection.updateOne(
      { _id: new ObjectId(formData._id) },
      {
        $set: {
          name: formData.name,
          email: formData.email,
          companyName: formData.companyName,
          employType: formData.employType,
          location: formData.location,
          contact: formData.contact,
          salary: formData.salary,
        },
      }
    );

    const updateAllUser = await userCollection.updateMany(
      {companyCode: String(formData.companyCode)},
      {
        $set: {
          companyName: formData.companyName,
        },
      }
    )

    return new Response({ message: "OK", status: 200 });
  } catch (error) {
    console.log(error);
    new Response({ message: error.message }, { status: 500 });
  }
};
