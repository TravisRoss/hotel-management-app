import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zxftzbjyfpwfgjmklbut.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4ZnR6Ymp5ZnB3ZmdqbWtsYnV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4OTIxNDksImV4cCI6MjA4MzQ2ODE0OX0.ouYCZuU19t0hfZDQTrquk01TMv2dLavKGiQognJ0no8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
