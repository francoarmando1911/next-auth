import { conectMongoDb } from "@/libs/mongodb";
import User from "@/models/User";
import { messages } from "@/utils/message";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import jwt from "jsonwebtoken";

const resend = new Resend("re_DvdGojDm_9mZrjESupUV2e8S2LTzT1qnW")

export async function POST(request: NextRequest){
    try {
        const body: { email: string }  = await request.json();

        const { email } = body;

        await conectMongoDb();
        const userFind = await User.findOne({ email });

        //Validamos que exista el usuario por el correo 
        if (!userFind) {
            return NextResponse.json(
                { message: messages.error.userNotFound },
                { status: 400 }
            );
        }

        const tokenData = {
            email: userFind.email,
            userId: userFind._id
        }

        const token = jwt.sign({ data: tokenData }, "secreto", {
            expiresIn: 86400,
        });

        const forgetUrl = `http://localhost:3000/change-password?token=${token}`;

        //@ts-ignore
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Cambio de contraseña",
            html: `<a href=${forgetUrl}>Cambiar contrsaeña</a>`
        });

        return NextResponse.json(
            {message: messages.success.emailSent},
            {status: 200}
        );
        
    } catch (error) {
        console.error("Error en el registro: ", error)
        return NextResponse.json(
            {
                message: messages.error.default
            },
            {
                status: 500
            }
        );
    }

}