const homeRoutes = require('../routes/home');
const blogRoutes = require('../routes/blog');
const categoryRoutes = require('../routes/category');
const tagRoutes = require('../routes/tag');
const searchRoutes = require('../routes/search');
const contactRoutes = require('../routes/contact');

module.exports = function (app){
    app.use('/api/home', homeRoutes);
    app.use('/api/blogs', blogRoutes);
    app.use('/api/categories', categoryRoutes);
    app.use('/api/tags', tagRoutes);
    app.use('/api/search', searchRoutes);
    app.use('/api/contact-me', contactRoutes);
};

