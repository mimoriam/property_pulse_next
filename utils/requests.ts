const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

// Fetch all properties
async function fetchAllProperties() {
  try {
    // Handle case where there's no environment variable
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/properties`, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Fetch single property
async function fetchAProperty(id: string | number) {
  try {
    // Handle case where there's no environment variable
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export { fetchAllProperties, fetchAProperty };
