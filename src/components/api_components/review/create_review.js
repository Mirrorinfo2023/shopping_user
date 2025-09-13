import React, { useState } from "react";

const ReviewForm = ({ productId, customerId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    const payload = { productId, customerId, rating, comment };

    try {
      const response = await fetch("/api/reviews/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Failed to submit review");
      }

      const data = await response.json();
      console.log("API Response:", data);

      setMessage("Review submitted successfully!");
      setComment("");
      setRating(5);
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Submit Review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>

        <label style={{ display: "block", marginTop: "10px" }}>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            style={{ width: "100%", padding: "5px" }}
          />
        </label>

        <button
          type="submit"
          disabled={loading || !comment.trim()}
          style={{ marginTop: "10px", padding: "8px 12px" }}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default ReviewForm;
