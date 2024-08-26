import "./span.css";
type props = {
  type: "danger" | "warning" | "infor" | "success";
  message: string;
};
const Span = ({ type, message }: props) => {
  return <span className={`span-text span-${type}`}>{message}</span>;
};
export default Span;
