import Car from "../../components/ui/Car";
import { Text } from "../../components/ui/Text";

export default function Spot({ data }: { data: any }) {
  return (
    <div className="flex w-full h-full flex-col">
      <div className="flex-1">
        <Car className="w-full max-h-[--car-height] drop-shadow-[0px_6px_3px_rgba(0,0,0,0.4)]" />
      </div>
      {/* <div className="bg-teal-200 flex-1">
        <Car className="w-full max-h-[--car-height]" />
      </div> */}
      <div className="h-8 flex items-center px-2">
        <Text size="lg">
          <strong>{data.code}</strong>
        </Text>
      </div>
    </div>
  );
}
