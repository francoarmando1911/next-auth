import { conectMongoDb } from "@/libs/mongodb";
import User from "@/models/User";
import { messages } from "@/utils/message";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(){
    try {
        const headerList = headers()
        const token = (await headerList).get('token');

        //Valido que haya token
        if (!token) {
            return NextResponse.json(
                { message: messages.error.notAuthorized },
                { status: 400 }
            )
        };

        try {
            const isTokenValid = jwt.verify(token, "secreto");
            //@ts-ignore
            const { data } = isTokenValid;

            await conectMongoDb();
            const userFind = await User.findById(data._id);

            //Validamos que el usuario exista
            if (!userFind) {
                return NextResponse.json(
                    { message: messages.error.userNotFound },
                    { status: 400 }
                )
            };

            return NextResponse.json(
                {isAuthorized: true, message: messages.success.authorized},
                {status: 400}
            )
      
        } catch (error) {
            return NextResponse.json(
                {
                    message: messages.error.tokenNotValid
                },
                {
                    status: 500
                }
            )
        }
    } catch (error) {
        return NextResponse.json(
            {
                message: messages.error.default
            },
            {
                status: 500
            }
        )
    }
}