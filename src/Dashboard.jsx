import React, { useState } from "react";
import { areasTipos } from "./data/roles.json";

const familias = {
  "GRÁFICOS Y ADHESIVOS": ["CALCOMANÍAS Y STICKERS"],
  "LÁMINAS METÁLICAS": ["ACERO GALVANIZADO", "ACERO INOXIDABLE"],
  "LÁMINAS NO METÁLICAS": [
    "PLÁSTICOS Y DERIVADOS",
    "COMPUESTOS / FIBRAS",
    "MADERAS Y DERIVADOS",
  ],
  "CONECTORES Y TERMINALES": ["CONECTORES", "TERMINALES DE PIN / OJO / GRAPA"],
};

const materialesPorFamiliaSubfamilia = {
  "GRÁFICOS Y ADHESIVOS": {
    "CALCOMANÍAS Y STICKERS": [
      {
        material: "VINILO LAMINADO",
        composicion: "PAPEL",
        dimension: "5X5",
        unidad: "CM",
        propiedad: "DURABILIDAD",
        calibre: "",
        serie: "",
      },
      {
        material: "STICKERS LAMINADOS",
        composicion: "VINILO",
        dimension: "10X10",
        unidad: "M",
        propiedad: "RESISTENCIA UV",
        calibre: "",
        serie: "",
      },
    ],
  },
  "LÁMINAS METÁLICAS": {
    "ACERO GALVANIZADO": [
      {
        material: "LÁMINA GALVANIZADA",
        composicion: "ACERO AL CARBONO",
        dimension: "1,90X0,90X3,00",
        unidad: "MM",
        propiedad: "DURABILIDAD",
        calibre: "",
        serie: "",
      },
    ],
    "ACERO INOXIDABLE": [
      {
        material: "LÁMINA ACERO INOXIDABLE ACABADO CANTO",
        composicion: "HIERRO + CROMO",
        dimension: "0,8X1000X2000",
        unidad: "MM",
        propiedad: "RESISTENCIA A LA CORROSIÓN",
        calibre: "",
        serie: "",
      },
    ],
  },
  "LÁMINAS NO METÁLICAS": {
    "PLÁSTICOS Y DERIVADOS": [
      {
        material: "POLICARBONATO ALVEOLAR",
        composicion: "POLIURETANO",
        dimension: "4X1,05X12",
        unidad: "MM",
        propiedad: "ALTA TRANSPARENCIA",
        calibre: "",
        serie: "",
      },
      {
        material: "VINILOS",
        composicion: "POLIURETANO",
        dimension: "4X2,10X12",
        unidad: "MM",
        propiedad: "LIGERO",
        calibre: "",
        serie: "",
      },
    ],
    "COMPUESTOS / FIBRAS": [
      {
        material: "PRFV",
        composicion: "PLÁSTICO REFORZADO",
        dimension: "1.5X1.2",
        unidad: "M",
        propiedad: "RESISTENTE A LA CORROSIÓN",
        calibre: "",
        serie: "",
      },
      {
        material: "FIBRA BLANCA",
        composicion: "PLÁSTICO REFORZADO",
        dimension: "10X1.5",
        unidad: "M",
        propiedad: "RESISTENTE A LA CORROSIÓN",
        calibre: "",
        serie: "",
      },
      {
        material: "MANTAS PE",
        composicion: "PLÁSTICO REFORZADO",
        dimension: "1.5X6",
        unidad: "M",
        propiedad: "RESISTENTE A LA CORROSIÓN",
        calibre: "",
        serie: "",
      },
      {
        material: "MANTA PRFV",
        composicion: "PLÁSTICO REFORZADO",
        dimension: "1.5X1.5",
        unidad: "M",
        propiedad: "RESISTENTE A LA CORROSIÓN",
        calibre: "",
        serie: "",
      },
    ],
    "MADERAS Y DERIVADOS": [
      {
        material: "MELAMINA",
        composicion: "MELAMINA",
        dimension: "ESPESORES: 9, 15, 18, 25 X 1.22 × 2.44",
        unidad: "MM,M",
        propiedad: "SUPERFICIE DURA",
        calibre: "",
        serie: "",
      },
      {
        material: "MADERA PINO",
        composicion: "MADERA PINO",
        dimension: "ESPESORES: 9, 15, 18, 25 X 1.22 × 2.44",
        unidad: "MM,M",
        propiedad: "SUPERFICIE DURA",
        calibre: "",
        serie: "",
      },
      {
        material: "MDF / RH MUF / FORMALETAS",
        composicion: "MDF, RH MUF, FORMALETAS",
        dimension: "ESPESORES: 9, 15, 18, 25 X 1.22 × 2.44",
        unidad: "MM,M",
        propiedad: "SUPERFICIE DURA",
        calibre: "",
        serie: "",
      },
    ],
  },
  "CONECTORES Y TERMINALES": {
    CONECTORES: [
      {
        material: "ECONOSEAL",
        composicion: "COBRE",
        dimension: "ANCHO 2.8",
        unidad: "MM²",
        propiedad: "CONEXIÓN RÁPIDA",
        calibre: "0.5MM²",
        serie: "XXX_XXX_XXX",
      },
      {
        material: "DUAC",
        composicion: "CAUCHO SILICONADO",
        dimension: "ANCHO 4.8",
        unidad: "A",
        propiedad: "MACHO/HEMBRA 6 VÍAS",
        calibre: "6MM²",
        serie: "XXX_XXX_XXX",
      },
    ],
    "TERMINALES DE PIN / OJO / GRAPA": [
      {
        material: "TERMINAL MACHO/HEMBRA AWG",
        composicion: "LATÓN ESTAÑADO",
        dimension: "6.3X15",
        unidad: "MM",
        propiedad: "CONEXIÓN RÁPIDA",
        calibre: "20A",
        serie: "SJFJFF55555",
      },
      {
        material: "TERMINAL OJO",
        composicion: "COBRE",
        dimension: "2.8X25",
        unidad: "A",
        propiedad: "DESMONTAJE SENCILLO",
        calibre: "22A",
        serie: "XXX_XXX_XXX",
      },
    ],
  },
};

const categorias = [
  { nombre: "MATERIAL", key: "material", opciones: [] },
  { nombre: "COMPOSICION", key: "composicion", opciones: [] },
  { nombre: "DIMENSION", key: "dimension", opciones: [] },
  { nombre: "UNIDAD", key: "unidad", opciones: [] },
  { nombre: "PROPIEDAD", key: "propiedad", opciones: [] },
  { nombre: "CALIBRE", key: "calibre", opciones: [] },
  { nombre: "SERIE", key: "serie", opciones: [] },
];

// Array de taxonomías existentes para validar
const taxonomiasExistentes = [
  "MP_VINIL_LAMIN_VINIL_10X10_M_RESIS_UV",
  "SEM_LÁMIN_GALVA_ACERO_AL_CARBO_1,90X0,90X3,00_MM_DURAB",
  "SET_ECONO_COBRE_O_LATÓN_ANCHO 2.8_MM²_CONEX_RÁPID_0.5MM²_XXX_XXX_XXX",
  // AGREGA LAS QUE NECESITES
];

export default function Dashboard({ user, onLogout }) {
  const { area } = user;
  const [loading, setLoading] = useState(false);
  const [mensajeCreado, setMensajeCreado] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [familiaSeleccionada, setFamiliaSeleccionada] = useState("");
  const [subfamiliaSeleccionada, setSubfamiliaSeleccionada] = useState("");
  const [criterios, setCriterios] = useState(
    categorias.reduce((acc, cat) => ({ ...acc, [cat.nombre]: "" }), {})
  );
  const [popup, setPopup] = useState({ abierto: false, categoria: "" });
  const [taxonomiaExiste, setTaxonomiaExiste] = useState(false);

  const handleCriterioChange = (categoria, valor) => {
    setCriterios({ ...criterios, [categoria]: valor });
    setPopup({ abierto: false, categoria: "" });
  };

  const generarAbreviatura = texto => {
    if (!texto) return "";
    const palabras = texto.split(/[\s/-]+/).slice(0, 3);
    const bloques = palabras.map(p =>
      p.substring(0, Math.min(5, Math.max(3, p.length))).toUpperCase()
    );
    return bloques.join("_");
  };

  const getOpcionesCategoria = cat => {
    if (!familiaSeleccionada || !subfamiliaSeleccionada) return cat.opciones;

    if (
      familiaSeleccionada !== "CONECTORES Y TERMINALES" &&
      (cat.key === "CALIBRE" || cat.key === "SERIE")
    ) {
      return [];
    }

    const materiales =
      materialesPorFamiliaSubfamilia[familiaSeleccionada]?.[subfamiliaSeleccionada];
    if (!materiales || materiales.length === 0) return cat.opciones;

    switch (cat.key) {
      case "material":
        return materiales.map(m => m.material);
      case "composicion":
        return materiales.map(m => m.composicion).filter(Boolean);
      case "dimension":
        return materiales.map(m => m.dimension).filter(Boolean);
      case "unidad":
        return materiales.map(m => m.unidad).filter(Boolean);
      case "propiedad":
        return materiales.map(m => m.propiedad).filter(Boolean);
      case "calibre":
        return materiales.map(m => m.calibre).filter(Boolean);
      case "serie":
        return materiales.map(m => m.serie).filter(Boolean);
      default:
        return cat.opciones;
    }
  };

  const taxonomia = [
    tipoSeleccionado,
    ...categorias
      .map(cat =>
        ["material", "composicion", "propiedad"].includes(cat.key)
          ? generarAbreviatura(criterios[cat.nombre])
          : criterios[cat.nombre]?.trim() || ""
      )
      .filter(Boolean),
  ].join("_");
  React.useEffect(() => {
    if (!taxonomia) return;
    setTaxonomiaExiste(taxonomiasExistentes.includes(taxonomia));
  }, [taxonomia]);

  // Función para crear el item
  const handleCrearItem = async () => {
    if (!taxonomia) {
      setMensajeCreado("⚠ Por favor, complete los criterios para generar la taxonomía.");
      return;
    }

    if (taxonomiaExiste) {
      setMensajeCreado("⚠ La taxonomía ya existe, no se puede crear.");
      return;
    }

    setLoading(true);
    setMensajeCreado("");

    // Simulamos un delay como si fuera una llamada a API
    await new Promise(res => setTimeout(res, 2000));

    setLoading(false);
    setMensajeCreado("✅ Item creado exitosamente");
  };

  const taxonomiaEsValida = () => {
    // Todas las categorías deben tener un valor
    const todasSeleccionadas = categorias
      .filter(
        cat =>
          !(
            familiaSeleccionada !== "CONECTORES Y TERMINALES" &&
            (cat.key === "calibre" || cat.key === "serie")
          )
      )
      .every(cat => criterios[cat.nombre]?.trim());

    return todasSeleccionadas && !taxonomiaExiste;
  };

  return (
    <div className="p-8 font-sans bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Bienvenido {user.usuario} ({area})
      </h2>
      <div className="flex justify-end">
        <button
          onClick={onLogout}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-400 transition mb-4">
          Logout
        </button>
      </div>

      {/* Select Tipo según área */}

      {/* Familia y Subfamilia */}
      <div className="flex items-center space-x-6">
        <div className="">
          <select
            className="border rounded-lg px-3 py-2 bg-white w-60 focus:ring-2 focus:ring-blue-50"
            value={tipoSeleccionado}
            onChange={e => {
              setTipoSeleccionado(e.target.value);
              setCriterios(prev =>
                categorias.reduce((acc, cat) => ({ ...acc, [cat.nombre]: "" }), {})
              );
              setSubfamiliaSeleccionada("");
              setPopup({ abierto: false, categoria: "" });
            }}>
            <option value="">-- TIPO --</option>
            {areasTipos[area].map(tipo => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="border rounded-lg bg-white px-3 py-2 w-60 focus:ring-2 focus:ring-blue-500"
            value={familiaSeleccionada}
            onChange={e => {
              setFamiliaSeleccionada(e.target.value);
              setSubfamiliaSeleccionada("");
            }}>
            <option value="">-- FAMILIA --</option>
            {Object.keys(familias)
              .filter(fam => {
                // Ejemplo de restricción por tipo
                if (
                  area === "Tecnología" &&
                  ["SET", "PPT", "PTT"].includes(tipoSeleccionado)
                ) {
                  return fam === "CONECTORES Y TERMINALES";
                }
                return true;
              })
              .map(fam => (
                <option key={fam} value={fam}>
                  {fam}
                </option>
              ))}
          </select>
        </div>

        <div>
          <select
            className="border rounded-lg px-3 bg-white py-2 w-60 focus:ring-2 focus:ring-blue-500"
            value={subfamiliaSeleccionada}
            onChange={e => setSubfamiliaSeleccionada(e.target.value)}
            disabled={!familiaSeleccionada}>
            <option value="">-- SUBFAMILIA --</option>
            {familiaSeleccionada &&
              familias[familiaSeleccionada]
                .filter(sub => {
                  if (
                    area === "Tecnología" &&
                    ["SET", "PPT", "PTT"].includes(tipoSeleccionado)
                  ) {
                    return ["CONECTORES", "TERMINALES DE PIN / OJO / GRAPA"].includes(
                      sub
                    );
                  }
                  return true;
                })
                .map(sub => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
          </select>
        </div>
      </div>

      {/* Tabla categorías */}
      <h3 className="text-xl font-semibold mt-8 mb-4">Tabla de Categorías</h3>
      <table className="table-auto border-collapse border border-gray-300 w-full bg-white shadow-sm rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Categoría</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Criterio</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Abreviatura</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(cat => {
            if (
              familiaSeleccionada !== "CONECTORES Y TERMINALES" &&
              (cat.key === "calibre" || cat.key === "serie")
            )
              return null;

            return (
              <tr key={cat.nombre} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{cat.nombre}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-[#F59527] text-white px-3 py-1 rounded-lg hover:bg-[#F5B067]"
                    onClick={() => setPopup({ abierto: true, categoria: cat.nombre })}>
                    {criterios[cat.nombre] || "Seleccionar"}
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {["material", "composicion", "propiedad"].includes(cat.key)
                    ? generarAbreviatura(criterios[cat.nombre])
                    : criterios[cat.nombre] || "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Popup */}
      {popup.abierto && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h4 className="text-lg font-semibold mb-4">Seleccione {popup.categoria}</h4>
            <div className="space-y-2">
              {getOpcionesCategoria(
                categorias.find(c => c.nombre === popup.categoria)
              ).map(op => (
                <button
                  key={op}
                  onClick={() => handleCriterioChange(popup.categoria, op)}
                  className="block w-full text-left px-3 py-2 border rounded-lg hover:bg-blue-100">
                  {op}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPopup({ abierto: false, categoria: "" })}
              className="mt-4 w-full bg-[#F59527] text-white py-2 rounded-lg hover:bg-gray-500">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Taxonomía */}
      <h3 className="text-xl font-semibold mt-8 mb-2">Taxonomía Generada</h3>
      <p
        className={`text-gray-700 bg-white p-4 rounded-lg shadow-md ${
          taxonomiaExiste ? "border border-red-500" : ""
        }`}>
        {taxonomia ? taxonomia : "Seleccione criterios para generar la taxonomía"}
      </p>
      {taxonomiaExiste && (
        <p className="text-red-400 mt-2 font-medium">⚠ La taxonomía ya existe.</p>
      )}
      {/* Botón Crear Item */}
      <div className="mt-6">
        <button
          onClick={handleCrearItem}
          disabled={!taxonomiaEsValida() || loading}
          style={{ backgroundColor: "#F59527" }}
          className={`text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-colors ${
            !taxonomiaEsValida() || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}>
          {loading ? "Creando..." : "Crear Item"}
        </button>
        {mensajeCreado && (
          <p
            className={`mt-3 font-medium ${
              mensajeCreado.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}>
            {mensajeCreado}
          </p>
        )}
      </div>
    </div>
  );
}
