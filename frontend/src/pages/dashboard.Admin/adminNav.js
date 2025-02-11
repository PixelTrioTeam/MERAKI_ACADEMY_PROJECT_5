// src/components/SecondaryNav.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const SecondaryNav = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
    switch (newIndex) {
      case 0:
        navigate("/users");
        break;
      case 1:
        navigate("/movies");
        break;
      case 2:
        navigate("/series");
        break;
      case 3:
        navigate("/add-movie");
        break;
      case 4:
        navigate("/add-series");
        break;
      default:
        break;
    }
  };

  return (
    <Tabs value={tabIndex} onChange={handleTabChange} centered>
      <Tab label="Users" />
      <Tab label="Movies" />
      <Tab label="Series" />
      <Tab label="Add Movie" />
      <Tab label="Add Series" />
    </Tabs>
  );
};

export default SecondaryNav;
