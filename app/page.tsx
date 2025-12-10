"use client";

import UnderConstructionContent from "@/components/contents/UnderConstructionContent";

const Home = () => {
  const maintenanceMode = true;

  if (maintenanceMode) {
    return <UnderConstructionContent />;
  }

  return (
    <div>
      <p>'Hi :)'</p>
    </div>
  );
};

export default Home;
