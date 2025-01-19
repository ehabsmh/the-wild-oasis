import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ojbigxcpecbotngfhrfl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qYmlneGNwZWNib3RuZ2ZocmZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyMTMwOTEsImV4cCI6MjA1Mjc4OTA5MX0.X9tUkKOZ8MjGFTPYfMgwTkrR9UvQzDBiG_ALeem3p00";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
