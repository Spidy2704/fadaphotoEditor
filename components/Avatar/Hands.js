import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import handjson from "../../public/hands/Hands.json";
import ImageSmall from "./imageSmall";

export default function Hands({
  avatarValue,
  name,
  setActiveOverlay,
  activeOverlay,
}) {
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

  const isTuesday = () => {
    const currentDate = new Date();
    return currentDate.getDay() === 2; // Tuesday is represented by the value 2 (0 for Sunday, 1 for Monday, and so on)
  };

  return (
    <div className="w-full ">
      <div className="grid grid-cols-1 gap-4 overflow-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent ">
        {handtomap.length > 0 ? (
          handtomap.map((item, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              className="  overflow-clip "
            >
              <AccordionSummary
                className={`${
                  Object.keys(item)[0] === "New Arrivals!"
                    ? "bg-[#F3FCFF]"
                    : Object.keys(item)[0] === "Taco Tuesday"
                    ? isTuesday()
                      ? "bg-green-700"
                      : "hidden" // Hide the section if it's not Tuesday
                    : "bg-primary"
                } `}
                // New Arrivals!
                expandIcon={
                  <ExpandMoreIcon
                    className={`${
                      Object.keys(item)[0] === "New Arrivals!"
                        ? "text-[#9F1B4C]"
                        : "text-white"
                    } `}
                  />
                }
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <p
                  className={`lg:text-lg text-base font-bold ${
                    Object.keys(item)[0] === "New Arrivals!"
                      ? "text-[#9F1B4C]"
                      : "text-white"
                  }`}
                >
                  {/* {`${Object.keys(item)[0]}`} */}
                  {Object.keys(item)[0].substring(Object.keys(item)[0].indexOf('.') + 1)}

                  {Object.keys(item)[0] === "Taco Tuesday" && isTuesday() && (
                    <span>&#127790; (Available Only on Tuesdays)</span>
                  )}
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <ImageSmall
                  setActiveOverlay={setActiveOverlay}
                  activeOverlay={activeOverlay}
                  item={item}
                  avatarValue={avatarValue}
                />
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <p className="lg:text-4xl md:text-3xl text-2xl h-40">
            Categories not available now. Please come back later.
          </p>
        )}
      </div>
    </div>
  );
}
