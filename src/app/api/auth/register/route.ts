import { NextRequest, NextResponse } from "next/server";
import { conectMongoDb } from "@/libs/mongodb";
import { messages } from "@/utils/message";
import { isValidEmail } from "@/utils/isValidEmail";
import User, { IUserSchema } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

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
                    message: messages.error.failEmail,
                },
                {
                    status: 400
                }
            )
        }

        //Validaciones de las contraseñas 
        if(password !== confirmPassword){
            return NextResponse.json(
                {message: messages.error.failPassword},
                {status: 404}
            )
        }

        const userFind = await User.findOne({ email });

        if(userFind){
            return NextResponse.json(
                {message: messages.error.emailExist},
                {status: 200}
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser: IUserSchema = new User({
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        const { password: userPass, ...rest } = savedUser.toObject();

        await newUser.save()

        const token = jwt.sign({ data: rest }, 'secret', {
            expiresIn: 86400, 
        });

        const response = NextResponse.json({
            newUser: rest,
            message: messages.success.userCreate,
        },
        {
            status: 200,
        }
        );

        response.cookies.set("auth_cookie", token, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400,
            path: "/"
        });

        return response;

    } catch(error){
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
