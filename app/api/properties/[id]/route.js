import { connectDB } from "@/config/database";
import Property from "@/models/Properties";

// GET /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const property = await Property.findById(params.id);

    if (!property) {
      return new Response("Property not found", { status: 404 });
    }
    return new Response(JSON.stringify({ property }), {
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
