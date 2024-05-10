import InfoBoxes from '@/components/InfoBoxes';
import Hero from '@/components/Hero';
import HomeProperties from '@/components/HomeProperties';
import connectDB from '@/config/database';

export default async function Home() {
  await connectDB();
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </div>
  );
}
