import { MdOutlineLayers } from "react-icons/md";
import Heading from "../components/ui/Heading";
import { Text } from "../components/ui/Text";
import _, { filter } from "lodash";
import { useEffect, useState } from "react";
import Spot from "../containers/home/Spot";
import HomeFilters from "../containers/home/HomeFilters";
import {
  ISearchSpotReservationModel,
  ISpotWithReservation,
  spotService,
} from "../services/spotService";
import ViewSpotDialog from "../containers/home/ViewSpotDialog";
import ReservationCheckinFormDialog from "../containers/home/CheckinFormDialog";
import { ISelectOption } from "../models/ISelectOption";
import { TOAST_MESSAGES } from "../constants/toastMessages";
import { useToast } from "../hooks/useToast";
import ReservationCheckoutFormDialog from "../containers/home/CheckoutFormDialog";
import getReservationAmount from "../logic/getReservationAmount";

const SPOTS_COLUMNS = 8;
export default function Home() {
  const { launchToast } = useToast();
  const [filters, setFilters] = useState<ISearchSpotReservationModel>({
    license_plate: "",
    floor: "",
  });
  const [data, setData] = useState<ISpotWithReservation[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [floors, setFloors] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [checkinOpen, setCheckinOpen] = useState(false);
  const [spotToCheckin, setSpotToCheckin] =
    useState<ISpotWithReservation | null>(null);
  const [spotToCheckout, setSpotToCheckout] =
    useState<ISpotWithReservation | null>(null);
  const [spotToUpdate, setSpotToUpdate] = useState<ISpotWithReservation | null>(
    null
  );

  const getData = () => {
    spotService
      .searchWithReservations({ take: 1000000, ...filters })
      .then((res) => {
        console.log(res.data);
        setData(res.data.records);
        setTotalRecords(res.data.total_count);
        const allFloors = res.data.records.reduce((options, spot) => {
          if (!options.includes(spot.floor)) {
            return [...options, spot.floor];
          }
          return options;
        }, [] as string[]);
        if (!floors.length) setFloors(allFloors);
      })
      .catch(() => {
        launchToast({
          title: TOAST_MESSAGES.COMMON.LIST_ERROR_TITLE,
          description: TOAST_MESSAGES.COMMON.ERROR_DESCRIPTION,
          type: "error",
        });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  const refreshData = () => {
    getData();
  };

  const parkingLots = _.chunk(data, SPOTS_COLUMNS * 2);
  const spotsOptions: ISelectOption[] = data.map((spot) => ({
    value: String(spot.id),
    label: spot.code,
  }));
  return (
    <div className="flex flex-1">
      {spotToUpdate && (
        <ViewSpotDialog
          open={!!spotToUpdate}
          data={spotToUpdate}
          onClose={() => setSpotToUpdate(null)}
          onCheckout={() => {
            setSpotToCheckout(spotToUpdate);
            setSpotToUpdate(null);
          }}
        />
      )}
      <ReservationCheckinFormDialog
        open={checkinOpen || !!spotToCheckin}
        initialData={
          spotToCheckin
            ? { spot_id: String(spotToCheckin.id), license_plate: "" }
            : undefined
        }
        optionsByField={{ spot_id: spotsOptions }}
        onClose={() => {
          setCheckinOpen(false);
          setSpotToCheckin(null);
        }}
        onSuccess={refreshData}
      />
      {!!spotToCheckout && (
        <ReservationCheckoutFormDialog
          id={spotToCheckout.id}
          open={!!spotToCheckout}
          onClose={() => setSpotToCheckout(null)}
          onSuccess={refreshData}
          initialData={{
            check_out: true,
            price: getReservationAmount(spotToCheckout),
            was_paid: true,
          }}
        />
      )}
      <div className="flex flex-1 flex-col bg-slate-200 p-10 space-y-10 overflow-y-auto">
        <div>
          <div className="flex mb-6">
            <Heading>Seu estacionamento</Heading>
            <Text asChild>
              <p className="text-[1.5rem] font-bold ml-auto flex items-center uppercase">
                <MdOutlineLayers className="h-6 w-6 mr-2" /> {filters.floor || "Todos"}
              </p>
            </Text>
          </div>

          <Text>
            Total de {totalRecords} vagas
          </Text>
        </div>

        {parkingLots.map((spots, index) => (
          <div key={index} className="flex">
            <div className="border-4 border-r-0 rounded-tl-2xl rounded-bl-2xl h-full w-8 border-white" />
            <table className="border-white border-4">
              <tbody>
                {_.chunk(spots, SPOTS_COLUMNS).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((spot) => (
                      <td
                        key={spot.id}
                        className="border-white border-4 w-[var(--spot-width)] h-[var(--spot-height)]"
                      >
                        <Spot
                          data={spot}
                          onOpenCheckin={() => setSpotToCheckin(spot)}
                          onOpenViewSpot={setSpotToUpdate}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="border-4 border-l-0 rounded-tr-2xl rounded-br-2xl h-full w-8 border-white" />
          </div>
        ))}
      </div>
      <HomeFilters
        floors={floors}
        filters={filters}
        setFilters={setFilters}
        onOpenCheckinForm={() => setCheckinOpen(true)}
        onApplyFilters={() => {
          getData();
        }}
      />
    </div>
  );
}
