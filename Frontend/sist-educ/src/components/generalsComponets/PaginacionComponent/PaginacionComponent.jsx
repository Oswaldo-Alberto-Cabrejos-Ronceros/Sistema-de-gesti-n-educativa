
import React,{useState} from 'react'
import './PaginacionComponent.css'

function PaginacionComponent({totalItems, itemsPerPage, currentPage, onPageChange}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxVisibleButtons = 10; //maximo de botones
    const step = 4; //salto
  
    // Estado para controlar el inicio del rango visible
    const [startIndex, setStartIndex] = useState(0);
  
    // Paginas visibles
    const endIndex = Math.min(startIndex + maxVisibleButtons, totalPages);
    const visiblePages = Array.from(
      { length: endIndex - startIndex },
      (_, i) => startIndex + i + 1
    );
  
    // Dunciones de desplazamientos
    const handleNext = () => {
      setStartIndex((prev) => Math.min(prev + step, totalPages - maxVisibleButtons));
    };
  
    const handlePrevious = () => {
      setStartIndex((prev) => Math.max(prev - step, 0));
    };
  
  return (
    <div className='PaginacionComponentContainer'>
              {/* Boton de desplazaminento para atras */}
      {startIndex > 0 && (
        <button className="ButtonPage" onClick={handlePrevious}>
          &lt; {/*  "<" */}
        </button>
      )}
        {
            visiblePages.map((page)=>(
                <button key={page} onClick={() => onPageChange(page) } className={currentPage === page ? "ButtonPage active" : "ButtonPage"} >
                    {
                        page
                    }
                </button>
            ))
        }

              {/* Boton de desplazaminento para adelante */}
      {endIndex < totalPages && (
        <button className="ButtonPage" onClick={handleNext}>
          &gt; {/* ">" */}
        </button>
      )}

    </div>
  )
}

export default PaginacionComponent


