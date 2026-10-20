-- Migration aditiva para campos exibidos no relatório de prospecção.
-- Segura para execução repetida e não remove nem altera dados existentes.
ALTER TABLE public."Prospect" ADD COLUMN IF NOT EXISTS address text;
ALTER TABLE public."Prospect" ADD COLUMN IF NOT EXISTS source text;
ALTER TABLE public."Prospect" ADD COLUMN IF NOT EXISTS responsible text;
