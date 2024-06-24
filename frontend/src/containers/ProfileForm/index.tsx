import { useForm } from "../../hooks/useForm";
import { isValidForm } from "./validation";
import { Button } from "../../components/ui/Button";
import { Loading } from "../../components/ui/Loading";
import SmartFormFields from "../../components/form/SmartFormFields";
import { fields } from "./fields";
import { IProfileForm } from "../../models/IProfileForm";

const defaultData = {
  name: "",
  avatar: "",
};
interface Props {
  initialData: IProfileForm;
}
export default function ProfileForm({ initialData }: Props) {

  const onSubmit = async (data: IProfileForm) => { console.log(data) };



  const { data, setData, loading, errors, handleChangeValue, handleSubmit } =
    useForm<IProfileForm>({
      defaultData,
      initialData,
      onSubmit,
      validator: isValidForm,
    });
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SmartFormFields
        fields={fields}
        data={data}
        errors={errors}
        onChangeValue={handleChangeValue}
      />
      <div className="flex mt-6 ">
        <Button className="flex-1 justify-center">
          {loading && <Loading size="sm" />}
          Salvar
        </Button>
        <Button className="ml-4" type="tertiary" behavior="button" onClick={() => setData(initialData)} >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
