// src/pages/AntiProPage.jsx
import React, { useState, useEffect } from "react";
import "../styles/AntiProPage.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/";

const AntiProPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [blockedSites, setBlockedSites] = useState([]);
  const [newSite, setNewSite] = useState("");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [remainingTime, setRemainingTime] = useState(null);

  console.log(blockedSites);

  //Fetch para el modo bloqueo
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Obtén el token del localStorage

    if (token) {
      fetch(
        `${API_BASE_URL}antiprocrastinacion/configuracion-antiprocrastinacion/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Agrega el token aquí
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setIsActive(data.modo_antiprocrastinacion);
          setBlockedSites(
            Array.isArray(data.urls_bloqueadas) ? data.urls_bloqueadas : []
          );
        })
        .catch((error) =>
          console.error("Error al obtener configuración:", error)
        );
    }
  }, []); // Solo se ejecuta una vez al montar el componente

  useEffect(() => {
    let timer;
    if (isActive && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, remainingTime]);

  const handleToggle = () => {
    const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60;
    setIsActive((prev) => !prev);
    if (!isActive && totalSeconds > 0) {
      setRemainingTime(totalSeconds);
    }
    //Envio del estado actualizado al backend
    saveConfig({
      modo_antiprocrastinacion: !isActive,
      urls_bloqueadas: blockedSites,
    });
  };

  const handleAddSite = () => {
    if (newSite && !blockedSites.includes(newSite)) {
      setBlockedSites((prevBlockedSites) => {
        const updatedBlockedSites = [...prevBlockedSites, newSite];
        // Ahora guardamos la configuración con el nuevo estado actualizado
        saveConfig({
          modo_antiprocrastinacion: isActive,
          urls_bloqueadas: updatedBlockedSites,
        });
        return updatedBlockedSites; // Actualizamos el estado
      });
      setNewSite(""); // Limpiar el campo de texto
    }
  };

  const handleRemoveSite = (site) => {
    const updatedSites = blockedSites.filter((s) => s !== site);
    setBlockedSites(updatedSites);
    saveConfig({
      modo_antiprocrastinacion: isActive,
      urls_bloqueadas: updatedSites,
    });
  };

  const saveConfig = (configData) => {
    const token = localStorage.getItem("authToken"); // Obtener el token de localStorage

    if (!token) {
      console.error("No se encontró el token de autenticación.");
      return;
    }

    fetch(
      `${API_BASE_URL}antiprocrastinacion/configuracion-antiprocrastinacion/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Agregar el token en los encabezados
        },
        body: JSON.stringify(configData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Configuración guardada:", data);
      })
      .catch((error) =>
        console.error("Error al guardar configuración:", error)
      );
  };

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="antipro-container">
      <h2>Modo Antiprocrastinación</h2>

      <div className="antipro-section">
        <label>Activar modo antiprocrastinación</label>
        <label className="switch">
          <input type="checkbox" checked={isActive} onChange={handleToggle} />
          <span className="slider round"></span>
        </label>
        {remainingTime !== null && isActive && (
          <p>Tiempo restante: {formatTime(remainingTime)}</p>
        )}
      </div>

      <div className="antipro-section">
        <h3>Sitios bloqueados</h3>
        <input
          type="text"
          placeholder="Escribir url de sitio web"
          value={newSite}
          onChange={(e) => setNewSite(e.target.value)}
        />
        <button className="add-site-btn" onClick={handleAddSite}>
          + agregar sitio
        </button>

        <ul className="site-list">
          {Array.isArray(blockedSites) && blockedSites.length > 0 ? (
            blockedSites.map((site, i) => (
              <li key={i}>
                {site}
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveSite(site)}
                >
                  ❌
                </button>
              </li>
            ))
          ) : (
            <li>añada sus sitios bloqueados</li>
          )}
        </ul>
      </div>

      <div className="antipro-section">
        <h3>Duración del bloqueo</h3>
        <input
          type="number"
          min="0"
          max="99"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Horas"
        />
        <input
          type="number"
          min="0"
          max="59"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          placeholder="Minutos"
        />
      </div>
    </div>
  );
};

export default AntiProPage;
