import { useState } from "react";
import axios from "axios";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    education: "",
  });
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateResume = async () => {
    setLoading(true);
    setResume("");
    try {
      const response = await axios.post("http://localhost:3001/generate", {
        messages: [
          {
            role: "user",
            content: `Create a professional resume for:
Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Skills: ${form.skills}
Experience: ${form.experience}
Education: ${form.education}
Format it cleanly and professionally.`,
          },
        ],
      });
      setResume(response.data.content[0].text);
    } catch (err) {
      setResume("Error generating resume. Please try again.");
    }
    setLoading(false);
  };

  const printResume = () => window.print();

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", padding: "40px 20px", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ color: "white", fontSize: 42, margin: 0, fontWeight: 800, letterSpacing: -1 }}>
          ✨ AI Resume Builder
        </h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 18, marginTop: 10 }}>
          Create a professional resume in seconds — powered by AI
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gridTemplateColumns: resume ? "1fr 1fr" : "1fr", gap: 30 }}>

        {/* Form Card */}
        <div style={{ background: "white", borderRadius: 20, padding: 35, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
          <h2 style={{ margin: "0 0 25px", color: "#2d3748", fontSize: 22 }}>📝 Your Details</h2>

          {[
            { key: "name", label: "Full Name", placeholder: "e.g. Prit Bhavsar", rows: 1 },
            { key: "email", label: "Email Address", placeholder: "e.g. prit@gmail.com", rows: 1 },
            { key: "phone", label: "Phone Number", placeholder: "e.g. 9876543210", rows: 1 },
            { key: "skills", label: "Skills", placeholder: "e.g. JavaScript, React, Node.js, Python", rows: 2 },
            { key: "experience", label: "Work Experience", placeholder: "e.g. 1 year at XYZ company as Frontend Developer...", rows: 3 },
            { key: "education", label: "Education", placeholder: "e.g. B.Tech Computer Science, Gujarat University, 2024", rows: 2 },
          ].map(({ key, label, placeholder, rows }) => (
            <div key={key} style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontWeight: 600, color: "#4a5568", marginBottom: 6, fontSize: 14 }}>
                {label}
              </label>
              <textarea
                name={key}
                value={form[key]}
                onChange={handleChange}
                placeholder={placeholder}
                rows={rows}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "2px solid #e2e8f0",
                  fontSize: 14,
                  fontFamily: "inherit",
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border 0.2s",
                }}
                onFocus={e => e.target.style.border = "2px solid #0f3460"}
                onBlur={e => e.target.style.border = "2px solid #e2e8f0"}
              />
            </div>
          ))}

          <button
            onClick={generateResume}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: loading ? "#a0aec0" : "linear-gradient(135deg, #0f3460, #533483)",
              color: "white",
              border: "none",
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: 5,
              letterSpacing: 0.5,
            }}
          >
            {loading ? "⏳ Generating your resume..." : "✨ Generate My Resume"}
          </button>
        </div>

        {/* Resume Output */}
        {resume && (
          <div style={{ background: "white", borderRadius: 20, padding: 35, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0, color: "#2d3748", fontSize: 22 }}>📄 Your Resume</h2>
              <button
                onClick={printResume}
                style={{
                  padding: "8px 18px",
                  background: "linear-gradient(135deg, #48bb78, #38a169)",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                🖨️ Save PDF
              </button>
            </div>
            <pre style={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.8,
              fontSize: 13,
              color: "#2d3748",
              background: "#f7fafc",
              padding: 20,
              borderRadius: 12,
              maxHeight: 500,
              overflowY: "auto",
            }}>
              {resume}
            </pre>
          </div>
        )}
      </div>

      <p style={{ textAlign: "center", color: "rgba(255,255,255,0.6)", marginTop: 40, fontSize: 13 }}>
        Built with ❤️ · AI Resume Builder © 2026
      </p>
    </div>
  );
}