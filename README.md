<div align="center">

# Secnote

*Send encrypted, self-destructing notes instantly.*

[Features](#features) • [How It Works](#how-it-works) • [Getting Started](#getting-started) • [Tech Stack](#tech-stack) • [Project Structure](#project-structure)

</div>

Secnote lets you send confidential messages through one-time, self-destructing links. Notes are encrypted in the browser using NaCl cryptography -- the server never sees your plaintext. Once it's read, it's gone.


## Features

End-to-end encryption using [TweetNaCl.js](https://tweetnacl.js.org/) -- notes are encrypted before they leave your browser. The decryption key lives in the URL fragment and never touches the backend.

Each note deletes itself the moment it's opened. No copies, no recovery. You can also add a password for an extra layer of protection before the note is revealed.

The server only ever stores encrypted ciphertext. It can't read what you wrote. Neither can we.

## How It Works

```
1. You write a note and hit "Create Secure Note"
2. The browser encrypts the note using NaCl secretbox (XSalsa20-Poly1305)
3. The encrypted payload is sent to the server; the nonce stays in the URL fragment (#)
4. You share the generated link with the recipient
5. The recipient opens the link, the browser decrypts the note, and the server deletes it
```

> [!IMPORTANT]
> The decryption nonce is placed in the URL **fragment** (`#`), which browsers never send to the server. That's what makes this genuinely end-to-end encrypted -- not just a claim.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) instance (local or Atlas)

### Setup

**1. Clone the repository**

```bash
git clone https://github.com/rahan-r/secnote.git
cd secnote
```

**2. Set up the server**

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Start the server:

```bash
node index.js
```

**3. Set up the client**

```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the dev server:

```bash
npm run dev
```

The app will be at `http://localhost:5173`.

## Tech Stack

| Layer    | Technology                                                                              |
| -------- | --------------------------------------------------------------------------------------- |
| Frontend | [React](https://react.dev/), [Vite](https://vite.dev/), [Tailwind CSS](https://tailwindcss.com/) |
| Backend  | [Express](https://expressjs.com/), [Mongoose](https://mongoosejs.com/)                  |
| Crypto   | [TweetNaCl.js](https://tweetnacl.js.org/) (XSalsa20-Poly1305 secretbox)                |
| Database | [MongoDB](https://www.mongodb.com/)                                                     |
| Hosting  | [Vercel](https://vercel.com/) (client)                                                  |

## Project Structure

```
secnote/
├── client/                # React + Vite frontend
│   ├── src/
│   │   ├── Pages/         # Route pages (Home, CreateNote, ViewNote, etc.)
│   │   ├── components/    # UI components (Navbar, Footer, shadcn/ui)
│   │   ├── utils/         # API config & helpers
│   │   └── assets/        # Fonts, images, icons
│   ├── index.html
│   └── vite.config.js
│
└── server/                # Express API server
    ├── config/            # Database connection
    ├── models/            # Mongoose schemas (Note, Counter)
    ├── routes/            # API routes
    └── index.js           # Server entry point
```
