import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import BookTable from "../table/Booktable";

const Addbook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
    const [submitted, setSubmitted] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4040/api/books", {
        title,
        author,
        category,
        price,
      });

      console.log("Book added:", response.data);

      // Reset the form fields
      setTitle("");
      setAuthor("");
      setCategory("");
      setPrice("");

      // Show success toast
      toast.success("Book added successfully!");

      // Update submission status
      setSubmitted(true);

    } catch (error) {
      console.error("Error adding book:", error);

      // Show error toast
      toast.error("Failed to add book.");
    }
  };
  if (submitted) {
    setSubmitted(false);
  }

  return (
    <div>
      <h3>Add Book</h3>
      <Form onSubmit={handleSubmit} style={{ padding: "20px" }}>
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
          Add Book
        </Button>
      </Form>
      <ToastContainer />

     
    </div>
  );
};

export default Addbook;
