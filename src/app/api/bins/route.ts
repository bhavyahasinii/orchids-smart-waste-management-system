import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Bin from "@/models/Bin";

export async function GET() {
  try {
    await dbConnect();
    const bins = await Bin.find({}).sort({ bin_id: 1 });
    return NextResponse.json(bins);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
