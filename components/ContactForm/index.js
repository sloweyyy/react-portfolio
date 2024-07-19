import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Button from "../Button";

const ContactForm = ({ onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit the form");
            }

            const result = await response.json();
            console.log("Form submitted:", result);
            onClose();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div
                ref={formRef}
                className={`${
                    theme === "dark"
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                } rounded-lg shadow-xl p-6 w-full max-w-md`}
            >
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className={`mt-1 block w-full rounded-md ${
                                theme === "dark"
                                    ? "bg-gray-700 text-white"
                                    : "bg-gray-100 text-black"
                            } border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={`mt-1 block w-full rounded-md ${
                                theme === "dark"
                                    ? "bg-gray-700 text-white"
                                    : "bg-gray-100 text-black"
                            } border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows={4}
                            className={`mt-1 block w-full rounded-md ${
                                theme === "dark"
                                    ? "bg-gray-700 text-white"
                                    : "bg-gray-100 text-black"
                            } border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                        />
                    </div>
                    <div className="flex space-x-4">
                        <Button
                            type={"primary"}
                            onClick={handleSubmit}
                            className={`flex-1 ${
                                theme === "dark"
                                    ? "bg-white text-black"
                                    : "bg-black text-white"
                            }`}
                        >
                            Submit
                        </Button>
                        <Button
                            onClick={onClose}
                            className={`flex-1 ${
                                theme === "dark"
                                    ? "bg-gray-600 text-white"
                                    : "bg-gray-200 text-black"
                            }`}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
