import fs from "fs";
import path from "path";
import folderName from "./get-date.js";

const filepath = path.join("tasks", `${folderName}\/index.test.ts`);

if (!fs.existsSync(filepath)) {
	console.log(`Nie posiadasz katalogu z dzisiejszym zadaniem! 🙀`);
	console.log(`Uruchom 'npm run create' aby rozpocząć.`);
} else {
	const packageJsonPath = path.join(process.cwd(), "package.json");
	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

	packageJson.scripts[
		"test:today"
	] = `jest .\/tasks\/${folderName}\/index.test.ts`;

	fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}
