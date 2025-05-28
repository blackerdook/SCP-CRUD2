import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://afxcoepxmivdtbyaxisg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmeGNvZXB4bWl2ZHRieWF4aXNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzYwMzY1NCwiZXhwIjoyMDYzMTc5NjU0fQ.oHO-id3F2MUcJghzqpiDEALHXd9jnLzGzL1UcHC-_f8';

export const supabase = createClient(supabaseUrl, supabaseKey);