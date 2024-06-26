import { useEffect, useState } from "react";
import { ISpotType } from "../../models/ISpotType";
import { spotTypeService } from "../../services/spotTypeService";
import { useToast } from "../useToast";
import { TOAST_MESSAGES } from "../../constants/toastMessages";

export default function useSpotTypesData() {
  const { launchToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ISpotType[]>([]);

  const getData = () => {
    spotTypeService
      .getAll()
      .then((res) => {
        setData(res.data);
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
    spotTypeService.delete(id).then(() => {
      launchToast({
        title: TOAST_MESSAGES["SpotType"].DELETED_TITLE,
        description: TOAST_MESSAGES["SpotType"].DELETED_DESCRIPTION,
        type: "success",
      });
      getData();
    })
      .catch(() => {
        launchToast({
          title: TOAST_MESSAGES["SpotType"].DELETED_ERROR_TITLE,
          description:
            TOAST_MESSAGES.COMMON.ERROR_DESCRIPTION,
          type: "error",
        });
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    loading,
    refreshData: getData,
    onDelete,
  };
}
