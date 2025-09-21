const apiDomain = process.env.NEXT_PUBLIC_API_URL || null;

export async function fetchProperties() {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/properties`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    } else {
      return res.json();
    }
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export async function fetchPropertyDetails(id) {
  try {
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch property details");
    } else {
      return res.json();
    }
  } catch (error) {
    console.error("Error fetching properties:", error);
    return null;
  }
}
