import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:4040/api",
});

// update books

const Updatebook = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    fetchBook(id);
  }, [id]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [books, setBooks] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // fetch books

  const fetchBook = async (id) => {
    try {
      const response = await api.get(`/books/${id}`);
      const bookData = response.data;

      setTitle(bookData.title);
      setAuthor(bookData.author);
      setCategory(bookData.category);
      setPrice(bookData.price);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch book.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
  const response = await api.put(`/books/${id}`, {
    title,
    author,
    category,
    price,
  });

  console.log("Book updated:", response.data);

      setTitle(response.data.title);
      setAuthor(response.data.author);
      setCategory(response.data.category);
      setPrice(response.data.price);

      toast.success("Book details updated successfully!");

      setSubmitted(true);

      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);

      toast.error("Failed to update book details.");
    }
  };

  return (
    <div>
      <h3 className="mt-4">Update Book Details</h3>
      <Row>
        <Col
          className="d-flex align-items-center justify-content-center text-black"
          xs={10}
          md={12}
        >
          <Form
            onSubmit={handleSubmit}
            style={{ padding: "20px", marginTop: "20px", width: "50%" }}
          >
            <Form.Group controlId="title" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="author" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="category" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="price" className="mb-3">
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="mt-3" variant="primary" type="submit">
              Update Book
            </Button>
          </Form>
        </Col>
      </Row>

      <ToastContainer />
    </div>
  );
};

export default Updatebook;
