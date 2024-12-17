import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Send form data to the backend API
            const response = await axios.post("http://localhost:5000/api/contact", formData);

            // Show success popup
            if (response.status === 200) {
                setShowPopup(true);
                setFormData({ name: "", email: "", message: "" });
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to send your message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-12 px-8 md:px-16 lg:px-24 text-black dark:text-white">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">Contact</h1>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center justify-center">
                {/* Left Section */}
                <div className="w-full lg:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                        Let's code something <span className="text-blue-500">groundbreaking together.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                        "Join forces to innovate, craft transformative solutions, and build a smarter, connected world."
                    </p>
                </div>

                {/* Right Section - Form */}
                <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="name" className="block text-sm font-semibold mb-2">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="email" className="block text-sm font-semibold mb-2">Your Email</label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="message" className="block text-sm font-semibold mb-2">Your Message</label>
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Type your message here"
                                className="w-full p-3 border rounded-md focus:ring-2 text-black focus:ring-blue-500"
                                required
                            ></textarea>
                        </div>

                        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Success Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-lg">
                        <h2 className="text-xl font-bold mb-2">Success!</h2>
                        <p>Thank you for your response. We will get back to you shortly.</p>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact;
