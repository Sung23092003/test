import React, { useState } from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../../styles/car-item.css";

const CarItem = (props) => {
  const {
    images,
    model,
    carName,
    transmission,
    price,
    seats,
    address,
  } = props.item;

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };


  const carImage = images && images.length > 0 ? images[0] : "./default-image.jpg";

  return (
    <Col lg="4" md="4" sm="6" className="mb-5" style={{ width: '100%' }}>
      <div className="car__item">
        {/* Nút thả tim */}
        <div className="like__icon" onClick={handleLike}>
          <i className={isLiked ? "mdi mdi-like-outline liked" : "mdi mdi-like-outline"}></i>
        </div>

        {/* Hình ảnh của xe */}
        <div className="car__img">
          <img src={carImage} alt={carName || model} className="w-100" /> { }
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{carName || model}</h4>
          <h6 className="rent__price text-center">
            ${price}.00 <span>/ Ngày</span>
          </h6>

          {/* Thông tin xe */}
          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className="d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {model}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i> {transmission}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="ri-user-fill"></i> {seats}
            </span>
          </div>

          {/* Biểu tượng Like và Car */}
          <div className="mt-2 icons-container">
            <div className="icon-item">
              <i className="ri-thumb-up-line like-icon"></i>
            </div>
            <div className="icon-item">
              <i className="ri-car-line car-icon"></i>
            </div>
          </div>

          {/* Hiển thị địa điểm */}
          <div className="location-container">
            <i className="ri-map-pin-line"></i>
            <span>{address}</span>
          </div>

          {/* Nút Thuê và Chi tiết */}
          <button className="w-50 car__item-btn car__btn-rent">
            <Link to={`/cars/${carName || model}`}>Thuê</Link>
          </button>

          <button className="w-50 car__item-btn car__btn-details">
            <Link to={`/cars/${carName || model}`}>Chi tiết</Link>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
