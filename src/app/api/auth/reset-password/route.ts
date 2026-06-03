import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const FIXED_CODE = "123456";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { step, email, code, newPassword, confirmPassword } = body;

    if (step === "send-code") {
      if (!email) {
        return NextResponse.json(
          { error: "Email is required" },
          { status: 400 }
        );
      }

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return NextResponse.json(
          { error: "No account found with this email" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        message: "Verification code sent to your email",
      });
    }

    if (step === "reset") {
      if (!email || !code || !newPassword || !confirmPassword) {
        return NextResponse.json(
          { error: "All fields are required" },
          { status: 400 }
        );
      }

      if (code !== FIXED_CODE) {
        return NextResponse.json(
          { error: "Invalid verification code" },
          { status: 400 }
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: "Password must be at least 6 characters" },
          { status: 400 }
        );
      }

      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { error: "Passwords do not match" },
          { status: 400 }
        );
      }

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return NextResponse.json(
          { error: "No account found with this email" },
          { status: 404 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });

      return NextResponse.json({
        message: "Password has been reset successfully",
      });
    }

    return NextResponse.json({ error: "Invalid step" }, { status: 400 });
  } catch (error) {
    console.error("Error in reset-password:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
