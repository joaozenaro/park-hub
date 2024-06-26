import { useCallback, useEffect, useState } from "react";
import { IUser } from "../../models/IUser";
import { userService } from "../../services/userService";
import { debounce } from "lodash";
import { useToast } from "../useToast";
import { usePagination } from "../usePagination";

export function useUsersPageData() {
  const { launchToast } = useToast();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState<IUser | null>(null);

  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<IUser[]>([]);

  const PAGE_SIZE = 10;
  const [totalRecords, setTotalRecords] = useState(0);
  const pagination = usePagination(1, Math.ceil(totalRecords / PAGE_SIZE));
  const skip = (pagination.currentPage - 1) * PAGE_SIZE;

  const getData = useCallback(
    (text?: string) => {
      userService
        .search({
          searchTerm: text || searchText,
          take: PAGE_SIZE,
          skip,
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
    },
    [searchText, skip]
  );

  const handleDeleteUser = (id: number) => {
    userService
      .delete(id)
      .then(() => {
        launchToast({
          title: "Usuário deletado com sucesso",
          description: "Usuário deletado com sucesso",
          type: "success",
        });
        getData();
      })
      .catch(() => {
        launchToast({
          title: "Erro ao deletar usuário",
          description:
            "Verifique sua conexão com a internet e tente novamente.",
          type: "error",
        });
      });
  };

  const debouncedSearch = useCallback(
    debounce((text) => {
      getData(text);
      pagination.setPage(1);
    }, 700),
    []
  );

  useEffect(() => {
    loading && getData();
    !loading && debouncedSearch(searchText);
  }, [searchText]);

  useEffect(() => {
    !loading && getData();
  }, [pagination.currentPage]);

  return {
    userToUpdate,
    setUserToUpdate,

    createModalOpen,
    setCreateModalOpen,

    getData,
    data,

    searchText,
    setSearchText,

    loading,
    handleDeleteUser,
    pagination,
  };
}
