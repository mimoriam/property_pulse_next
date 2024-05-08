import InfoBoxes from '@/components/InfoBoxes';
// @ts-ignore
import Hero from '@/components/Hero';
import HomeProperties from '@/components/HomeProperties';

export default function Home() {
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </div>
  );
}
