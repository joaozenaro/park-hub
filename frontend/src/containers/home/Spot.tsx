import { MdOutlineAdd } from "react-icons/md";
import Car from "../../components/ui/Car";
import { Text } from "../../components/ui/Text";
import { ISpotWithReservation } from "../../services/spotService";

interface Props {
  data: ISpotWithReservation;
  onOpenViewSpot: (spot: ISpotWithReservation) => void;
  onOpenCheckin: () => void;
}

export default function Spot({ data, onOpenCheckin, onOpenViewSpot }: Props) {
  return (
    <div className="flex w-[var(--spot-width)] h-full flex-col">
      {!!data.reservation && (
        <button
          className="flex-1 hover:bg-slate-100"
          onClick={() => onOpenViewSpot(data)}
        >
          <Car className="w-full max-h-[--car-height] drop-shadow-[0px_6px_3px_rgba(0,0,0,0.4)]" />
        </button>
      )}
      {!data.reservation && (
        <button
          className="bg-teal-200 text-teal-200  hover:text-white flex flex-col justify-center items-center flex-1 hover:bg-teal-400 uppercase p-2"
          onClick={() => onOpenCheckin()}
        >
          <MdOutlineAdd className="h-10 w-10" />
          <p className="font-bold text-xs 2xl:text-lg">Nova reserva</p>
        </button>
      )}
      <div className="h-8 flex items-center px-2 w-[var(--spot-width)] overflow-hidden">
        <strong className="text-slate-500 text-xs mr-1 xl:text-md">
          {data.code}
        </strong>

        <Text size="sm" asChild>
          <p title={data.spotType.name} className="ml-auto hidden xl:flex text-ellipsis max-w-3 overflow-hidden xl:max-w-[unset]">
            {data.spotType.name}
          </p>
        </Text>
      </div>
    </div>
  );
}
