import { useNavigate } from "react-router-dom";

const Error = ({ errorTitle }) => {
  const navigate = useNavigate();
  const handleGoToDashboard = () => {
    navigate();
  };
  return (
    <div className="component">
      <h1>{errorTitle}</h1>
      <br />
      <button className="buttonBox" onClick={handleGoToDashboard}>
        Return to Dashboard
      </button>
    </div>
  );
};

export default Error;
