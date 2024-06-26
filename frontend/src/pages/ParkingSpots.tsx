import Content from "../components/layout/Content";
import Heading from "../components/ui/Heading";
import SpotTypesTable from "../containers/spotTypes/SpotTypesTable";
import SpotTypesTableCard from "../containers/spotTypes/SpotTypesTableCard";

export default function ParkingSpots() {
  return (
    <Content>
      <Heading>Gerenciar vagas</Heading>
      <div className="flex mt-8">
        <div className="border rounded-md p-6 space-y-6 mr-8 flex-1">
          <Heading size="xs" asChild>
            <h3>Vagas</h3>
          </Heading>
          <SpotTypesTable
            data={[]}
            loading
            onDelete={() => {}}
            onUpdate={() => {}}
          />
        </div>
        <SpotTypesTableCard />
      </div>
    </Content>
  );
}
