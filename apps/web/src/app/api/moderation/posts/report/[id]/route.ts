import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { v4 } from "uuid";

import messageBus from "mercadolocalpr-core/bootstrap/";

import ReportPostCommand from "mercadolocalpr-core/moderation/application/ReportPost/ReportPostCommand";


export async function POST(req: Request, context: any) {
    const supabase = createRouteHandlerClient({ cookies });

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    
    let status = 200;
    let data = {}; 
    let body = await req.json();

    let cmd = new ReportPostCommand(
        user.id, 
        context.params.id,
        v4(),
        body.reason,
    );

    try {   
        let result = await messageBus.execute(cmd);
    
        if(result.isFailure()) {
            data = { error: result.errorMessage };
            status = 400;
        }
    } catch(error: any) {
        status = 500;
        data = { error: 'Server Error 500'};
        console.log(error); // TODO: Log the error to a file somewhere.
    }

    return Response.json(data, { status });
}
