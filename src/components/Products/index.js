import { useEffect, useState } from 'react'
import ProductItem from '../ProductItem'
import "./Product.css"

function Products() {
  const limit = 8;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [quantityPage, setQuantityPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const startPage = Math.max(currentPage - 2, 0); //- trang dau can show || cai viec +- 2 muc dich de ngan cach 2 trang so voi curentPage
  const endPage = Math.min(currentPage + 2, quantityPage - 1); //-trang cuoi can show

  useEffect(() => {
    const fetchApi = () => {
      setLoading(true);
      fetch(`https://dummyjson.com/products?skip=${currentPage * limit}&limit=${limit}`)
        .then(res => res.json())
        .then(data => {
          setData(data.products)
          setQuantityPage(Math.ceil(data.total / limit))
          setLoading(false);
        })
    }
    setTimeout(() => {
      fetchApi();
    }, 2000)

  }, [currentPage])

  // Hàm xử lý thay đổi trang
  const handlePageChange = (action) => {
    // action có thể là 'previous', 'next', hoặc một số chỉ định trang cụ thể
    if (action === 'previous') {
      setCurrentPage(currentPage - 1)
    } else if (action === 'next') {
      setCurrentPage(currentPage + 1)
    } else if (typeof action === 'number') {
      setCurrentPage(action)
    }
  }

  return (
    <>
      {loading ? <div>Đang tải dữ liệu...</div> : <><div className="product">
        {data?.map(item => <ProductItem key={item.id} data={item} />)}
      </div>

        <div className='pagination'>
          {/* Hiển thị "Trang trước" chỉ khi không ở trang đầu */}
          {currentPage > 0 && (
            <div
              className='pagination__item pagination-first'
              onClick={() => handlePageChange('previous')}
            >
              Trang trước
            </div>
          )}

          {[...Array(endPage - startPage + 1)].map((_, index) => { //-tạo một mảng trống với độ dài bằng số lượng trang cần hiển thị (từ startPage đến endPage)
            const pageIndex = startPage + index;
            return (
              <div
                key={pageIndex}
                className={`pagination__item ${pageIndex === currentPage ? "active" : ""}`}
                onClick={() => handlePageChange(pageIndex)}
              >
                {pageIndex + 1}
              </div>
            );
          })}

          {/* Hiển thị "Trang sau" chỉ khi không ở trang cuối */}
          {currentPage < quantityPage - 1 && (
            <div
              className='pagination__item pagination-last'
              onClick={() => handlePageChange('next')}
            >
              Trang sau
            </div>
          )}
        </div></>}

    </>
  )
}

export default Products;
