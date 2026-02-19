import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const users = [];

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/data', (req, res) => {
    res.json({ message: 'Data received!' });
});

app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            id: uuidv4(),
            name,
            email,
            password: hashedPassword,
            createdAt: new Date()
        };

        users.push(user);

        const token = uuidv4();

        res.status(201).json({
            message: 'Utilisateur créé avec succès',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe requis' });
        }

        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        const token = uuidv4();

        res.status(200).json({
            message: 'Connexion réussie',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
