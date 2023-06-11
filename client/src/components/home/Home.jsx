import React from "react";
import Header from "../navbar/Header";
import { Navbar, Nav, Row, Col } from "react-bootstrap";
import Addbook from "../crud-forms/Addbook";
import BookTable from "../table/Booktable";
import Footer from "../footer/Footer";


const Home = () => {
  return (
    <>
      <Header />
      <div className="container" styles={{ background: "#F5F5F5" }}>
        <Row className="my-4">
          <Col className="text-black py-3" xs={12} md={10}>
            <Addbook />
          </Col>
          <h3>Get All the Books</h3>
          <div>
            <BookTable />
          </div>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default Home;
