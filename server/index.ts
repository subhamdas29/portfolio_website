import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dns from 'dns';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fix Windows Node.js DNS SRV resolution for MongoDB Atlas mongodb+srv://
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  console.warn('Could not set custom DNS servers:', e);
}

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || '';
let isMongoConnected = false;
let dbConnectPromise: Promise<any> | null = null;

// Mongoose Schemas & Models
const likeSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  name: { type: String, required: true, trim: true },
  occupation: { type: String, default: 'Visitor', trim: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const commentSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true },
  name: { type: String, required: true, trim: true },
  occupation: { type: String, default: 'Visitor', trim: true },
  text: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const contactMessageSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  subject: { type: String, default: 'General Inquiry', trim: true },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const LikeModel = mongoose.model('Like', likeSchema);
const CommentModel = mongoose.model('Comment', commentSchema);
const ContactMessageModel = mongoose.model('ContactMessage', contactMessageSchema);

async function connectDB() {
  if (isMongoConnected && mongoose.connection.readyState === 1) {
    return;
  }
  if (!MONGODB_URI) {
    console.warn('MONGODB_URI is not set in environment variables.');
    return;
  }
  if (dbConnectPromise) {
    await dbConnectPromise;
    return;
  }
  try {
    dbConnectPromise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });
    await dbConnectPromise;
    isMongoConnected = true;
    console.log('Successfully connected to MongoDB Atlas for Portfolio Storage & Messages');
  } catch (err) {
    console.error('MongoDB Atlas Connection Error:', err);
    isMongoConnected = false;
    dbConnectPromise = null;
  }
}

connectDB();

// Database Connection Middleware for Vercel Serverless Functions
app.use(async (req: Request, res: Response, next) => {
  if (!isMongoConnected && MONGODB_URI) {
    await connectDB();
  }
  next();
});

// Fallback in-memory storage if MongoDB is offline
const fallbackLikers = [
  { name: 'Subham Das', occupation: 'Software Engineer', email: 'subhamdas5477@gmail.com' },
  { name: 'Alex Rivera', occupation: 'Frontend Developer', email: 'alex@example.com' },
];

const fallbackComments = [
  {
    _id: '1',
    name: 'Subham Das',
    occupation: 'Full-Stack Engineer',
    email: 'subhamdas5477@gmail.com',
    text: 'Welcome to my macOS portfolio! Leave a comment or feedback here.',
    createdAt: new Date().toISOString(),
  },
];

const fallbackContactMessages: any[] = [];

// --- Health Check ---
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    isMongoConnected,
    serverTime: new Date().toISOString(),
  });
});

// --- POST Contact Form Submission (Stored directly in MongoDB Atlas) ---
app.post('/api/contact', async (req: Request, res: Response) => {
  const { firstName, lastName, email, subject, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ success: false, message: 'First name, last name, email, and message are required.' });
  }

  const cleanEmail = email.toLowerCase().trim();

  if (isMongoConnected) {
    try {
      const newMessage = new ContactMessageModel({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: cleanEmail,
        subject: (subject || 'General Inquiry').trim(),
        message: message.trim(),
      });

      await newMessage.save();
      console.log('Successfully saved Get In Touch message from:', cleanEmail);
      return res.json({
        success: true,
        message: 'Inquiry saved successfully to MongoDB Atlas database.',
      });
    } catch (err) {
      console.error('Error saving contact message to MongoDB:', err);
      return res.status(500).json({ success: false, message: 'Database error saving contact inquiry.' });
    }
  }

  fallbackContactMessages.push({
    id: Date.now().toString(),
    firstName,
    lastName,
    email: cleanEmail,
    subject,
    message,
    createdAt: new Date().toISOString(),
  });

  return res.json({
    success: true,
    message: 'Inquiry stored in temporary portfolio memory.',
  });
});

// --- GET Likes & Likers ---
app.get('/api/likes', async (req: Request, res: Response) => {
  if (isMongoConnected) {
    try {
      const likers = await LikeModel.find().select('name occupation email createdAt').lean();
      return res.json({
        count: likers.length,
        likers: likers.map(l => ({
          name: l.name,
          occupation: l.occupation || 'Visitor',
          email: l.email,
        })),
      });
    } catch (err) {
      console.error('Error fetching likes:', err);
    }
  }

  return res.json({
    count: fallbackLikers.length,
    likers: fallbackLikers,
  });
});

// --- POST Signup Like ---
app.post('/api/likes/signup', async (req: Request, res: Response) => {
  const { name, occupation, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ success: false, message: 'Name, email and password are required.' });
  }

  const cleanEmail = email.toLowerCase().trim();

  if (isMongoConnected) {
    try {
      const existing = await LikeModel.findOne({ email: cleanEmail });
      if (existing) {
        return res.status(400).json({ success: false, message: 'This email has already registered and liked!' });
      }

      const newLike = new LikeModel({
        name: name.trim(),
        occupation: (occupation || 'Visitor').trim(),
        email: cleanEmail,
        password,
      });

      await newLike.save();

      const allLikes = await LikeModel.find().select('name occupation email').lean();
      return res.json({
        success: true,
        user: { name: newLike.name, occupation: newLike.occupation, email: newLike.email },
        data: {
          count: allLikes.length,
          likers: allLikes,
        },
      });
    } catch (err) {
      console.error('Signup error:', err);
      return res.status(500).json({ success: false, message: 'Database error during signup.' });
    }
  }

  const existingFallback = fallbackLikers.find(l => l.email === cleanEmail);
  if (!existingFallback) {
    fallbackLikers.push({ name, occupation: occupation || 'Visitor', email: cleanEmail });
  }

  return res.json({
    success: true,
    user: { name, occupation: occupation || 'Visitor', email: cleanEmail },
    data: {
      count: fallbackLikers.length,
      likers: fallbackLikers,
    },
  });
});

// --- POST Login Like ---
app.post('/api/likes/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const cleanEmail = email.toLowerCase().trim();

  if (isMongoConnected) {
    try {
      const user = await LikeModel.findOne({ email: cleanEmail });
      if (!user) {
        return res.status(404).json({ success: false, message: 'Email not found. Please sign up first!' });
      }

      if (user.password !== password) {
        return res.status(401).json({ success: false, message: 'Incorrect password.' });
      }

      const allLikes = await LikeModel.find().select('name occupation email').lean();
      return res.json({
        success: true,
        user: { name: user.name, occupation: user.occupation, email: user.email },
        data: {
          count: allLikes.length,
          likers: allLikes,
        },
      });
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({ success: false, message: 'Database error during login.' });
    }
  }

  const user = fallbackLikers.find(l => l.email === cleanEmail);
  return res.json({
    success: true,
    user: user || { name: cleanEmail.split('@')[0], occupation: 'Visitor', email: cleanEmail },
    data: {
      count: fallbackLikers.length,
      likers: fallbackLikers,
    },
  });
});

// --- POST Toggle Like (For logged-in users) ---
app.post('/api/likes/toggle', async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email required.' });
  }

  const cleanEmail = email.toLowerCase().trim();

  if (isMongoConnected) {
    try {
      const existing = await LikeModel.findOne({ email: cleanEmail });
      if (existing) {
        // Toggle OFF (Unlike)
        await LikeModel.deleteOne({ email: cleanEmail });
        const allLikes = await LikeModel.find().lean();
        return res.json({
          success: true,
          userHasLiked: false,
          count: allLikes.length,
        });
      } else {
        // Toggle ON (Like)
        const newLike = new LikeModel({
          email: cleanEmail,
          name: cleanEmail.split('@')[0],
          occupation: 'Visitor',
          password: 'default_password',
        });
        await newLike.save();
        const allLikes = await LikeModel.find().lean();
        return res.json({
          success: true,
          userHasLiked: true,
          count: allLikes.length,
        });
      }
    } catch (err) {
      console.error('Toggle error:', err);
      return res.status(500).json({ success: false, message: 'Database error.' });
    }
  }

  const idx = fallbackLikers.findIndex(l => l.email === cleanEmail);
  if (idx !== -1) {
    fallbackLikers.splice(idx, 1);
    return res.json({ success: true, userHasLiked: false, count: fallbackLikers.length });
  } else {
    fallbackLikers.push({ name: cleanEmail.split('@')[0], occupation: 'Visitor', email: cleanEmail });
    return res.json({ success: true, userHasLiked: true, count: fallbackLikers.length });
  }
});

// --- GET Comments ---
app.get('/api/comments', async (req: Request, res: Response) => {
  if (isMongoConnected) {
    try {
      const comments = await CommentModel.find().sort({ createdAt: 1 }).lean();
      return res.json({
        success: true,
        comments: comments.map(c => ({
          id: c._id.toString(),
          name: c.name,
          occupation: c.occupation || 'Visitor',
          email: c.email,
          text: c.text,
          createdAt: c.createdAt,
        })),
      });
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  }

  return res.json({
    success: true,
    comments: fallbackComments,
  });
});

// --- POST Comment ---
app.post('/api/comments', async (req: Request, res: Response) => {
  const { email, text } = req.body;

  if (!email || !text || !text.trim()) {
    return res.status(400).json({ success: false, message: 'Email and comment text are required.' });
  }

  const cleanEmail = email.toLowerCase().trim();

  if (isMongoConnected) {
    try {
      // Find user details from LikeModel database
      const user = await LikeModel.findOne({ email: cleanEmail });
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          requireAuth: true, 
          message: 'Please log in or sign up first to post comments!' 
        });
      }

      const newComment = new CommentModel({
        email: cleanEmail,
        name: user.name,
        occupation: user.occupation || 'Visitor',
        text: text.trim(),
      });

      await newComment.save();

      const comments = await CommentModel.find().sort({ createdAt: 1 }).lean();
      return res.json({
        success: true,
        comments: comments.map(c => ({
          id: c._id.toString(),
          name: c.name,
          occupation: c.occupation || 'Visitor',
          email: c.email,
          text: c.text,
          createdAt: c.createdAt,
        })),
      });
    } catch (err) {
      console.error('Error posting comment:', err);
      return res.status(500).json({ success: false, message: 'Database error posting comment.' });
    }
  }

  const newFallback = {
    _id: Date.now().toString(),
    name: 'Visitor',
    occupation: 'Developer',
    email: cleanEmail,
    text: text.trim(),
    createdAt: new Date().toISOString(),
  };
  fallbackComments.push(newFallback);

  return res.json({
    success: true,
    comments: fallbackComments,
  });
});

// --- DELETE Comment ---
app.delete('/api/comments/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email } = req.body;

  if (!id || !email) {
    return res.status(400).json({ success: false, message: 'Comment ID and email required.' });
  }

  const cleanEmail = email.toLowerCase().trim();
  const ADMIN_EMAIL = 'subhamdas5477@gmail.com';

  if (isMongoConnected) {
    try {
      const comment = await CommentModel.findById(id);
      if (!comment) {
        return res.status(404).json({ success: false, message: 'Comment not found.' });
      }

      const isOwner = comment.email.toLowerCase() === cleanEmail;
      const isAdmin = cleanEmail === ADMIN_EMAIL;

      if (!isOwner && !isAdmin) {
        return res.status(403).json({ success: false, message: 'Permission denied. You can only delete your own comments.' });
      }

      await CommentModel.findByIdAndDelete(id);

      const comments = await CommentModel.find().sort({ createdAt: 1 }).lean();
      return res.json({
        success: true,
        comments: comments.map(c => ({
          id: c._id.toString(),
          name: c.name,
          occupation: c.occupation || 'Visitor',
          email: c.email,
          text: c.text,
          createdAt: c.createdAt,
        })),
      });
    } catch (err) {
      console.error('Delete comment error:', err);
      return res.status(500).json({ success: false, message: 'Database error deleting comment.' });
    }
  }

  const idx = fallbackComments.findIndex(c => c._id === id);
  if (idx !== -1) {
    fallbackComments.splice(idx, 1);
  }
  return res.json({ success: true, comments: fallbackComments });
});

// Serve Vite build static files in production
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`macOS Portfolio API & Web server running on http://localhost:${PORT}`);
  });
}

export default app;
