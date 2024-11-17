import "./ProductItem.css"

function ProductItem(props) {
  const { thumbnail, title, price, stock, description } = props.data

  return (
    <>
      <div className="product__item">
        <div className="product__image">
          <img src={thumbnail} alt={title}/>
        </div>
        <h3 className="product__title">{title}</h3>
        <p className="product__description">{description}</p>
        <div className="blcok">
          <b className="product__price">Giá: {price}$</b>
          <p className="product__stock">Số lượng: {stock}.</p>
        </div>
      </div>
    </>
  )
}

export default ProductItem