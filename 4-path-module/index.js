// how path module works
const path = require('path')

console.log("Directory name:", path.dirname(__filename));

//get the filename
console.log("file name:", path.basename(__filename));

//get file extension
console.log("file extension:", path.extname(__filename))

//join path
const joinPath = path.join("/user", "documents", "node", "projects")
console.log("joined path", joinPath) 

const resolvedPath = path.resolve('user', 'documents', 'node', 'project')
console.log("resolved path:", resolvedPath);

const normalizePath = path.normalize('/user/.documents/../node/projects')
console.log("normalize;", normalizePath);
