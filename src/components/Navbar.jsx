import listLanguages from "../assets/languages.json";
import { useContext, useState } from "react";
import { StoreContext } from "../provider/StoreProvider";
import { Popper } from "@mui/material";

const Navbar = () => {
  const { changeI18N, I18N } = useContext(StoreContext);
  const prevLanguage = sessionStorage.getItem("language") || "en";
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const onLanguageClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const onLanguageChange = (id) => {
    onLanguageClick(null);
    changeI18N(id);
  };

  return (
    <div className="navbar">
      <div className="navbarMargin">
        <a href="https://github.com/RikSteed" className="buttonBox githubAnchor">
          Github
        </a>
        <h6 style={{ margin: "0", textAlign: "center" }}>
          {I18N.NAVBAR.CREDIT}
          <br />
          {I18N.NAVBAR.BETA}
        </h6>
        <button onClick={onLanguageClick} className="buttonBox">
          {I18N.NAVBAR.LANGUAGE}
        </button>
        <Popper placement="top-end" id={id} open={open} anchorEl={anchorEl}>
          {listLanguages && (
            <div className="popperBox inputBox">
              {listLanguages.map((language) => (
                <a className="anchorPopperBox" key={language.id} id={language.id} onClick={() => onLanguageChange(language.id)}>
                  <div style={{ width: "1rem" }}>{prevLanguage === language.id ? "■" : <>&nbsp;</>}</div>
                  {language.name}
                  <div style={{ width: "1rem" }}>&nbsp;</div>
                </a>
              ))}
            </div>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default Navbar;
