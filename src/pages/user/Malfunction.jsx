import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { StatusButton, ChangeButton } from "../../components/Button";
import { getRegion } from "../../functions/region";
import { setWork } from "../../store/actions/workActions";
import { setRegion } from "../../store/actions/regionActions";

function Malfunction() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [regionId, setRegionId] = useState("");
  const work = useSelector((state) => state.work.work);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const regionFromUrl = params.get("region");
    const workFromUrl = params.get("work");
    if (regionFromUrl) {
      setRegionId(regionFromUrl);
      dispatch(setRegion(regionFromUrl));
    }
    if (workFromUrl) {
      dispatch(setWork(workFromUrl));
    }
  }, [location.search, dispatch]);

  const newStatus = () => {
    navigate(`/status?region=${regionId}&work=${work}`);
  };

  const newChange = () => {
    navigate(`/replcement?region=${regionId}&work=${work}`);
  };

  return (
    <div id="work">
      <h2>Выбор действия</h2>
      <h5>{getRegion(regionId)}</h5>
      <StatusButton onClick={newStatus} />
      <ChangeButton onClick={newChange} />
    </div>
  );
}

export default Malfunction;
