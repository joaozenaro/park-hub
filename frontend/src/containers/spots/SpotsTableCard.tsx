import { MdAdd } from "react-icons/md";
import Heading from "../../components/ui/Heading";
import { Button } from "../../components/ui/Button";
import { useState } from "react";
import useSpotsData from "../../hooks/spots/useSpotsData";
import SpotsTable from "./SpotsTable";
import SpotFormDialog from "./SpotFormDialog";

export default function SpotsTableCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    data,
    refreshData,
    onDelete,
    loading,
    spotToUpdate,
    setSpotToUpdate,
  } = useSpotsData();
  return (
    <div className="border rounded-md p-6 space-y-6 flex-1 mr-8">
      <div className="flex">
        <Heading size="xs" asChild>
          <h3>Tipos de vaga</h3>
        </Heading>
        <Button className="ml-auto h-8" onClick={() => setModalOpen(true)}>
          <MdAdd className="h-6 w-6" />
          Vaga
        </Button>
      </div>
      <SpotsTable
        data={data}
        loading={loading}
        onDelete={onDelete}
        onUpdate={setSpotToUpdate}
      />
      <SpotFormDialog
        open={modalOpen || !!spotToUpdate}
        id={spotToUpdate?.id}
        initialData={spotToUpdate
          ? {
            code: spotToUpdate.code,
            floor: spotToUpdate.floor,
            spot_type_name: spotToUpdate.spotType.name
          }
          : undefined}
        onSuccess={() => refreshData()}
        onOpenChange={() => {
          setModalOpen(false);
          setSpotToUpdate(null);
        }}
      />
    </div>
  );
}
