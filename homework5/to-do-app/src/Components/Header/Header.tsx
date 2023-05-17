import "./Header.css";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">To Do List</h1>
      <WeatherWidget blockName={"header"} />
    </header>
  );
};

export { Header };
