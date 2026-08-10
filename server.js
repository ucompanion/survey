const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3001;
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, bypass-tunnel-reminder');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }
    
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    const parsedUrl = url.parse(req.url, true);
    
    // API: List Projects
    if (req.method === 'GET' && parsedUrl.pathname === '/api/list') {
        try {
            const env = parsedUrl.query.env || 'staging';
            const files = fs.readdirSync(DATA_DIR);
            
            const projects = [];
            
            for (const file of files) {
                if (file.startsWith(`survey_data_${env}_`) && file.endsWith('.json')) {
                    const filePath = path.join(DATA_DIR, file);
                    try {
                        const content = fs.readFileSync(filePath, 'utf8');
                        const data = JSON.parse(content);
                        projects.push({
                            projectId: data.projectId,
                            env: data.env || env,
                            site_name: data.site_name || '이름 없는 홈페이지',
                            fileName: file,
                            updatedAt: fs.statSync(filePath).mtime
                        });
                    } catch (e) {
                        console.error(`Error reading file ${file}:`, e);
                    }
                }
            }
            
            // Sort by latest updated
            projects.sort((a, b) => b.updatedAt - a.updatedAt);
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, data: projects }));
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Server error listing data.' }));
        }
        return;
    }

    // API: Save JSON data
    if (req.method === 'POST' && parsedUrl.pathname === '/api/save') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const env = data.env || 'staging';
                const projectId = data.projectId;
                
                if (!projectId) {
                    throw new Error("projectId is required");
                }
                
                const filePath = path.join(DATA_DIR, `survey_data_${env}_${projectId}.json`);
                fs.writeFileSync(filePath, body, 'utf8');
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Saved successfully.' }));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Invalid JSON data or missing projectId.' }));
            }
        });
        return;
    }

    // API: Load JSON data
    if (req.method === 'GET' && parsedUrl.pathname === '/api/load') {
        try {
            const env = parsedUrl.query.env || 'staging';
            const projectId = parsedUrl.query.projectId;
            
            if (!projectId) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'projectId is required.' }));
            }
            
            const filePath = path.join(DATA_DIR, `survey_data_${env}_${projectId}.json`);
            
            if (fs.existsSync(filePath)) {
                const data = fs.readFileSync(filePath, 'utf8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'No data found.' }));
            }
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Server error reading data.' }));
        }
        return;
    }

    // API: Delete JSON data
    if (req.method === 'POST' && parsedUrl.pathname === '/api/delete') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const env = data.env || 'staging';
                const projectId = data.projectId;
                
                if (!projectId) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ success: false, message: 'projectId is required.' }));
                }
                
                const filePath = path.join(DATA_DIR, `survey_data_${env}_${projectId}.json`);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: true }));
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    // Serve static files
    let reqUrl = parsedUrl.pathname;
    let filePath = path.join(__dirname, reqUrl === '/' ? 'index.html' : reqUrl);
    let extname = path.extname(filePath);
    let contentType = MIME_TYPES[extname] || 'text/plain';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error: ' + err.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n==========================================`);
    console.log(`✅ UCOMP Survey Server is RUNNING`);
    console.log(`🌐 Open http://localhost:${PORT} in your browser`);
    console.log(`📁 Data will be saved to: ${DATA_DIR}`);
    console.log(`==========================================\n`);
    console.log(`Press Ctrl+C to stop the server.`);
});
