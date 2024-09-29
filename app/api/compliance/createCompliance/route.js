import { connectdb } from "@/lib/connectdb"

export const POST = async (req,res)=>{
    try {
        const db = await connectdb()
        const complianceCollection = await db.collection('compliance')
        const {data} = await req.json()
        const newData = {...data, companyCode:String(data.companyCode)}
        const res = await complianceCollection.insertOne(newData)
        
        return new Response({message:"compliance Created successfully"}, {status: 200})
    } catch (error) {
        console.log(error)
        return new Response({message: "error occurred"}, {status: 500})
    }
}