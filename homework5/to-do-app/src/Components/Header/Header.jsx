import React from 'react';
import './Header.css';
import WeatherWidget from '../WeatherWidget/WeatherWidget';
import { WeatherDataType } from '../../Utils/Interfaces';

const Header = ({ weather }) => {
  return (
    <header className="header">
        <h1 className="header__title">To Do List</h1>
        <WeatherWidget blockName={"header"} weather={weather}/>
    </header>
  );
}

export default React.memo(Header);


















// import React from 'react';
// import './Header.css';
// import WeatherWidget from '../WeatherWidget/WeatherWidget';
// import { WeatherDataType } from '../../Utils/Interfaces';

// const Header = ({ weather }: { weather: WeatherDataType }) => {
//   console.log("Header is rendering")
//   return (
//     <header className="header">
//         <h1 className="header__title">To Do List</h1>
//         <WeatherWidget blockName={"header"} weather={weather}/>
//     </header>
//   );
// }

// export default Header;