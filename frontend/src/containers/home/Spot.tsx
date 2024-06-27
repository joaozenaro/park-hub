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
    <div className="flex w-full h-full flex-col">
      {!!data.reservation && (
        <button className="flex-1 hover:bg-slate-100" onClick={() => onOpenViewSpot(data)}>
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
      <div className="h-8 flex items-center px-2">
        <Text size="lg">
          <strong>{data.code}</strong>
        </Text>
        <Text size="sm" asChild>
          <p className="ml-auto hidden 2xl:flex">{data.spotType.name}</p>
        </Text>
      </div>
    </div>
  );
}
