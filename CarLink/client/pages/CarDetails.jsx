import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import BookingForm from "../src/components/UI/BookingForm";
import PaymentMethod from "../src/components/UI/PaymentMethod";
import SeachBar from "../src/components/SearchBar/SearchBar";

const CarDetails = () => {
  const { slug } = useParams();
  const [singleCarItem, setSingleCarItem] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    // Gọi API để lấy chi tiết xe dựa trên `slug`
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/searching/cars/${slug}`);
        const data = await response.json();
        setSingleCarItem(data);
        setCurrentImage(data.images[0]); 
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết xe:", error);
      }
    };

    fetchCarDetails();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleImageClick = (img) => {
    setCurrentImage(img);
  };

  if (!singleCarItem) {
    return <p>Loading...</p>; // Hiển thị khi dữ liệu đang tải
  }

  return (
    <section>
      <Container>
        <Row className="mb-5">
          <Col lg="12">
            <SeachBar />
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <img src={currentImage} alt={singleCarItem.carName} className="w-100" />
            <div className="image-thumbnails d-flex mt-2">
              {singleCarItem.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className="thumbnail"
                  onClick={() => handleImageClick(img)}
                  style={{ cursor: "pointer", width: "100px", marginRight: "10px" }}
                />
              ))}
            </div>
          </Col>

          <Col lg="6">
            <div className="car__info">
              <h2 className="section__title">{singleCarItem.carName}</h2>
              <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                <h6 className="rent__price fw-bold fs-4">
                  ${singleCarItem.price}.00 / ngày
                </h6>
                <span className="d-flex align-items-center gap-2">
                  <span style={{ color: "#f9a826" }}>
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-s-fill"></i>
                  </span>
                  ({singleCarItem.rating} đánh giá)
                </span>
              </div>

              <p className="section__description">{singleCarItem.description}</p>

              <div className="d-flex align-items-center mt-3" style={{ columnGap: "4rem" }}>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i className="ri-roadster-line" style={{ color: "#f9a826" }}></i>{" "}
                  {singleCarItem.model}
                </span>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i className="ri-settings-2-line" style={{ color: "#f9a826" }}></i>{" "}
                  {singleCarItem.transmission}
                </span>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i className="ri-user-fill" style={{ color: "#f9a826" }}></i>{" "}
                  {singleCarItem.seats}
                </span>
              </div>

              <div className="d-flex align-items-center mt-3" style={{ columnGap: "2.8rem" }}>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i className="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                  {singleCarItem.address}
                </span>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i className="ri-building-2-line" style={{ color: "#f9a826" }}></i>{" "}
                  {singleCarItem.brand}
                </span>
              </div>
            </div>
          </Col>

          <Col lg="7" className="mt-1">
            <div className="booking-info mt-5">
              <h5 className="mb-4 fw-bold">Thông tin đặt xe</h5>
              <BookingForm />
            </div>
          </Col>

          <Col lg="5" className="mt-1">
            <div className="payment__info mt-5">
              <h5 className="mb-4 fw-bold">Thông tin thanh toán</h5>
              <PaymentMethod />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CarDetails;
