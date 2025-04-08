import React from 'react';

export function Pagination({ totalPages, activePage, onPageChange }) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== activePage) {
      onPageChange(page);
    }
  };

  const renderPagination = () => {
    const pages = [];

    // Всегда показываем первую страницу
    pages.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={activePage === 1 ? 'active' : ''}
      >
        1
      </button>
    );

    if (totalPages <= 3) {
      // Если страниц 3 или меньше, показываем все
      for (let i = 2; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={activePage === i ? 'active' : ''}
          >
            {i}
          </button>
        );
      }
    } else {
      // Добавляем многоточие перед ближайшими страницами, если activePage > 3
      if (activePage > 3) {
        pages.push(
          <span key="dots1" className="dots">
            ...
          </span>
        );
      }

      // Определяем ближайшие страницы
      const startPage = Math.max(2, activePage - 1);
      const endPage = Math.min(totalPages - 1, activePage + 1);

      // Добавляем ближайшие страницы
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={activePage === i ? 'active' : ''}
          >
            {i}
          </button>
        );
      }

      // Добавляем многоточие после ближайших страниц, если до последней далеко
      if (activePage < totalPages - 2) {
        pages.push(
          <span key="dots2" className="dots">
            ...
          </span>
        );
      }

      // Всегда показываем последнюю страницу
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={activePage === totalPages ? 'active' : ''}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return <div className="pagination">{renderPagination()}</div>;
}
