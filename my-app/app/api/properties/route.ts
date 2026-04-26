import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Property from "../../../models/Property";

export async function GET() {
  try {
    await dbConnect();
    // Fetch all properties from MongoDB
    const properties = await Property.find({}).lean();
    return NextResponse.json({ success: true, data: properties });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}
