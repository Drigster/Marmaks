import { error } from '@sveltejs/kit';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function GET({ params }) {
	let a = path.resolve("data");

	// Normalize the path
	const normalizedPath = path.normalize(params.path);
	// Ensure it is within a specific directory (e.g., uploads)
	const baseDir = path.resolve('data');
	const fullPath = path.join(baseDir, normalizedPath);

	// Check if the resolved path starts with the base directory
	if (!fullPath.startsWith(baseDir)) {
		throw error(404, 'File not found');
	}

	if (!existsSync(fullPath)) {
		throw error(404, 'File not found');
	}

	const img = await readFile(fullPath);

	return new Response(img);
}