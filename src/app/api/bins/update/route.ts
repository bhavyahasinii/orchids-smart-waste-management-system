import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Bin from "@/models/Bin";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { bin_id, level } = body;

    if (!bin_id || level === undefined) {
      return NextResponse.json({ error: "bin_id and level are required" }, { status: 400 });
    }

    let status: "Empty" | "Half" | "Full" = "Empty";
    if (level > 80) {
      status = "Full";
    } else if (level >= 40) {
      status = "Half";
    }

    const updatedBin = await Bin.findOneAndUpdate(
      { bin_id },
      {
        level,
        status,
        last_updated: new Date(),
        $push: { history: { level, timestamp: new Date() } },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      message: "Bin data updated successfully",
      bin: updatedBin,
      alert: status === "Full",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
