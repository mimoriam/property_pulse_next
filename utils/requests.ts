const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

// Fetch all properties
async function fetchAllProperties() {
  try {
    // Handle case where there's no environment variable
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/properties`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export { fetchAllProperties };
