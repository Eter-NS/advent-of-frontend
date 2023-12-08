import fs from 'fs';
import path from 'path';
import folderName from './get-date.js';

const folderPath = path.join('tasks', folderName);

if (!fs.existsSync('tasks')) {
    fs.mkdirSync('tasks');
}

if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    const indexFilePath = path.join(folderPath, 'index.ts');
    fs.writeFileSync(indexFilePath, '// Tutaj skopiuj kod zadania');

    const testFilePath = path.join(folderPath, 'index.test.ts');
    fs.writeFileSync(testFilePath, '// Tutaj skopiuj testy dla zadania. Uruchom je poleceniem `npm test`');

    console.log(`Przygotowano szablon na zadanie w folderze tasks/${folderName} 🎄`)
} else {
    console.log(`Folder na dzisiejsze zadania już istnieje (tasks/${folderName}) 🤔`);
}
