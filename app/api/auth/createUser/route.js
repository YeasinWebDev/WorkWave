import { connectdb } from "@/lib/connectdb"
import { hash } from "bcryptjs"


export const POST = async (req, res) => {
    try {
        const db = await connectdb()
        const user = await req.json()
        // hash password 
        user.password = await hash(user.password, 10)

        const res = await db.collection('users').insertOne(user)

        return new Response({massage:'User created successfully'}, {status:200})
    } catch (error) {
        console.log(error)
    }
}