import { connectdb } from "@/lib/connectdb"
import { ObjectId } from "mongodb"

export const POST = async(req,res)=>{
    try {
        const db = await connectdb()
        const {id} = await req.json()
        const result = await db.collection('compliance').deleteOne({_id: new ObjectId(id)})
        return new Response(JSON.stringify(result), {status: 200})
    } catch (error) {
        console.log(error.message)
        return new Response({message: "Error deleting the data"}, {status: 500})
    }
}