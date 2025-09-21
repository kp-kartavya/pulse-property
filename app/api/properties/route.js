import { connectDB } from "@/config/database";
import Property from "@/models/Properties";

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();
    const properties = await Property.find({});
    return new Response(JSON.stringify({ properties }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Failed to fetch all properties" + error, {
      status: 500,
    });
  }
};
