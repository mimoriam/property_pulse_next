// noinspection t

'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchAProperty } from '@/utils/requests';

export default function PropertyPage() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;

      try {
        const { property } = await fetchAProperty(id.toString());

        setProperty(property);

        console.log(property);
      } catch (err) {
        console.error('Error fetching property: ', err);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData().then();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className="mt-10 text-center text-2xl font-bold">
        Property Not Found
      </h1>
    );
  }

  return <>{!loading && property && <>{property.seller_info.name}</>}</>;
}
