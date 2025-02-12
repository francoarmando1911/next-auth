import { conectMongoDb } from "@/libs/mongodb";
import User, { IUser } from "@/models/User";
import { messages } from "@/utils/message";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


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

        const userFind = await User.findOne({email});

        //Validamos que exista el usuario por el correo 
        if(!userFind) {
            return NextResponse.json(
                {message: messages.error.userNotFound},
                {status: 400}
            );
        }

        //Si el usuario es correcto, validamos que la contraseña asociada a ese usuario sea correcta
        const isCorrect: boolean = await bcrypt.compare(
            password,
            userFind.password
        );

        if(!isCorrect){
            return NextResponse.json(
                { message: messages.error.incorrectPassword },
                { status: 400 }
            );
        }

        const { password: userPass, ...rest} = userFind._doc;

        const token = jwt.sign({data: rest}, "secreto", {
            expiresIn: 86400,
        });

        const response = NextResponse.json(
            {userLogged: rest, message: messages.success.userLogged},
            {status: 200}
        );

        response.cookies.set("auth_cookie", token, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400,
            path: "/"
        });

        return response;

    } catch (error){
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