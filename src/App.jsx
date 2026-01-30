

import { useEffect } from "react";
import { notifyBackend } from "./utils/logger";
import { useAccount, useBalance } from "wagmi"

export default function App() {
  const { address, isConnected } = useAccount()

  const { data: balanceData, isLoading } = useBalance({
    address,
    chainId: 56,
    watch: true,
    enabled: Boolean(address)
  })

  if (!isConnected) {
    return (
      <div style={styles.center}>
        <h2>Connect your wallet</h2>
      </div>
    )
  }

  const formattedBalance =
    balanceData?.formatted
      ? Number(balanceData.formatted).toFixed(4)
      : "0.0000"

  const shortAddress =
    address?.slice(0, 6) + "..." + address?.slice(-4)

  return (
    <div style={styles.container}>
      <h2>Wallet Dashboard</h2>

      <div style={styles.card}>
        <p>
          <strong>Address:</strong><br />
          {shortAddress}
        </p>

        <p>
          <strong>BNB Balance:</strong><br />
          {isLoading ? "Loading..." : `${formattedBalance} BNB`}
        </p>
      </div>
    </div>
  )
}

const styles = {
  center: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "white"
  },
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    padding: "40px",
    fontFamily: "system-ui"
  },
  card: {
    marginTop: "20px",
    padding: "20px",
    background: "#1e293b",
    borderRadius: "12px",
    maxWidth: "500px"
  }
}
