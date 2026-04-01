const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Multi-language scam database
const CONTENT = {
    en: { verdict: "SCAM", flag: "🚩 Suspicious Link Detected", safety: 15 },
    hi: { verdict: "धोखाधड़ी", flag: "🚩 संदिग्ध लिंक मिला", safety: 10 },
    mr: { verdict: "फसवणूक", flag: "🚩 संशयास्पद लिंक आढळली", safety: 12 }
};

app.post('/analyze', (req, res) => {
    const { text, lang = 'en' } = req.body;
    const isScam = /http|win|prize|kyc|gift|लॉटरी|बक्षीस/i.test(text);

    if (isScam) {
        res.json({ status: 'DANGER', ...CONTENT[lang] });
    } else {
        res.json({ status: 'SAFE', verdict: "SECURE", flag: "✅ No threats", safety: 98 });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`AI Backend Live on port ${PORT}`));
