import { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faCloud,
  faCloudBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faEye,
  faMagnifyingGlass,
  faSnowflake,
  faSun,
  faTemperatureEmpty,
  faWater,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { faCloudflare } from "@fortawesome/free-brands-svg-icons";
const ApiKey = "d59ae74b83187af80626d368be8b95be";
function App() {
  const [data, setdata] = useState(null);
  const [location, setlocation] = useState("cairo");
  const [animate, setanimate] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const input = useRef();
  const handelSubmit = (e) => {
    if (input.current.value !== "") {
      setlocation(input.current.value);
      input.current.value = "";
    } else {
      setanimate(true);
      setTimeout(() => {
        setanimate(false);
      }, 500);
    }
    e.preventDefault();
  };
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&appid=${ApiKey}`;
    axios
      .get(url)
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        seterrorMsg(err);
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      seterrorMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  if (!data) {
    return (
      <div
        className="flex items-center justify-center w-full h-screen
      bg-gradient-to-r from-violet-500 to-fuchsia-500
      "
      >
        <div>
          <FontAwesomeIcon
            className="text-5xl text-white animate-spin"
            icon={faCircleNotch}
          />
        </div>
      </div>
    );
  }
  let icon;
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <FontAwesomeIcon icon={faCloud} />;
      break;
    case "Haze":
      icon = <FontAwesomeIcon icon={faCloudflare} />;
      break;
    case "Rain":
      icon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
      break;
    case "Clear":
      icon = <FontAwesomeIcon icon={faSun} />;
      break;
    case "Mist":
      icon = <FontAwesomeIcon icon={faCloudRain} />;
      break;
    case "Snow":
      icon = <FontAwesomeIcon icon={faSnowflake} />;
      break;
    case "Thunderstorm":
      icon = <FontAwesomeIcon icon={faCloudBolt} />;
      break;

    default:
      break;
  }
  const date = new Date();
  return (
    <div
      className="flex flex-col	items-center justify-end w-full h-screen
    bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 lg:px-0 pb-2 gap-3"
    >
      {errorMsg && (
        <div
          className="w-full max-w-[90vw] lg:max-w-[450px] 
      bg-[#ff208c] text-white  top-2 p-2 capitalize rounded-md"
        >{`${errorMsg.response.data.message}`}</div>
      )}
      <form
        className={`${
          animate ? "animate-shake" : "animate-none"
        } h-16 bg-black/30 w-full max-w-[450px] rounded-full 
      backdrop-blur-[32px]`}
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            ref={input}
            className="flex-1 outline-none bg-transparent pl-6 h-full
            placeholder:text-white text-white text-[15px]"
            type="text"
            placeholder="Search by city or country"
          />
          <button
            onClick={(e) => handelSubmit(e)}
            className=" flex items-center justify-center rounded-full bg-[#d347ef] 
          w-20 h-12 transition"
          >
            <FontAwesomeIcon
              className="text-2xl text-white"
              icon={faMagnifyingGlass}
            />
          </button>
        </div>
      </form>
      <div
        className="w-full max-w-[450px] min-h-[450px] bg-black/20 text-white
      backdrop-blur-[32px] rounded-[32px] py-6 px-3"
      >
        <div>
          <div className="flex items-center gap-5">
            <div className="text-[50px]">{icon}</div>
            <div>
              <div className="text-2xl font-semibold">
                {data.name}, {data.sys.country}
              </div>
              <div>
                {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                {date.getUTCFullYear()}
              </div>
            </div>
          </div>
          <div className="my-[40px]">
            <div className="flex items-center justify-center">
              <div className="text-[144px] leading-none font-light">
                {parseInt(data.main.temp)}
              </div>
              <p className="text-4xl">°C</p>
            </div>
            <p className="capitalize text-center">
              {data.weather[0].description}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon className="text-[20px]" icon={faEye} />
                <p>Visibility {data.visibility / 1000} Km</p>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  className="text-[20px]"
                  icon={faTemperatureEmpty}
                />
                <p>Feels like {parseInt(data.main.feels_like)} °C</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon className="text-[20px]" icon={faWater} />
                <p>Humidity {data.main.humidity} %</p>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon className="text-[20px]" icon={faWind} />
                <p>Wind {data.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
