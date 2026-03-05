import React, { createContext, useContext, useEffect, useState } from "react";

const SystemContext = createContext();

export const SystemProvider = ({ children }) => {

const [hospital, setHospital] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {

async function loadHospital(){

try{

const result = await window.electronAPI.getHospital();

setHospital(result);

}catch(error){

console.error("Failed to load hospital", error);

}finally{

setLoading(false);

}

}

loadHospital();

},[]);

return (

<SystemContext.Provider value={{ hospital, loading }}>
{children}
</SystemContext.Provider>

);

};

export const useSystem = () => {
return useContext(SystemContext);
};