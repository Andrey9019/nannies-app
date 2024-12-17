// import { useEffect, useState } from "react";
// import { fetchNannies } from "../../firebase";

// const NanniesList = () => {
//   const [nannies, setNannies] = useState([]);

//   useEffect(() => {
//     const getNannies = async () => {
//       const data = await fetchNannies();
//       setNannies(Object.values(data));
//     };
//     getNannies();
//   }, []);

//   return (
//     <div className="nannies-list">
//       {nannies.map((nanny, index) => (
//         <div key={index} className="nanny-card">
//           <img src={nanny.avatar_url} alt={nanny.name} />
//           <h3>{nanny.name}</h3>
//           <p>Experience: {nanny.experience} years</p>
//           <p>Price: ${nanny.price_per_hour}/hour</p>
//           <p>Rating: {nanny.rating}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NanniesList;
