import DataUriParser from 'datauri/parser.js';
import path from 'path';

const getDataUri = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();

    // Generate the Data URI
    return parser.format(extName, file.buffer);
};

export default getDataUri;
