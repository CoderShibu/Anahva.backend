const { createClient } = require('@supabase/supabase-js');
const { SUPABASE_API_KEY, SUPABASE_URL } = require('../config/supabase');

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

module.exports = supabase;
