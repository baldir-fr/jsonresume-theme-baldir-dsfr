const Handlebars = require('handlebars');
const {readFileSync, readdirSync} = require('fs');
const {join} = require('path');

const render = (resume) => {
    const css = readFileSync(`${__dirname}/style.css`, 'utf-8');
    const tpl = readFileSync(`${__dirname}/resume.hbs`, 'utf-8');
    const partialsDir = join(__dirname, 'theme/partials');

    const filenames = readdirSync(partialsDir);
    filenames.forEach((filename) => {
        const matches = /^([^.]+).hbs$/.exec(filename);
        if (!matches) return;
        const name = matches[1];
        const filepath = join(partialsDir, filename);
        const template = readFileSync(filepath, 'utf8');
        Handlebars.registerPartial(name, template);
    });
    return Handlebars.compile(tpl)({
        css,
        resume,
    });
};

module.exports = {render};
