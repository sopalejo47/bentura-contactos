export default function Home() {
  const contactos = [
    { nombre: "María Restrepo", empresa: "Grupo Andino", cargo: "CFO", email: "m.restrepo@andino.com" },
    { nombre: "Carlos Mejía", empresa: "Inversiones del Sur", cargo: "CEO", email: "c.mejia@inversur.com" },
    { nombre: "Laura Gómez", empresa: "Textiles Unidos", cargo: "Directora Financiera", email: "l.gomez@textiles.com" },
  ];

  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: 700, margin: "60px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 8 }}>Contactos</h1>
      <p style={{ color: "#888", fontSize: 14, marginBottom: 32 }}>{contactos.length} contactos</p>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #eee", color: "#999", textAlign: "left" }}>
            <th style={{ paddingBottom: 10, fontWeight: 500 }}>Nombre</th>
            <th style={{ paddingBottom: 10, fontWeight: 500 }}>Empresa</th>
            <th style={{ paddingBottom: 10, fontWeight: 500 }}>Cargo</th>
            <th style={{ paddingBottom: 10, fontWeight: 500 }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {contactos.map((c, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #f5f5f5" }}>
              <td style={{ padding: "14px 0", fontWeight: 500 }}>{c.nombre}</td>
              <td style={{ padding: "14px 0", color: "#555" }}>{c.empresa}</td>
              <td style={{ padding: "14px 0", color: "#555" }}>{c.cargo}</td>
              <td style={{ padding: "14px 0", color: "#888" }}>{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}