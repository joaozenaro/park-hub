import { useEffect, useState } from "react";
import { ISpotType } from "../../models/ISpotType";
import { spotTypeService } from "../../services/spotTypeService";
import { useToast } from "../useToast";

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
  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    loading,
    refreshData: getData,
  };
}
