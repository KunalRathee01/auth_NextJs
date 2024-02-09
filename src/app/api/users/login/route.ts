import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();


export async function POST(request: NextRequest) {
    try {
      const reqBody = await request.json();
  
      const { email, password } = reqBody;
      console.log(reqBody);
  
      //Chexk if user or not
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json(
          { error: "User Does not exist" },
          { status: 400 }
        );
      }
  
      //Check if the password is correct
      const validPassword = await bcryptjs.compare(password, user.password);
      if (!validPassword) {
        return NextResponse.json({ error: "Invaild Password " }, { status: 400 });
      }
  
      // create token data
      const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email,
      };
  
      //Create a Token
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
        expiresIn: "7d",
      });
  
      const response = NextResponse.json({
        message: "Login successful",
        success: true,
      });
      response.cookies.set("token", token, { httpOnly: true });
  
      return response;
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

//-----------------------------------------

// export async function POST(request: NextRequest) {
//   try {
//     const reqBody = await request.json();

//     const { email, password } = reqBody;

//     //check if user is in the database or note
//     const user = await User.findOne({ email });
//     // agar user exist nhi karta toh
//     if (!user) {
//       return NextResponse.json(
//         { error: "User does not exists" },
//         { status: 400 }
//       );
//     }

//     // agr user exist krta hai toh
//     // Password check karo
//     const validPassword = await bcryptjs.compare(password, user.password);
//     if (!validPassword) {
//       return NextResponse.json({ error: "Invaild Password " }, { status: 400 });
//     }

//     // create token data
//     const tokenData = {
//       id: user._id,
//       username: user.username,
//       email: user.email,
//     }

//     // Creating a token
//     const token  = await jwt.sign(tokenData , process.env.TOKEN_SECRET!  , {expiresIn:"7d"})

//     const response = NextResponse.json({
//         message:"Login successful",
//         success :true,
//     })
//     response.cookies.set("token" , token , {httpOnly: true})
//     // Cookie mai token set kardo
//     // the provided code is setting an HTTP response cookie named "token" with the specified token value, and it's configured to be accessible only through HTTP requests (not through JavaScript on the client side) for security reasons.

//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// //------------------------------------------------------

