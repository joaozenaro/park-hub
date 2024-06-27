import Content from "../components/layout/Content";
import Heading from "../components/ui/Heading";
import SpotTypesTableCard from "../containers/spotTypes/SpotTypesTableCard";
import SpotsTableCard from "../containers/spots/SpotsTableCard";

export default function ParkingSpots() {
  return (
    <Content>
      <Heading>Gerenciar vagas</Heading>
      <div className="flex mt-8">
        <SpotsTableCard />
        <SpotTypesTableCard />
      </div>
    </Content>
  );
}
