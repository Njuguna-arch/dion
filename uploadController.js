const DionDoc = require('../models/DionDoc');

exports.handleUpload = async (req, res) => {
  try {
    const { user_id, document_type, notes } = req.body;
    const file_path = `/uploads/docs/${req.file.filename}`;

    const docMeta = {
      document_id: `doc-${Date.now()}`,
      user_id: parseInt(user_id),
      type: document_type,
      file_path,
      uploaded_at: new Date(),
      verified: false,
      notes
    };

    await DionDoc.create(docMeta);
    res.status(200).json({ message: "Document uploaded and metadata saved." });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ error: "Upload failed." });
    console.log("Upload route triggered");
  }
};