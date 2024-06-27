import { MdAdd } from "react-icons/md";
import Heading from "../../components/ui/Heading";
import useSpotTypesData from "../../hooks/spotTypes/useSpotTypesData";
import SpotTypesTable from "./SpotTypesTable";
import { Button } from "../../components/ui/Button";
import SpotTypeFormDialog from "./SpotTypeFormDialog";
import { useState } from "react";

export default function SpotTypesTableCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    data,
    refreshData,
    onDelete,
    loading,
    spotTypeToUpdate,
    setSpotTypeToUpdate,
  } = useSpotTypesData();
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
        onDelete={onDelete}
        onUpdate={setSpotTypeToUpdate}
      />
      <SpotTypeFormDialog
        open={modalOpen || !!spotTypeToUpdate}
        id={spotTypeToUpdate?.id}
        initialData={spotTypeToUpdate
          ? {
            name: spotTypeToUpdate?.name,
            default_price: spotTypeToUpdate.default_price
          }
          : undefined}
        onSuccess={() => refreshData()}
        onOpenChange={() => {
          setModalOpen(false);
          setSpotTypeToUpdate(null);
        }}
      />
    </div>
  );
}
