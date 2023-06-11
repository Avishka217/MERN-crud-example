import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:4040/api",
});

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch books.");
    }
  };

  const handleDelete = async (id) => {
    try {
      // Send delete request to the server
      await api.delete(`/books/${id}`);

      // Update the book list by filtering out the deleted book
      const updatedBooks = books.filter((book) => book._id !== id);
      setBooks(updatedBooks);

      toast.success("Book deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete book.");
    }
  };

  const handleEdit = (id) => {
    // Redirect to the updateBook page with the book ID as a parameter
      navigate(`/updateBook/${id}`);
  };

  return (
    <div style={{ maxHeight: "400px", overflow: "auto" }}>
      <Table striped bordered hover>
        {/* Table headers */}
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              {/* Table cells */}
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.price}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(book._id)}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </Button>{" "}
                <Button variant="success" onClick={() => handleEdit(book._id)}>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
    </div>
  );
};

export default BookTable;
