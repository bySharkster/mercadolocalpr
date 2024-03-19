import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import messageBus from "mercadolocalpr-core/bootstrap/";

import DeletePostCommand from "mercadolocalpr-core/marketplace/application/DeletePost/DeletePostCommand";


export async function DELETE(req: Request, context: any) {
    const supabase = createRouteHandlerClient({ cookies });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    let status = 200;
    let data = {};

    try {
        let result = await messageBus.execute(new DeletePostCommand(context.params.id, user.id));

        if(result.isFailure()) {
            data = { error: result.errorMessage };
            status = 400;
        }

    } catch(error: any) { // unexpected error
        status = 500;
        data = { error: 'Server Error 500'};
        console.log(error); // TODO: Log the error to a file somewhere.
    }

    return Response.json(data, { status });
}
