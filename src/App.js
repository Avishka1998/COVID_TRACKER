import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CovidSummary from "./components/CovidSummary";
import axios from "./axios";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Select from "react-select";

function App() {
  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [loading, setLoading] = useState(false);
  const [covidSummary, setCovidSummary] = useState({});
  const [country, setCountry] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [flag, setFlag] = useState("");
  const [isIso2, setIsIso2] = useState("true");

  useEffect(() => {
    setLoading(true);
    axios
      .get("/")
      .then((res) => {
        if (res.status === 200) {
          setTotalConfirmed(res.data.confirmed.value);
          setTotalRecovered(res.data.recovered.value);
          setTotalDeaths(res.data.deaths.value);
          setLastDate(res.data.lastUpdate);
          setIsIso2(false);
        }

        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("/countries")
      .then((res) => {
        setLoading(false);

        if (res.status === 200) {
          setCovidSummary(res.data);
        }

        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("a");
  }, []);

  const countryHandler = (countryName) => {
    if (countryName.value) {
      setCountry(countryName.value);
      var result = covidSummary.countries.find(
        (o) => o.name === countryName.value
      );
      if (result.iso2) {
        setFlag(result.iso2.toLowerCase());
        setIsIso2(true);
      } else {
        setIsIso2(false);
      }
      getCoronaReport(countryName.value);
    } else {
      setCountry("");
      axios
        .get("/")
        .then((res) => {
          if (res.status === 200) {
            setTotalConfirmed(res.data.confirmed.value);
            setTotalRecovered(res.data.recovered.value);
            setTotalDeaths(res.data.deaths.value);
            setIsIso2(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getCoronaReport = (country) => {
    axios
      .get(`/countries/${country}`)
      .then((res) => {
        if (res.status === 200) {
          setTotalConfirmed(res.data.confirmed.value);
          setTotalRecovered(res.data.recovered.value);
          setTotalDeaths(res.data.deaths.value);
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const countryNames = covidSummary.countries?.map((state) => {
    return { value: state.name, label: state.name };
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Navbar date={lastDate} />

      <div>
        <h1>COVID-19 Outbreak - Current Situation</h1>
      </div>

      <div>
        <div
          className="mt-4 mb-5"
          style={{ width: "75%", display: "inline-block" }}
        >
          <Select
            options={countryNames}
            onChange={countryHandler}
            placeholder="Select a Country.."
          />
        </div>
        <img
          src="https://lh3.googleusercontent.com/7kMQzDGQ-IvkAGSrcXMk0wctRf3XzE7S0E-J-cpgxP9Ze06VrPleT87Lpe-ICJ3wXLKLe5UWy_bEuXka4GH-ru20rKtSKKkbfwTe41XPZl7F3fG3wSJBR-1tgN_PgSr7m6Kiuyq7aQ=w2400"
          style={{
            width: "40px",
            height: "40px",
            marginLeft: "8px",
            cursor: "pointer",
          }}
          onClick={countryHandler}
          title="Global Covid19 Status"
        />
      </div>

      <div>
        {isIso2 && (
          <img
            className="border border-secondary"
            src={`https://flagcdn.com/h120/${flag}.png`}
            alt=""
          ></img>
        )}

        {!isIso2 && (
          <img
            className="border border-secondary"
            src="https://lh3.googleusercontent.com/IKXKGkOh-5jcD4vgcA03ksydIWvyKNN1yoSIJwBEUaR-oA86QfiJzmSMgmP-AWUTIFi77ENFaFvnf0cDvssSaWGSykD6DaCKFEiXiS8Lpc9pTsMjh0xgOpTDk-CS0SjR6UqVtTga7w=w200-h120-p-k"
            alt=""
          ></img>
        )}
      </div>

      <CovidSummary
        totalConfirmed={totalConfirmed}
        totalRecovered={totalRecovered}
        totalDeaths={totalDeaths}
        country={country}
      />
    </div>
  );
}

export default App;
