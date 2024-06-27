import { useCallback, useEffect, useState } from "react";
import { ISpot } from "../../models/ISpot";
import { spotService } from "../../services/spotService";
import { useToast } from "../useToast";
import { TOAST_MESSAGES } from "../../constants/toastMessages";
import { usePagination } from "../usePagination";

export default function useSpotsData() {
  const { launchToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [spotToUpdate, setSpotToUpdate] = useState<ISpot | null>(null);
  const [data, setData] = useState<ISpot[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const pagination = usePagination({
    pageSize: 6,
    totalRecords,
  });

  const getData = useCallback(() => {
    spotService
      .search({
        take: pagination.pageSize,
        skip: pagination.skip,
      })
      .then((res) => {
        setData(res.data.records);
        setTotalRecords(res.data.total_count);
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
  }, [pagination.skip]);

  const onDelete = (id: number) => {
    spotService
      .delete(id)
      .then(() => {
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
          description: TOAST_MESSAGES.COMMON.ERROR_DESCRIPTION,
          type: "error",
        });
      });
  };

  const refreshData = () => {
    getData();
    setSpotToUpdate(null);
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    !loading && getData();
  }, [pagination.currentPage]);

  return {
    data,
    pagination,
    loading,
    refreshData,
    onDelete,
    spotToUpdate,
    setSpotToUpdate,
  };
}
