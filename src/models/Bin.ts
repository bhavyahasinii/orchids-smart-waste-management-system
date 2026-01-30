import mongoose from "mongoose";

export interface IBin extends mongoose.Document {
  bin_id: string;
  level: number;
  status: "Empty" | "Half" | "Full";
  last_updated: Date;
  history: {
    level: number;
    timestamp: Date;
  }[];
}

const BinSchema = new mongoose.Schema<IBin>({
  bin_id: {
    type: String,
    required: [true, "Please provide a bin ID"],
    unique: true,
  },
  level: {
    type: Number,
    required: [true, "Please provide a fill level"],
    min: 0,
    max: 100,
  },
  status: {
    type: String,
    enum: ["Empty", "Half", "Full"],
    default: "Empty",
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
  history: [
    {
      level: Number,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export default mongoose.models.Bin || mongoose.model<IBin>("Bin", BinSchema);
