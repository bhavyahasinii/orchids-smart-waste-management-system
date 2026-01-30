import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Bin from "@/models/Bin";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    const bin = await Bin.findOne({ bin_id: id });
    
    if (!bin) {
      return NextResponse.json({ error: "Bin not found" }, { status: 404 });
    }
    
    return NextResponse.json(bin);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
