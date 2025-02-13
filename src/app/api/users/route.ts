import { conectMongoDb } from "@/libs/mongodb";
import User from "@/models/User";
import { messages } from "@/utils/message";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try {
        await conectMongoDb();
        const users = User.find();

        return NextResponse.json({ users }, { status: 200 });
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