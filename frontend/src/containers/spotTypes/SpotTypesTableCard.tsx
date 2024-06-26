import { MdAdd } from "react-icons/md";
import Heading from "../../components/ui/Heading";
import useSpotTypesData from "../../hooks/spotTypes/useSpotTypesData";
import SpotTypesTable from "./SpotTypesTable";
import { Button } from "../../components/ui/Button";
import SpotTypeDialog from "./SpotTypeFormDialog";
import { useState } from "react";

export default function SpotTypesTableCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data, refreshData, loading } = useSpotTypesData();
  return (
    <div className="border rounded-md p-6 space-y-6">
      <div className="flex">
        <Heading size="xs" asChild>
          <h3>Tipos de vaga</h3>
        </Heading>
        <Button className="ml-auto h-8" onClick={() => setModalOpen(true)}>
          <MdAdd className="h-6 w-6" />
          Tipo de vaga
        </Button>
      </div>
      <SpotTypesTable
        data={data}
        loading={loading}
        onDelete={() => {}}
        onUpdate={() => {}}
      />
      <SpotTypeDialog
        open={modalOpen}
        onSuccess={() => refreshData()}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
