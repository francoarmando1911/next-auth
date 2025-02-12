import { conectMongoDb } from "@/libs/mongodb";
import { IUser } from "@/models/User";
import { messages } from "@/utils/message";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest){
    try{
        await conectMongoDb();

        const body: IUser = await request.json();
        const { email, password } = body;

        //Validar que se envien todos los campos
        if(!email || !password){
            return NextResponse.json(
                {message: messages.error.needProps},
                {status : 400}
            );
        }

    } catch (error){}
}