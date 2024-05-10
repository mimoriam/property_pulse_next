import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import properties from '@/properties.json';

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

const HomeProperties = async () => {
  const { properties } = await fetchPropertiesFromAPI();

  const recentProperties = properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl m-auto lg:container">
          <h2 className="mb-6 text-center text-3xl font-bold text-blue-500">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {recentProperties.length === 0 ? (
              <p>No Properties Found</p>
            ) : (
              recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="m-auto my-10 max-w-lg px-6">
        <Link
          href="/properties"
          className="block rounded-xl bg-black px-6 py-4 text-center text-white hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};
export default HomeProperties;
