import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  port: process.env.PORT || "3000",
  supabaseKey: process.env.SUPABASE_KEY || '',
  supabaseUrl: process.env.SUPABASE_URL || '',
} as const satisfies Record<string, string>;
