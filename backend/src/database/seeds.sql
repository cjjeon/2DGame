DROP TABLE IF EXISTS "Users" CASCADE;
DROP TABLE IF EXISTS "Rooms" CASCADE;
DROP TABLE IF EXISTS "Rooms" CASCADE;
CREATE TABLE IF NOT EXISTS "Rooms" ("id" UUID , "isComplete" BOOLEAN, "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Rooms' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
DROP TABLE IF EXISTS "Users" CASCADE;
CREATE TABLE IF NOT EXISTS "Users" ("id" UUID , "cookie" UUID, "username" VARCHAR(255), "roomId" UUID REFERENCES "Rooms" ("id") ON DELETE NO ACTION ON UPDATE CASCADE, "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
