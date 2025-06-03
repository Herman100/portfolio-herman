import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
});

export async function GET() {
  try {
    const token = imagekit.getAuthenticationToken();
    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error generating ImageKit token:", error);
    return NextResponse.json(
      { error: "Failed to generate authentication token" },
      { status: 500 }
    );
  }
}
