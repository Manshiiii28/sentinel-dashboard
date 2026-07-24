import { useEffect, useState } from 'react';
import { fetchClients, fetchLogs, toggleBlockClient } from './api';
import './App.css';

function App() {
  const [clients, setClients] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 4000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const [clientsData, logsData] = await Promise.all([fetchClients(), fetchLogs()]);
      setClients(clientsData);
      setLogs(logsData);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load data:', err);
      setLoading(false);
    }
  };

  const handleToggleBlock = async (id) => {
    await toggleBlockClient(id);
    loadData();
  };

  const statusColor = (status) => {
    if (status === 'allowed') return '#22c55e';
    if (status === 'flagged') return '#eab308';
    return '#ef4444';
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', background: '#0f172a', minHeight: '100vh', color: '#fff' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>🛡️ Sentinel Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>Clients</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #334155', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem' }}>Name</th>
                <th style={{ padding: '0.75rem' }}>Algorithm</th>
                <th style={{ padding: '0.75rem' }}>Rate Limit</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client._id} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '0.75rem' }}>{client.name}</td>
                  <td style={{ padding: '0.75rem' }}>{client.algorithm}</td>
                  <td style={{ padding: '0.75rem' }}>{client.rateLimit}/{client.windowSeconds}s</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ color: client.isBlocked ? '#ef4444' : '#22c55e' }}>
                      {client.isBlocked ? '🔴 Blocked' : '🟢 Active'}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <button
                      onClick={() => handleToggleBlock(client._id)}
                      style={{
                        padding: '0.4rem 0.8rem',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        background: client.isBlocked ? '#22c55e' : '#ef4444',
                        color: '#fff',
                      }}
                    >
                      {client.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>Live Requests (last 20)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #334155', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem' }}>Client</th>
                <th style={{ padding: '0.75rem' }}>Endpoint</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Reason</th>
                <th style={{ padding: '0.75rem' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '0.75rem' }}>{log.clientId?.name || 'Unknown'}</td>
                  <td style={{ padding: '0.75rem' }}>{log.endpoint}</td>
                  <td style={{ padding: '0.75rem', color: statusColor(log.status) }}>{log.status}</td>
                  <td style={{ padding: '0.75rem', fontSize: '0.85rem', color: '#94a3b8' }}>{log.reason || '-'}</td>
                  <td style={{ padding: '0.75rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;