import { connectdb } from "@/lib/connectdb";

export const POST = async (req, res) => {
  try {
    const {code} = await req.json()
    const db = await connectdb();
    const ComplianceCollection = await db.collection("compliance");
    const complianceData = await ComplianceCollection.find({companyCode:code.toString()}).toArray();
    return new Response(JSON.stringify(complianceData), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response({ message: "error occurred" }, { status: 500 });
  }
};
