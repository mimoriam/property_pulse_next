import PropertyCard from '@/components/PropertyCard';
import { fetchAllProperties } from '@/utils/requests';

export default async function PropertiesPage() {
  const { properties } = await fetchAllProperties();

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
