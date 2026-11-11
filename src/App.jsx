import { useState } from 'react'
import './App.css'

// Precios estimados en USD. Varían según tienda, país e impuestos.
const GAMAS = {
  'Gama baja': {
    uso: 'Ofimática, estudio, juegos esports y títulos exigentes en calidad media.',
    componentes: [
      { tipo: 'Procesador', detalle: 'AMD Ryzen 5 5600 (6 núcleos)', precio: 130 },
      { tipo: 'Placa madre', detalle: 'B550M con soporte DDR4', precio: 95 },
      { tipo: 'Memoria RAM', detalle: '16 GB DDR4 3200 MHz (2x8)', precio: 40 },
      { tipo: 'Placa de video', detalle: 'Radeon RX 6600 8 GB', precio: 210 },
      { tipo: 'Almacenamiento', detalle: 'SSD NVMe 500 GB', precio: 40 },
      { tipo: 'Fuente', detalle: '550 W 80+ Bronze', precio: 50 },
      { tipo: 'Gabinete', detalle: 'Mid tower con buen flujo de aire', precio: 45 },
    ],
  },
  'Gama media': {
    uso: 'Juegos en 1440p con calidad alta, edición de video y streaming.',
    componentes: [
      { tipo: 'Procesador', detalle: 'AMD Ryzen 5 7600X (6 núcleos)', precio: 230 },
      { tipo: 'Placa madre', detalle: 'B650 con DDR5', precio: 160 },
      { tipo: 'Memoria RAM', detalle: '32 GB DDR5 5600 MHz (2x16)', precio: 110 },
      { tipo: 'Placa de video', detalle: 'GeForce RTX 4060 Ti 8 GB', precio: 400 },
      { tipo: 'Almacenamiento', detalle: 'SSD NVMe Gen4 1 TB', precio: 75 },
      { tipo: 'Fuente', detalle: '650 W 80+ Gold', precio: 85 },
      { tipo: 'Gabinete', detalle: 'Mid tower con 3 ventiladores', precio: 70 },
    ],
  },
  'Gama alta': {
    uso: 'Juegos en 4K, trabajo 3D, edición profesional y multitarea pesada.',
    componentes: [
      { tipo: 'Procesador', detalle: 'AMD Ryzen 9 7900X (12 núcleos)', precio: 400 },
      { tipo: 'Placa madre', detalle: 'X670 con DDR5 y PCIe 5.0', precio: 280 },
      { tipo: 'Memoria RAM', detalle: '32 GB DDR5 6000 MHz (2x16)', precio: 125 },
      { tipo: 'Placa de video', detalle: 'GeForce RTX 4070 Super 12 GB', precio: 620 },
      { tipo: 'Almacenamiento', detalle: 'SSD NVMe Gen4 2 TB', precio: 140 },
      { tipo: 'Fuente', detalle: '850 W 80+ Gold modular', precio: 130 },
      { tipo: 'Refrigeración', detalle: 'Water cooling AIO 280 mm', precio: 110 },
      { tipo: 'Gabinete', detalle: 'Full tower con panel de vidrio', precio: 120 },
    ],
  },
}

const usd = (n) => `US$ ${n.toLocaleString('en-US')}`

export default function ArmadoPc() {
  const [gama, setGama] = useState('')

  const seleccion = GAMAS[gama]
  const total = seleccion
    ? seleccion.componentes.reduce((suma, c) => suma + c.precio, 0)
    : 0

  return (
    <div className="app">
      <header className="hero">
        <h1>
         HERE IS
          <br />
          YOUR NEW PC
        </h1>
      </header>

      <section className="seccion">
        <h2>Resumen</h2>
        <div className="caja">
          <h3>Armado de PC</h3>
          <p>
            Elegí una gama y te mostramos qué componentes comprar y cuánto
            presupuestar para armarla.
          </p>
        </div>
      </section>

      <section className="seccion">
        <h2>Elegí tu gama</h2>
        <div className="caja caja--selector">
          <label htmlFor="gama">Qué tipo de PC querés armar</label>
          <select
            id="gama"
            value={gama}
            onChange={(e) => setGama(e.target.value)}
          >
            <option value="">Seleccionar gama</option>
            {Object.keys(GAMAS).map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="panel" aria-live="polite">
        {seleccion ? (
          <>
            <p className="panel__gama">{gama}</p>
            <p className="panel__total">{usd(total)}</p>
            <p className="panel__nota">Presupuesto estimado del equipo completo</p>
          </>
        ) : (
          <p className="panel__nota">
            Tu presupuesto estimado va a aparecer acá.
          </p>
        )}
      </section>

      {seleccion && (
        <>
          <section className="seccion">
            <h2>Uso recomendado</h2>
            <div className="caja">
              <p>{seleccion.uso}</p>
            </div>
          </section>

          <section className="seccion seccion--tabla">
            <h2>Componentes a comprar</h2>
            <table className="tabla">
              <thead>
                <tr>
                  <th scope="col">Componente</th>
                  <th scope="col">Especificación</th>
                  <th scope="col">Precio</th>
                </tr>
              </thead>
              <tbody>
                {seleccion.componentes.map((c) => (
                  <tr key={c.tipo}>
                    <th scope="row">{c.tipo}</th>
                    <td>{c.detalle}</td>
                    <td>{usd(c.precio)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row" colSpan={2}>
                    Total estimado
                  </th>
                  <td>{usd(total)}</td>
                </tr>
              </tfoot>
            </table>
            <p className="aviso">
              Los precios son aproximados y cambian según la tienda, el país y
              los impuestos. Verificalos antes de comprar.
            </p>
          </section>
        </>
      )}

      <footer className="pie">
        
        <a
          href="https://youtu.be/rpLmHMmamx4?si=0e6el632yju8JxVW"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3>Guía de actualizada</h3>
        </a>
      </footer>
    </div>
  )
}
