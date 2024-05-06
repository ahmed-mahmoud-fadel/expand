import ErrorMessage from "./ErrorMessage";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const LabelledInput = ({
  formik,
  id,
  placeholder,
  label,
  isTextarea,
  rows
}: {
  formik: any,
  id: string,
  placeholder: string,
  label: string,
  isTextarea?: boolean
  rows?: number
}) => {
  return (
    <div className={`flex flex-col${isTextarea ? '' : ' w-80'}`}>
      <label htmlFor={id}>{label}</label>
      {
        !isTextarea && 
        <Input
        id={id}
        name={id}
        placeholder={placeholder}
        value={formik.values[id]}
        onChange={formik.handleChange}
      />
      }
      {
        isTextarea &&
        <Textarea
        id={id}
        name={id}
        placeholder={placeholder}
        value={formik.values[id]}
        onChange={formik.handleChange}
        rows={rows}
        />
      }
      {
        formik.errors[id] && formik.touched[id] &&
        <ErrorMessage message={formik.errors[id]} />
      }
    </div>
  );
}
 
export default LabelledInput;