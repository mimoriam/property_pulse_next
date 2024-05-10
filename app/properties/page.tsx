import PropertyCard from '@/components/PropertyCard';

async function fetchPropertiesFromAPI() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

export default async function PropertiesPage() {
  const { properties } = await fetchPropertiesFromAPI();

  // Sort properties by date
  // @ts-ignore
  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <section className="px-4 py-6">
      <div className="container-xl m-auto px-4 py-6 lg:container">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* @ts-ignore */}
            {properties.map((property, index: number) => (
              <PropertyCard
                key={`${property._id}_${index}`}
                property={property}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
