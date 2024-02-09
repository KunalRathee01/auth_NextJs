import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function GET() {
    try{
        //creating an response object
        const response = NextResponse.json(
            {
                message:"Logout successfully",
                success:true
            }
        )

        // make a logout 
        response.cookies.set("token" , "", {
            httpOnly:true , expires:new Date(0)
        });

        return response;

    }catch(error:any){
        return NextResponse.json({error:error.message} , {status:500});

    }
}