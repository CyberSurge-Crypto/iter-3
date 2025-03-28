## React Handlers that calls backend APIs

1. [Function handleTransaction](./src/Banner.tsx#L15) This function sends a transaction JSON to the backend. __TODO:__ Do we need to add a signing pop window?

2. [Function handleMine](./src/Blockchain.tsx#46) This function sends a mine-block request to the backend.

3. [Function setUserKey, setBalance, setLogs, setTransactionPool](./src/Blockchain.tsx#9) These functions updates the UI when the backend notifies them.

<!-- WANT: 后端向前端发送数据（明文？）的时候，前端解析，然后更新相应的DOMs -->