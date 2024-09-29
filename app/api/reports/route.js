import { connectdb } from "@/lib/connectdb";

export const POST = async (req, res) => {
  const { data } = await req.json();
  console.log(data);
  try {
    const db = await connectdb();
    const usercollection = db.collection("users");
    const paymentCollection = db.collection("payment");
    const complianceCollection = db.collection("compliance")

    const userData = await usercollection
      .find({ companyCode: data.code })
      .toArray();

    // cost per depertment
    const salaryByType = userData.reduce((acc, user) => {
      const { employType, salary } = user;

      if (acc[employType]) {
        acc[employType] += salary;
      } else {
        acc[employType] = salary;
      }

      return acc;
    }, {});

    const CostPerDepertment = Object.entries(salaryByType).map(
      ([employType, totalSalary]) => ({
        employType,
        totalSalary,
      })
    );

    // last payment
    const paymentlist = await paymentCollection.find().toArray();
    const lastPayment = paymentlist[paymentlist.length - 1];
    const nextpayrolldata = await usercollection.findOne({email:lastPayment.payment.email})
    const nextpayroll = nextpayrolldata.nextPayrollDate

    // compliance data
    const compliance = await complianceCollection.find().limit(5).toArray()

     // recently joined user
     const recentlyJoinedUser = await usercollection
     .find({companyCode: data.code})
     .sort({joiningDate: -1})
     .limit(5)
     .toArray();

    const ChartData = {
      CostPerDepertment,
      lastPayment,
      nextpayroll,
      compliance,
      recentlyJoinedUser
    };

    return new Response(JSON.stringify({ message: "Success", ChartData }));
  } catch (error) {
    console.log(error);
    new Response({ message: error.message }, { status: 400 });
  }
  // do something with data
  return new Response({ message: "done" }, []);
};
