import {GoTrueClient} from '@supabase/gotrue-js'

export const environment = {
    production: false,
    supabaseUrl : 'https://fpycbjhhzhzwuakxsdpx.supabase.co' ,
    supabaseKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZweWNiamhoemh6d3Vha3hzZHB4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTE1NzAxNiwiZXhwIjoyMDYwNzMzMDE2fQ.TDy054AQRicbUIJGQ_v1ZrN2OZd2PS7pVmjRBsFtoSI',
}

export  const authClient : GoTrueClient = new GoTrueClient({
    url: `${environment.supabaseUrl}/auth/v1`,
    headers: {
    apiKey: environment.supabaseKey,
    }
});

