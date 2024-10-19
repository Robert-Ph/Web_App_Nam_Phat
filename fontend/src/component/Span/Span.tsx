import "./span.css";
type props = {
  type: string | "DANGER" | "INFOR" | "WARNING";
  message: string;
};
const Span = ({ type, message }: props) => {
  return <span className={`span-text span-${type}`}>{message}</span>;
};
export default Span;
