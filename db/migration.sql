-- db/migration.sql
-- Run this SQL on your Neon PostgreSQL database to create the gallery_images table

CREATE TABLE IF NOT EXISTS gallery_images (
  id           SERIAL PRIMARY KEY,
  title        TEXT NOT NULL,
  description  TEXT NOT NULL DEFAULT '',
  category     TEXT NOT NULL DEFAULT 'Mixed',
  r2_key       TEXT NOT NULL,          -- e.g., "gallery/uuid.jpg"
  status       TEXT NOT NULL DEFAULT 'published'
                 CHECK (status IN ('published', 'draft')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
