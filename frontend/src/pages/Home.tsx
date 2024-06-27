import { MdOutlineLayers } from "react-icons/md";
import Heading from "../components/ui/Heading";
import { Text } from "../components/ui/Text";
import _ from "lodash";
import { useEffect, useState } from "react";
import Spot from "../containers/home/Spot";
import HomeFilters from "../containers/home/HomeFilters";
import { ISpotWithReservation, spotService } from "../services/spotService";

const SPOTS_COLUMNS = 8;
export default function Home() {
  const [data, setData] = useState<ISpotWithReservation[]>([]);
  useEffect(() => {
    spotService.searchWithReservations({ take: 1000 }).then((res) => {
      console.log(res.data);
      setData(res.data.records);
    });
  }, []);

  const parkingLots = _.chunk(data, SPOTS_COLUMNS * 2);

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col bg-slate-200 p-10 space-y-10 overflow-y-auto">
        <div>
          <div className="flex mb-6">
            <Heading>Seu estacionamento</Heading>
            <Text asChild>
              <p className="text-[1.5rem] font-bold ml-auto flex items-center">
                <MdOutlineLayers className="h-6 w-6 mr-2" /> SUB1
              </p>
            </Text>
          </div>

          <Text>Total de 60 vagas. Tipo: Todos. Disponibilidade: Todos </Text>
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
                          onOpenCheckin={() => {}}
                          onOpenViewSpot={() => {}}
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
      <HomeFilters />
    </div>
  );
}
