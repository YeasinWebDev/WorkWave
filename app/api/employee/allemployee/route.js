import { connectdb } from "@/lib/connectdb"

export const GET = async () =>{
    try {
        const db = await connectdb()
        const employee = await db.collection('users').find({ employType: { $ne: "HR" }}).toArray()
        return new Response(JSON.stringify(employee), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response({message: "employee not found"}, {status: 404})
    }
}