
import React from 'react'
import './PaginacionComponent.css'

function PaginacionComponent({totalItems, itemsPerPage, currentPage, onPageChange}) {
    console.log(totalItems)
    console.log(itemsPerPage)
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    console.log(totalPages);
    console.log(pageNumbers);
  return (
    <div className='PaginacionComponentContainer'>
        {
            pageNumbers.map((page)=>(
                <button key={page} onClick={() => onPageChange(page) } className={currentPage === page ? "ButtonPage active" : "ButtonPage"} >
                    {
                        page
                    }
                </button>
            ))
        }

    </div>
  )
}

export default PaginacionComponent


