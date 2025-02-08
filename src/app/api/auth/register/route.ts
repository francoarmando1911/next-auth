import { NextRequest, NextResponse } from "next/server";
import { conectMongoDb } from "@/libs/mongodb";
import { messages } from "@/utils/message";
import { isValidEmail } from "@/utils/isValidEmail";

export async function POST(request: NextRequest) {
    try{
        await conectMongoDb();

        const body = await request.json()
        const { email, password, confirmPassword } = body;
        
        //Validar que esten todos los campos completos
        if(!email || !password || !confirmPassword){
            return NextResponse.json(
                {
                    message: messages.error.needProps,
                },
                {
                    status: 404,
                }
            );
        }

        //Validar si el email es el email (sin librerias externas)
        if (!isValidEmail(email)) {
            return NextResponse.json(
                {
                    messages: messages.error.failEmail,
                },
                {
                    status: 400
                }
            )
        }

        //Validaciones de las contraseñas 
        if(password !== confirmPassword){
            return NextResponse.json(
                {messages: messages.error.failPassword},
                {status: 404}
            )
        }
    } catch(error){
        console.log(error)
    }
}
