import React from 'react';
import { useGlobalContext } from '../appContext';
// Import components
import Loader from '../components/Loader';
import Scoreboard from '../components/Scoreboard';

// export default function Welcome() {
//     const { loading } = useGlobalContext();

//     return (
//         <main className="page-container">
//             {loading ? <Loader /> : <div style={{
//                 backgroundColor: "gray",
//                 width: "400px",
//                 height: "100px"
//             }}>Welcome (Scoreboard) Page</div>}
//         </main>
//     )
// }

export default function Welcome() {
    const { loading } = useGlobalContext();

    return (
        <div className="page-container">
            <Scoreboard />
        </div>
    )
}
