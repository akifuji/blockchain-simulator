import React from 'react';
import posed from 'react-pose';
import { Spring } from 'react-spring/renderprops'

const Draggable = posed.div({ draggable: true });

function Node({ name, status, port }) {
    // idle icon
    let icon = <svg style={{ height: 40, width: 40 }} viewBox="0 0 64 64"><g id="Network"><path d="M47,18a3,3,0,0,1-2.34,2.922A43.891,43.891,0,0,1,45.9,29.01h.01c.031,0,.059-.009.09-.009a3,3,0,0,1,3,3h6a2.992,2.992,0,0,1,2.811-2.981A25.782,25.782,0,0,0,51.74,15.1a26.775,26.775,0,0,1-4.8,2.336A3,3,0,0,1,47,18Z" /><path d="M17,45a2.989,2.989,0,0,1,2.113-2.851A44.471,44.471,0,0,1,18.1,34.99h-.01c-.031,0-.059.009-.09.009a3,3,0,0,1-3-3H9a2.992,2.992,0,0,1-2.811,2.981A25.782,25.782,0,0,0,12.26,48.9a27,27,0,0,1,5.122-2.462A2.969,2.969,0,0,1,17,45Z" /><path d="M55,32H49a3,3,0,0,1-3,3c-.031,0-.059-.008-.09-.009H45.9a44.458,44.458,0,0,1-1.013,7.158,2.959,2.959,0,0,1,1.731,4.29A27,27,0,0,1,51.74,48.9a25.782,25.782,0,0,0,6.071-13.919A2.992,2.992,0,0,1,55,32Z" /><path d="M9,32h6a3,3,0,0,1,3-3c.031,0,.059.008.09.009h.01a43.891,43.891,0,0,1,1.24-8.088,2.975,2.975,0,0,1-2.283-3.486,26.775,26.775,0,0,1-4.8-2.336A25.782,25.782,0,0,0,6.189,29.019,2.992,2.992,0,0,1,9,32Z" /><path d="M21,32h8a3,3,0,0,1,3-3V23a3,3,0,0,1-3-3c0-.031.008-.059.009-.09V19.9a44.668,44.668,0,0,1-6.222-.811,2.967,2.967,0,0,1-3.448,1.83A43.891,43.891,0,0,0,18.1,29.01,3,3,0,0,1,21,32Z" /><path d="M43,32H35a3,3,0,0,1-3,3v6a3,3,0,0,1,3,3c0,.031-.008.059-.009.09V44.1a44.572,44.572,0,0,1,6.023.775,2.951,2.951,0,0,1,3.874-2.724A44.458,44.458,0,0,0,45.9,34.99,3,3,0,0,1,43,32Z" /><path d="M41.212,19.092a44.668,44.668,0,0,1-6.222.811v.007c0,.031.009.059.009.09a3,3,0,0,1-3,3v6a3,3,0,0,1,3,3h8a3,3,0,0,1,2.9-2.99,43.891,43.891,0,0,0-1.24-8.088,2.967,2.967,0,0,1-3.448-1.83Z" /><path d="M20,42a2.994,2.994,0,0,1,2.987,2.872A44.572,44.572,0,0,1,29.01,44.1V44.09c0-.031-.009-.059-.009-.09a3,3,0,0,1,3-3V35a3,3,0,0,1-3-3H21a3,3,0,0,1-2.9,2.99,44.471,44.471,0,0,0,1.013,7.159l0,0A2.964,2.964,0,0,1,20,42Z" /><path d="M29.059,57.417c-3.3-1.311-6.163-4.779-8.151-9.572a2.922,2.922,0,0,1-3.526-1.407A27,27,0,0,0,12.26,48.9a25.864,25.864,0,0,0,16.757,8.929,3.253,3.253,0,0,1,.042-.41Z" /><path d="M44,48a2.967,2.967,0,0,1-.908-.155c-1.988,4.793-4.853,8.261-8.151,9.572v0a3.253,3.253,0,0,1,.042.41A25.864,25.864,0,0,0,51.74,48.9a27,27,0,0,0-5.122-2.462A2.987,2.987,0,0,1,44,48Z" /><path d="M32,55V47a3,3,0,0,1-2.99-2.9,44.572,44.572,0,0,0-6.023.775v.005c0,.042.012.081.012.123a2.991,2.991,0,0,1-2.092,2.845c1.988,4.793,4.853,8.261,8.151,9.572A3,3,0,0,1,32,55Z" /><path d="M41,45c0-.044.011-.085.013-.128A44.572,44.572,0,0,0,34.99,44.1,3,3,0,0,1,32,47v8a3,3,0,0,1,2.941,2.417c3.3-1.311,6.163-4.779,8.151-9.572A2.991,2.991,0,0,1,41,45Z" /><path d="M34.941,6.584c3.1,1.231,5.813,4.365,7.778,8.713a2.977,2.977,0,0,1,4.224,2.139,26.775,26.775,0,0,0,4.8-2.336A25.86,25.86,0,0,0,34.983,6.171a3.078,3.078,0,0,1-.042.41Z" /><path d="M20,15a2.976,2.976,0,0,1,1.281.3c1.965-4.348,4.68-7.482,7.778-8.713v0a3.078,3.078,0,0,1-.042-.41A25.86,25.86,0,0,0,12.26,15.1a26.775,26.775,0,0,0,4.8,2.336A3,3,0,0,1,20,15Z" /><path d="M32,9v8a3,3,0,0,1,2.99,2.9,44.668,44.668,0,0,0,6.222-.811A2.969,2.969,0,0,1,42.719,15.3c-1.965-4.348-4.68-7.482-7.778-8.713A3,3,0,0,1,32,9Z" /><path d="M23,18a2.982,2.982,0,0,1-.212,1.092,44.668,44.668,0,0,0,6.222.811A2.994,2.994,0,0,1,32,17V9a3,3,0,0,1-2.941-2.416c-3.1,1.231-5.813,4.365-7.778,8.713A2.992,2.992,0,0,1,23,18Z" /><path d="M62,32a4,4,0,0,0-3.3-3.929,27.01,27.01,0,0,0-22.77-22.78,3.99,3.99,0,0,0-7.856,0A27.006,27.006,0,0,0,5.3,28.071a3.989,3.989,0,0,0,0,7.858,27.01,27.01,0,0,0,22.77,22.78,3.99,3.99,0,0,0,7.856,0A27.006,27.006,0,0,0,58.7,35.929,4,4,0,0,0,62,32Zm-5.3-3.765A3.989,3.989,0,0,0,54.142,31H49.858a4,4,0,0,0-3.022-2.909,45.607,45.607,0,0,0-1-6.557,3.985,3.985,0,0,0,2.155-3.424,27.565,27.565,0,0,0,3.514-1.7A24.631,24.631,0,0,1,56.7,28.235ZM35.472,56.052A3.99,3.99,0,0,0,33,54.142V47.858a3.991,3.991,0,0,0,2.805-2.687c1.462.119,2.889.3,4.268.549a4,4,0,0,0,1.707,2.6C40.1,52.033,37.91,54.725,35.472,56.052Zm-6.944,0c-2.438-1.327-4.632-4.019-6.308-7.728a4,4,0,0,0,1.708-2.61c1.355-.247,2.782-.433,4.264-.555A3.989,3.989,0,0,0,31,47.858v6.284A3.99,3.99,0,0,0,28.528,56.052Zm0-48.107A3.992,3.992,0,0,0,31,9.858v6.284a3.989,3.989,0,0,0-2.808,2.7c-1.466-.121-2.879-.3-4.222-.547.008-.1.03-.193.03-.294a3.978,3.978,0,0,0-1.441-3.049C24.188,11.622,26.263,9.181,28.526,7.945Zm6.948,0c2.263,1.236,4.338,3.677,5.967,7.006A3.978,3.978,0,0,0,40,18c0,.1.022.2.03.294-1.343.243-2.756.426-4.222.547A3.989,3.989,0,0,0,33,16.142V9.858A3.992,3.992,0,0,0,35.474,7.945ZM42.142,31H35.858A4,4,0,0,0,33,28.142V23.858a4,4,0,0,0,2.908-3.019,46.107,46.107,0,0,0,4.762-.63,3.993,3.993,0,0,0,3.217,1.78,43.586,43.586,0,0,1,.951,6.2A3.988,3.988,0,0,0,42.142,31ZM32,46a2,2,0,1,1,2-2A2,2,0,0,1,32,46Zm0-12a2,2,0,1,1,2-2A2,2,0,0,1,32,34Zm0-16a2,2,0,1,1-2,2A2,2,0,0,1,32,18Zm12,2a2,2,0,1,1,2-2A2,2,0,0,1,44,20ZM22,18a2,2,0,1,1-2-2A2,2,0,0,1,22,18Zm-1.887,3.989a3.993,3.993,0,0,0,3.217-1.78,46.107,46.107,0,0,0,4.762.63A4,4,0,0,0,31,23.858v4.284A4,4,0,0,0,28.142,31H21.858a3.988,3.988,0,0,0-2.7-2.807A43.586,43.586,0,0,1,20.113,21.989ZM18,30a2,2,0,1,1-2,2A2,2,0,0,1,18,30Zm1.162,5.807A3.988,3.988,0,0,0,21.858,33h6.284A4,4,0,0,0,31,35.858v4.284a4,4,0,0,0-2.908,3.019c-1.5.122-2.945.3-4.325.548A3.992,3.992,0,0,0,20,41c-.039,0-.075.01-.113.011A44.108,44.108,0,0,1,19.162,35.807ZM20,43a2,2,0,1,1-2,2A2,2,0,0,1,20,43Zm24,4a2,2,0,1,1,2-2A2,2,0,0,1,44,47Zm0-6a3.992,3.992,0,0,0-3.771,2.72q-2.1-.367-4.317-.547A4,4,0,0,0,33,40.142V35.858A4,4,0,0,0,35.858,33h6.284a3.99,3.99,0,0,0,2.7,2.808,43.4,43.4,0,0,1-.735,5.2C44.069,41.01,44.036,41,44,41Zm2-7a2,2,0,1,1,2-2A2,2,0,0,1,46,34Zm4.162-19.123a25.669,25.669,0,0,1-2.641,1.265,3.944,3.944,0,0,0-4.284-2.065A20.592,20.592,0,0,0,38.9,7.985,24.763,24.763,0,0,1,50.162,14.877ZM32,4a2,2,0,1,1-2,2A2,2,0,0,1,32,4ZM25.1,7.985a20.592,20.592,0,0,0-4.34,6.092,3.944,3.944,0,0,0-4.284,2.065,25.474,25.474,0,0,1-2.641-1.266A24.749,24.749,0,0,1,25.1,7.985ZM12.5,16.4a27.434,27.434,0,0,0,3.514,1.706,3.985,3.985,0,0,0,2.155,3.424,45.607,45.607,0,0,0-1,6.557A4,4,0,0,0,14.142,31H9.858A3.989,3.989,0,0,0,7.3,28.235,24.649,24.649,0,0,1,12.5,16.4ZM4,32a2,2,0,1,1,2,2A2,2,0,0,1,4,32Zm3.3,3.765A3.989,3.989,0,0,0,9.858,33h4.284a4,4,0,0,0,3.022,2.909,46.32,46.32,0,0,0,.8,5.667A3.988,3.988,0,0,0,16,45a4.032,4.032,0,0,0,.1.856A27.46,27.46,0,0,0,12.5,47.6,24.631,24.631,0,0,1,7.3,35.765Zm6.54,13.358a26.294,26.294,0,0,1,3.181-1.483A3.974,3.974,0,0,0,20,49c.109,0,.212-.024.319-.032A21.3,21.3,0,0,0,25.1,56.015,24.744,24.744,0,0,1,13.838,49.123ZM32,60a2,2,0,1,1,2-2A2,2,0,0,1,32,60Zm6.9-3.984a21.3,21.3,0,0,0,4.785-7.048c.107.008.21.032.319.032a3.978,3.978,0,0,0,2.982-1.36,27.12,27.12,0,0,1,3.177,1.487A24.752,24.752,0,0,1,38.9,56.016ZM51.5,47.6a28.265,28.265,0,0,0-3.6-1.743,3.942,3.942,0,0,0-1.874-4.283,45.005,45.005,0,0,0,.808-5.663A4,4,0,0,0,49.858,33h4.284a3.989,3.989,0,0,0,2.56,2.765A24.637,24.637,0,0,1,51.5,47.6ZM58,34a2,2,0,1,1,2-2A2,2,0,0,1,58,34Z" /></g></svg>;


    if (status === "mining") {
        // mining icon
        icon = <svg
            style={{ height: 40, width: 40 }} viewBox="0 0 482 482.87554"><g fill="#9bc9ff"><path d="m173.632812 167.109375 34.640626-20 27.710937-16 34.640625-20-8-13.855469-24-41.578125-8-13.855469-34.640625 20-27.710937 16-34.640626 20zm0 0" /><path d="m396.273438 466.875c4.445312 7.589844 14.183593 10.164062 21.800781 5.765625 7.617187-4.398437 10.257812-14.117187 5.910156-21.765625l-188-319.765625-27.710937 16zm0 0" /><path d="m156.273438 57.03125 27.710937-16 12 20.785156-27.710937 16zm0 0" /><path d="m50.128906 368.882812c0 57.4375 46.5625 104 104 104s104-46.5625 104-104-46.5625-104-104-104-104 46.5625-104 104zm112-72v24h16c8.835938 0 16 7.164063 16 16v16c0 8.839844-7.164062 16-16 16 8.835938 0 16 7.164063 16 16v16c0 8.839844-7.164062 16-16 16h-48v-96h32zm0 0" /><path d="m130.128906 320.882812v48h48c8.835938 0 16-7.160156 16-16v-16c0-8.835937-7.164062-16-16-16zm0 0" /><path d="m130.128906 416.882812h48c8.835938 0 16-7.160156 16-16v-16c0-8.835937-7.164062-16-16-16h-48zm0 0" /><path d="m262.625 97.253906-24-41.578125zm0 0" /><path d="m330.128906 160.882812c0 39.765626 32.234375 72 72 72s72-32.234374 72-72c0-39.761718-32.234375-72-72-72s-72 32.238282-72 72zm104-16c0 8.839844-7.164062 16-16 16 8.835938 0 16 7.164063 16 16 0 8.839844-7.164062 16-16 16h-32v-64h32c8.835938 0 16 7.164063 16 16zm0 0" /><path d="m386.128906 128.882812v32h32c8.835938 0 16-7.160156 16-16 0-8.835937-7.164062-16-16-16zm0 0" /><path d="m386.128906 192.882812h32c8.835938 0 16-7.160156 16-16 0-8.835937-7.164062-16-16-16h-32zm0 0" /></g><path d="m154.128906 480.882812c-61.855468 0-112-50.144531-112-112 0-61.855468 50.144532-112 112-112 61.855469 0 112 50.144532 112 112-.066406 61.828126-50.171875 111.933594-112 112zm0-208c-53.019531 0-96 42.980469-96 96 0 53.019532 42.980469 96 96 96 53.019532 0 96-42.980468 96-96-.058594-52.996093-43.003906-95.941406-96-96zm0 0" fill="#1e81ce" /><path d="m202.128906 336.882812c0-13.253906-10.746094-24-24-24h-8v-16h-16v16h-8v-16h-16v16h-24v16h16v80h-16v16h24v16h16v-16h8v16h16v-16h8c13.253906 0 24-10.742187 24-24v-16c-.023437-5.921874-2.246094-11.625-6.242187-16 3.996093-4.371093 6.21875-10.074218 6.242187-16zm-64-8h40c4.417969 0 8 3.582032 8 8v16c0 4.417969-3.582031 8-8 8h-40zm48 72c0 4.417969-3.582031 8-8 8h-40v-32h40c4.417969 0 8 3.582032 8 8zm0 0" fill="#1e81ce" /><path d="m454.742188 17.507812-9.46875-3.703124c-56.5625-22.238282-120.179688-17.417969-172.746094 13.078124l-30.96875 17.867188-4-6.929688c-1.058594-1.839843-2.808594-3.183593-4.859375-3.730468-2.050781-.550782-4.238281-.261719-6.074219.800781l-27.710938 16-8-13.855469c-1.0625-1.839844-2.8125-3.179687-4.863281-3.730468-2.050781-.546876-4.238281-.261719-6.074219.804687l-27.710937 16c-3.832031 2.207031-5.144531 7.097656-2.9375 10.925781l8 13.855469-27.710937 16c-3.828126 2.210937-5.136719 7.101563-2.929688 10.929687l4 6.929688-30.925781 17.863281c-52.710938 30.265625-88.699219 82.960938-97.714844 143.070313l-1.519531 10.074218c-.542969 3.585938 1.398437 7.09375 4.730468 8.539063 3.328126 1.441406 7.214844.460937 9.460938-2.386719l13.265625-16.859375c25.777344-32.8125 57.605469-60.382812 93.757813-81.222656l40.953124-23.648437 4 6.921874c2.207032 3.828126 7.101563 5.140626 10.929688 2.933594l27.765625-16 183.9375 312.839844c6.644531 11.488281 21.339844 15.417969 32.828125 8.773438 11.488281-6.644532 15.414062-21.339844 8.773438-32.828126l-183.914063-312.800781 27.648437-16c1.839844-1.058593 3.183594-2.808593 3.734376-4.859375.550781-2.050781.265624-4.238281-.796876-6.074218l-4-6.929688 40.949219-23.640625c36.109375-20.886719 75.886719-34.660156 117.175781-40.574219l21.242188-3.058594c3.601562-.511718 6.402344-3.386718 6.820312-7 .417969-3.613281-1.65625-7.054687-5.046874-8.375zm-287.542969 42.457032 13.855469-8 4 6.925781-13.855469 8zm-53.457031 114c-34.644532 19.96875-65.527344 45.851562-91.246094 76.472656 12.828125-46.460938 43.472656-85.976562 85.273437-109.96875l30.925781-17.863281 16 27.710937zm303.3125 280.902344c2.199218 3.835937.867187 8.726562-2.964844 10.921874-3.835938 2.195313-8.726563.867188-10.921875-2.96875l-183.910157-312.816406 13.855469-8zm-240.527344-298.695313-32-55.421875 83.136718-48 32 55.421875zm129.984375-93.496094-40.953125 23.640625-16-27.710937 30.96875-17.855469c41.667968-24.191406 91.195312-30.972656 137.832031-18.867188-39.378906 6.960938-77.234375 20.765626-111.847656 40.792969zm0 0" fill="#1e81ce" /><path d="m442.128906 144.882812c0-13.253906-10.746094-24-24-24h-8v-8h-16v8h-24v16h8v48h-8v16h24v8h16v-8h8c9.484375.042969 18.097656-5.527343 21.945313-14.199218 3.847656-8.667969 2.207031-18.792969-4.1875-25.800782 3.996093-4.371093 6.21875-10.074218 6.242187-16zm-48-8h24c4.417969 0 8 3.582032 8 8 0 4.417969-3.582031 8-8 8h-24zm24 48h-24v-16h24c4.417969 0 8 3.582032 8 8 0 4.417969-3.582031 8-8 8zm0 0" fill="#1e81ce" /><path d="m402.128906 240.882812c-44.183594 0-80-35.816406-80-80 0-44.179687 35.816406-80 80-80s80 35.820313 80 80c-.050781 44.164063-35.839844 79.953126-80 80zm0-144c-35.347656 0-64 28.65625-64 64 0 35.347657 28.652344 64 64 64 35.34375 0 64-28.652343 64-64-.039062-35.328124-28.671875-63.957031-64-64zm0 0" fill="#1e81ce" /></svg>;
    }
    return (
        <Draggable>
            <div className="Node">
                <div className="NodeIcon">
                    <Spring
                        from={{
                            x: 0.2
                        }}
                        to={{
                            x: 1
                        }}>
                        {() => (icon)}
                    </Spring>
                </div>
                <div className="NodeName">
                    Name: {name}
                </div>
                <div className="NodeStatus">
                    Status: {status}
                </div>
                <div className="NodeBc">
                    Blockchain: TBD
                </div>
                <div className="NodeTp">
                    Transaction Pool: TBD
                </div>
            </div>
        </Draggable >
    );
}

export default Node;
