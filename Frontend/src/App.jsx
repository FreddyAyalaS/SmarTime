// src/App.jsx
import React from 'react'; // Asegúrate de tener React importado
import Button from './components/Button'; // Asegúrate que la ruta sea correcta

// Opcional: si quieres probar con íconos (instala @heroicons/react si es necesario)
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid'; // Si los usas

function App() {
  const handleSimpleClick = (message) => {
    console.log(`Botón "${message}" clickeado!`);
    alert(`Botón "${message}" clickeado!`);
  };

  return (
    <div className="container mx-auto p-8 space-y-6"> {/* Espaciado y centrado básico */}
      <h1 className="text-3xl font-bold text-center mb-8">Probando el Componente Button</h1>

      {/* --- Variantes --- */}
      <div className="p-4 border rounded-md">
        <h2 className="text-xl font-semibold mb-3">Variantes:</h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => handleSimpleClick('Primario (Default)')}>
            Primario
          </Button>
          <Button variant="secondary" onClick={() => handleSimpleClick('Secundario')}>
            Secundario
          </Button>
          <Button variant="success" onClick={() => handleSimpleClick('Success')}>
            Success
          </Button>
          <Button variant="danger" onClick={() => handleSimpleClick('Danger')}>
            Danger
          </Button>
          <Button variant="outline" onClick={() => handleSimpleClick('Outline')}>
            Outline
          </Button>
          <Button variant="ghost" onClick={() => handleSimpleClick('Ghost')}>
            Ghost
          </Button>
        </div>
      </div>

      {/* --- Tamaños --- */}
      <div className="p-4 border rounded-md">
        <h2 className="text-xl font-semibold mb-3">Tamaños:</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <Button size="sm" onClick={() => handleSimpleClick('Pequeño')}>
            Pequeño (sm)
          </Button>
          <Button size="md" onClick={() => handleSimpleClick('Mediano (md)')}>
            Mediano (md)
          </Button>
          <Button size="lg" onClick={() => handleSimpleClick('Grande (lg)')}>
            Grande (lg)
          </Button>
        </div>
      </div>

      {/* --- Estado Deshabilitado --- */}
      <div className="p-4 border rounded-md">
        <h2 className="text-xl font-semibold mb-3">Deshabilitado:</h2>
        <div className="flex flex-wrap gap-3">
          <Button disabled onClick={() => handleSimpleClick('Este no debería funcionar')}>
            Primario Deshabilitado
          </Button>
          <Button variant="success" disabled>
            Success Deshabilitado
          </Button>
        </div>
      </div>

      {/* --- Ancho Completo --- */}
      <div className="p-4 border rounded-md">
        <h2 className="text-xl font-semibold mb-3">Ancho Completo:</h2>
        <Button fullWidth variant="primary" onClick={() => handleSimpleClick('Full Width')}>
          Botón Full Width
        </Button>
      </div>

      {/* --- Con Íconos (Opcional) --- */}
      <div className="p-4 border rounded-md">
        <h2 className="text-xl font-semibold mb-3">Con Íconos:</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="success" onClick={() => handleSimpleClick('Agregar con Ícono')}>
            <PlusIcon className="h-5 w-5 mr-2" />
            Agregar
          </Button>
          <Button iconOnly variant="danger" size="sm" onClick={() => handleSimpleClick('Eliminar IconOnly')}>
            <TrashIcon className="h-4 w-4" />
          </Button>
          <Button iconOnly variant="secondary" size="md" onClick={() => handleSimpleClick('Editar IconOnly')}>
            <PencilIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

     {/* --- Con Clase Adicional --- */}
     <div className="p-4 border rounded-md">
       <h2 className="text-xl font-semibold mb-3">Con Clase Adicional:</h2>
         <Button className="bg-pink-500 hover:bg-pink-600 text-white" onClick={() => handleSimpleClick('Custom Pink')}>
           Botón Rosa Custom
         </Button>
     </div>

    </div>
  );
}

export default App;