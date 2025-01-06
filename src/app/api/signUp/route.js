import dbConnect from "@/lib/dbConection";
import User from "@/model/User"
import signUpSchema from "@/zodSchemas/signUP";

export async function POST(req, res) {
    try {
        await dbConnect();

        const body = await req.json();
        console.log(body);

        const zodRes = signUpSchema.safeParse(body);

        if(!zodRes.success){
            res.send("Sumting went worng")
        }


        await User.save()

    } catch (error) {
        console.log("Somting went worng",error)
    }
}