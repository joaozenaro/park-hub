import { useEffect, useState } from "react";
import { ISpot } from "../../models/ISpot";
import { spotService } from "../../services/spotService";
import { useToast } from "../useToast";
import { TOAST_MESSAGES } from "../../constants/toastMessages";

export default function useSpotsData() {
  const { launchToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [spotToUpdate, setSpotToUpdate] = useState<ISpot | null>(null)
  const [data, setData] = useState<ISpot[]>([]);

  const getData = () => {
    spotService
      .search()
      .then((res) => {
        setData(res.data.records);
      })
      .catch(() => {
        launchToast({
          title: "Erro ao buscar dados",
          description:
            "Verifique sua conexão com a internet e tente novamente.",
          type: "error",
        });
      })
      .finally(() => setLoading(false));
  };

  const onDelete = (id: number) => {
    spotService.delete(id).then(() => {
      launchToast({
        title: TOAST_MESSAGES["Spot"].DELETED_TITLE,
        description: TOAST_MESSAGES["Spot"].DELETED_DESCRIPTION,
        type: "success",
      });
      getData();
    })
      .catch(() => {
        launchToast({
          title: TOAST_MESSAGES["Spot"].DELETED_ERROR_TITLE,
          description:
            TOAST_MESSAGES.COMMON.ERROR_DESCRIPTION,
          type: "error",
        });
      });
  }

  const refreshData = () => {
    getData();
    setSpotToUpdate(null);
  }
  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    loading,
    refreshData,
    onDelete,
    spotToUpdate,
    setSpotToUpdate
  };
}
