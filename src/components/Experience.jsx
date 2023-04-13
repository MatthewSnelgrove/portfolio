/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState, useContext } from "react";
import { Chrono } from "react-chrono";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import Fade from "react-reveal";
import { ThemeContext } from "styled-components";
import endpoints from "../constants/endpoints";
import Header from "./Header";
import FallbackSpinner from "./FallbackSpinner";
import "../css/experience.css";

function Experience(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [width, setWidth] = useState("50vw");
  const [mode, setMode] = useState("VERTICAL_ALTERNATING");

  useEffect(() => {
    fetch(endpoints.experience, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);

    if (window?.innerWidth < 576) {
      setMode("VERTICAL");
    }

    if (window?.innerWidth < 576) {
      setWidth("90vw");
    } else if (window?.innerWidth >= 576 && window?.innerWidth < 768) {
      setWidth("85vw");
    } else if (window?.innerWidth >= 768 && window?.innerWidth < 1024) {
      setWidth("80vw");
    } else {
      setWidth("75vw");
    }
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade>
          <div style={{ width }} className="section-content-container">
            <Container>
              <Chrono
                hideControls
                allowDynamicUpdate
                useReadMore={false}
                items={data.experience}
                mode={mode}
                theme={{
                  primary: theme.accentColor,
                  secondary: theme.color,
                  cardBgColor: theme.chronoTheme.cardBgColor,
                  cardForeColor: theme.chronoTheme.cardForeColor,
                  titleColorActive: theme.background,
                }}
              >
                <div className="chrono-icons">
                  {data.experience.map((experience) =>
                    experience.icon ? (
                      <img
                        key={experience.icon.src}
                        src={experience.icon.src}
                        alt={experience.icon.alt}
                      />
                    ) : null
                  )}
                </div>
              </Chrono>
            </Container>
          </div>
        </Fade>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
