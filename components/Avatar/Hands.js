import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import handjson from "../../public/hands/Hands.json";
import ImageSmall from "./imageSmall"

export default function Hands({ avatarValue, name,setActiveOverlay }) {
  const [expanded, setExpanded] = useState(null);
  console.log("main json", handjson);
  console.log("name", name);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  // find the hands
  const [handtomap, setHandtomap] = useState([]);
  useEffect(() => {
    const searchValue = handjson?.Hands?.find(
      (hand) => Object.keys(hand)[0].toLowerCase() === name.toLowerCase()
    );
    if (searchValue) {
      const result = Object.values(searchValue)[0];
      setHandtomap(result);
    }
  }, [name]);

  console.log(handtomap);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 max-h-[500px] overflow-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent pr-3">
        {handtomap.length > 0 ? (
          handtomap.map((item, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              className="border  overflow-clip border-primary"
            >
              <AccordionSummary
                className="bg-slate-50"
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography>{`${Object.keys(item)[0]}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ImageSmall setActiveOverlay={setActiveOverlay} item={item} avatarValue={avatarValue} />
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <p className="lg:text-4xl md:text-3xl text-2xl h-40">No data found for the provided name.</p>
        )}
      </div>
    </div>
  );
}
