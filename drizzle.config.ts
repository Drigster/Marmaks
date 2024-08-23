import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/database/schema.ts',
	out: './drizzle',
	dialect: 'sqlite',
	dbCredentials: {
		url: './database.sqlite'
	}
});
