import express from 'express';

const router = express.Router();

router.get('/signIn', (req, res) => res.render('signIn'));
router.get('/signUp', (req, res) => res.render('signUp'));
router.get('/profile', (req, res) => res.render('profile'));
router.get('/dashboard/user', (req, res) => res.render('dashboard-user'));
router.get('/dashboard/admin', (req, res) => res.render('dashboard-admin'));
router.get('/403', (req, res) => res.status(403).render('403'));

// Redirigir raíz a signIn
router.get('/', (req, res) => res.redirect('/signIn'));

// 404 para rutas inexistentes
router.use((req, res) => res.status(404).render('404'));

export default router;
