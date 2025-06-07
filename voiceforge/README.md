# VoiceForge Service

This is a minimal FastAPI app providing endpoints for voice features used by Norian.

## Endpoints
- `POST /voice/wake` – detects a wake word in the uploaded audio.
- `POST /voice/transcribe` – returns a text transcription of the uploaded audio.
- `POST /voice/speak` – converts text to speech and returns a base64 encoded audio string.

Run locally with:
```bash
pip install -r requirements.txt
python app.py
```
