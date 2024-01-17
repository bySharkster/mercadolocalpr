import React, { useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://ysctqzmvjoqsftxjrvto.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzY3Rxem12am9xc2Z0eGpydnRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUzNzkwMjEsImV4cCI6MjAyMDk1NTAyMX0.y6FPLsj0dBdKNV0WiraFBeC9w_CgeszD2eFUnS6x4ns')


export const InfoTest = () => {

//    update db info
//    const { error } = await supabase
//   .from('countries')
//   .update({ name: 'Australia' })
//   .eq('id', 1)

useEffect(() => {
    const fetchData = async () => {

        const { data: { user } } = await supabase.auth.getUser()
        const { data, error } = await supabase.auth.signUp(
        {
            email: 'example@email.com',
            password: 'example-password',
            options: {
            data: {
                first_name: 'John',
                age: 27,
            }
            }
        }
        )

        if (error) {
            console.error('Error fetching countries:', error);
            return;
        }

        console.log('Fetched countries:', data);
    }

    fetchData();
}, []);

    return (
    <div>InfoTest</div>
  )
}
